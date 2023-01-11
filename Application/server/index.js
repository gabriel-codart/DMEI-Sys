const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Users routes
{
    // Route to get all Users
    app.get("/users", (req,res)=>{
    db.query("SELECT * FROM users", (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    });

    // Route to get one User by nickname
    app.get("/users/nick=:nickname", (req,res)=>{

    const nickname = req.params.nickname + '%';

    db.query(`SELECT * FROM users WHERE nickname LIKE ?`, nickname, 
        (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    });


    // Route to get one User by id
    app.get("/users/:id", (req,res)=>{

    const id = req.params.id;
    db.query(`SELECT * FROM users WHERE id = ?`, id, 
        (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    });


    // Route for creating a User
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


    // Route to update a User
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


    // Route to delete a User
    app.delete('/users/:id/delete',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM users WHERE id = ?", id,
        (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });
    });
}

// Entities Routes
{
    // Route to get all Entities
    app.get("/entities", (req,res)=>{
    db.query("SELECT * FROM entities", (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    });

    // Route to get one Entities by name
    app.get("/entities/name=:name", (req,res)=>{

    const name = req.params.name + '%';

    db.query(`SELECT * FROM entities WHERE name LIKE ?`, name, 
        (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    });

    // Route to get one User by id
    app.get("/entities/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT * FROM entities WHERE id = ?", id, 
        (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    });


    // Route for creating a User
    app.post('/users/create', (req,res)=> {

    const code = req.body.code;
    const name = req.body.name;
    const phone = req.body.phone;
    const zone = req.body.zone;

    db.query("INSERT INTO users (code, name, phone, zone_adress) VALUES (?,?,?,?)",
        [code, name, phone, zone],
        (err,result)=>{
        if(err) {
        console.log(err)
        }
        res.send(result)
        });
    })


    // Route to update a User
    app.put('/entities/:id/update',(req,res)=>{
    const id = req.params.id;

    const code = req.body.code;
    const name = req.body.name;
    const phone = req.body.phone;
    const zone = req.body.zone;

    db.query("UPDATE entities SET code = ?, name = ?, phone = ?, zone_adress = ? WHERE id = ?",
        [code, name, phone, zone, id],
        (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });    
    });


    // Route to delete a Entity
    app.delete('/entities/:id/delete',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM entities WHERE id = ?", id,
        (err,result)=>{
        if(err) {
        console.log(err)
        } 
        res.send(result)
        });
    });
}

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})