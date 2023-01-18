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
    db.query("SELECT * FROM users",
        (err,result)=>{
        if(err) {
            res.send(err)
            console.log(err)
        } else{
            res.send(result)
        }
        });
    });

    // Route to get one User by limit
    app.get("/users/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;
    

    db.query(`SELECT * FROM users LIMIT ?, ?`, [page, perPage], 
        (err,result)=>{
        if(err) {
            res.send(err)
            console.log(err)
        } else{
            res.send(result)
        }
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
            res.send(err);
        } else{
            res.send(result);
        }
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
            res.send(err);
        } else{
            res.send(result);
        }
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

    // Route to get one User by limit
    app.get("/entities/page=:page/perPage=:perPage", (req,res)=>{

        const page = Number(req.params.page) * 10;
        const perPage = Number(req.params.perPage);
    
        db.query(`SELECT * FROM entities LIMIT ?, ?`, [page, perPage], 
            (err,result)=>{
            if(err) {
                res.send(err)
                console.log(err)
            } else{
                res.send(result)
            }
        });
    });

    // Route to get one Entity by id
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


    // Route for creating a Entity
    app.post('/entities/create', (req,res)=> {

    const code = req.body.code;
    const name = req.body.name;
    const phone = req.body.phone;
    const name_manager = req.body.name_manager;
    const phone_manager = req.body.phone_manager;

    const cep_adress = req.body.cep_adress;
    const street_adress = req.body.street_adress;
    const number_adress = req.body.number_adress;
    const district_adress = req.body.district_adress;
    const zone_adress = req.body.zone_adress;

    console.log(zone_adress)

    db.query("INSERT INTO entities (code, name, phone, name_manager, phone_manager, cep_adress, street_adress, number_adress, district_adress, zone_adress) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [code, name, phone, name_manager, phone_manager,cep_adress, street_adress, number_adress, district_adress, zone_adress],
        (err,result)=>{
        if(err) {
            res.send(err);
        } else{
            res.send(result);
        }
        });
    })


    // Route to update a Entity
    app.put('/entities/:id/update',(req,res)=>{
    const id = req.params.id;

    const code = req.body.code;
    const name = req.body.name;
    const phone = req.body.phone;
    const name_manager = req.body.name_manager;
    const phone_manager = req.body.phone_manager;

    const cep_adress = req.body.cep_adress;
    const street_adress = req.body.street_adress;
    const number_adress = req.body.number_adress;
    const district_adress = req.body.district_adress;
    const zone_adress = req.body.zone_adress;

    db.query("UPDATE entities SET code = ?, name = ?, phone = ?, name_manager = ?, phone_manager = ?, cep_adress = ?, street_adress = ?, number_adress = ?, district_adress = ?, zone_adress = ? WHERE id = ?",
        [code, name, phone, name_manager, phone_manager, cep_adress, street_adress, number_adress, district_adress, zone_adress, id],
        (err,result)=>{
        if(err) {
            res.send(err)
        } else{
            res.send(result)
        }
        });
    })

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