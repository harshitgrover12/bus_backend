let express=require('express');
let mysql=require('mysql');
let app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
let connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bus'
});

connection.connect((err)=>{
    if(err){
        console.log('error');
    }
    else
    console.log('connected');
})
app.use(bodyParser.json());
app.use(cors());
app.post('/seat1',(req,res)=>{
    const{seat}=req.body;
    let sql="select * from seat_details where seats_booked='"+seat+"'";
    connection.query(sql,(error,result)=>{
        if(error)
        res.send(error)
        else
        {
            return(res.json({
                data:result
            }))
        }
    })
})
app.post('/cancel',(req,res)=>{
    const{seat_no,userid,busno}=req.body;
    let sql="delete from seat_details where seats_booked='"+seat_no+"'";
    let sql2="update buses_details set Seats_available=Seats_available+1 where Bus_No='"+busno+"'";
    let sql1="select b.Bus_No,u.Name,seats_booked,Source,Destination,Departure_time,Arrival_time,Price,s.Date from user_details u,seat_details s,buses_details b where s.user_id='"+userid+"' and u.user_id=s.user_id and s.Bus_No=b.Bus_no";
    connection.query(sql,(error,result)=>{
        if(error)
        {
            res.send(error);
        }
    })
    connection.query(sql2,(error,result)=>{
        if(error)
        {
            res.send(error);
        }
    })
    connection.query(sql1,(error,result)=>{
        if(error)
        {
            res.send(error);
        }
        else
        {
            return(res.json({
                data:result
            }))
        }
    })
})
app.post('/purchaseHistory',(req,res)=>{
    const {userid}=req.body
    console.log(userid);
    let sql="select b.Bus_No,u.Name,seats_booked,Source,Destination,Departure_time,Arrival_time,Price,s.Date from user_details u,seat_details s,buses_details b where s.user_id='"+userid+"' and u.user_id=s.user_id and s.Bus_No=b.Bus_no";
    
    connection.query(sql,(error,result)=>{
        if(error)
        {
            res.send(error);
        }
        else
        {
            return(res.json({
                data:result
            }))
        }
    })
})
app.post('/seats',(req,res)=>{
    let{userid,busno,Seats,No,date}=req.body;
    let sql="update buses_details set Seats_available=Seats_available-'"+No+"'where Bus_No='"+busno+"'";
    
    connection.query(sql,(error,result)=>{
        if(error)
        {
            res.send(error);
        }
       
    })
    Seats.map((seats)=>{
        connection.query("insert into seat_details(Bus_No,seats_booked,user_id,Date) values('"+busno+"','"+seats+"','"+userid+"','"+date+"')",(error,result)=>{
            if(error)
            {
                res.send(error);
            }
        }
   )}
    )
})
app.post('/signIn',(req,res)=>{
    console.log('connected');
    let{Email,Password}=req.body;
    let sql="select * from user_details where Email='"+Email+"' and password='"+Password+"'";
    connection.query(sql,(error,result)=>{
        console.log(result);
        if(error){
            res.send(error);
        }
        else
        {
          
        
            return(res.json({
                data:result
            }))
            
            
            
        }
    })
})

app.post('/searchResults',(req,res)=>{console.log('connected');
   let{source,destination,startdate}=req.body;
   let sql1="update buses_details set Date=date_format('"+startdate+"','%Y-%m-%d' ) where Source='"+source+"'and Destination='"+destination+"'";
   let sql="select * from buses_details where source='"+source+"'and destination='"+destination+"'";
   connection.query(sql1,(error,result)=>{
       if(error)
       res.send(error);
   })
    connection.query(sql,(error,results)=>{
        if(error){
            res.send(error);
          
        }
        else
        {
            return(res.json({
                data:results
            }))
        }
    })
    
})

app.post('/signUp',(req,res)=>{
    
    console.log('connected');
    console.log(req.body);
    let userid=Math.random()*1000;
    let sql="insert into user_details(user_id, Name, Email, password) values('"+userid+"','"+req.body.Name+"','"+req.body.Email+"','"+req.body.password+"') ";
    
    connection.query(sql,(error,rows,fields)=>{
        if(error){
            res.send(error);
          
        }
    })      
    })



app.listen(1337);