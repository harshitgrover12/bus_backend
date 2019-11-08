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
app.get('/',(req,res)=>{
    res.send('hello');
})
app.post('/signUp',(req,res)=>{
    res.send('hello');
    console.log('connected');
    console.log(req.body.password);
    let sql="insert into user_details(user_id, Name, Email, password) values('"+req.body.userid+"','"+req.body.Name+"','"+req.body.Email+"','"+req.body.password+"') ";
    connection.query(sql,(error,rows,fields)=>{
        if(error){
           throw error;
        }
        

    })})

    

app.listen(1337);