const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all users
app.get("/users", (req,res)=>{
db.query("SELECT * FROM users", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });
});

// Route to get one user
app.get("/users/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM users WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });
});


// Route for creating a user
app.post('/users/create', (req,res)=> {

const nickname = req.body.nickname;
const password = req.body.password;
const realname = req.body.realname;

db.query("INSERT INTO users (nickname, password, realname) VALUES (?,?,?)",
    [nickname, password, realname],
    (err,result)=>{
    if(err) {
    console.log(err)
    }
    res.send(result)
    });
})


// Route to update a user
app.put('/users/:id/update',(req,res)=>{
const id = req.params.id;

const nickname = req.body.nickname;
const password = req.body.password;
const realname = req.body.realname;

    db.query("UPDATE users SET nickname = ?, password = ?, realname = ? WHERE id = ?",
    [nickname, password, realname, id],
    (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });    
});


// Route to delete a user
app.delete('/users/:id/delete',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM users WHERE id = ?", id,
    (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });
})


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})