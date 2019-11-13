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
app.post('/seats',(req,res)=>{
    let{userid,busno,Seats,No}=req.body;
    let sql="update buses_details set Seats_available=Seats_available-'"+No+"'where Bus_No='"+busno+"'";
    connection.query(sql,(error,result)=>{
        if(error)
        {
            res.send(error);
        }
       
    })
    Seats.map((seats)=>{
        connection.query("insert into seat_details(Bus_no,seats_booked,user_id) values('"+busno+"','"+seats+"','"+userid+"')",(error,result)=>{
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
        {if(result)
            return(res.json({
                data:result
            }))
            else
            return(res.json(
                'noEntry'
            ))
        }
    })
})

app.post('/searchResults',(req,res)=>{console.log('connected');
   let{source,destination,startdate}=req.body;
   let sql="select * from buses_details where source='"+source+"'and destination='"+destination+"'";
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