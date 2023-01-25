const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Users Routes
{
    // Route to get all Users
    app.get("/users", (req,res)=>{
    db.query("SELECT * FROM users",
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
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
            //console.log(err)
            res.send(err)
        } else{
            //console.log(result)
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
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
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
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }});
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
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
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
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });
}

// Entities Routes
{
    // Route to get all Entities
    app.get("/entities", (req,res)=>{
    db.query("SELECT * FROM entities", (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });

    // Route to get one Entities by limit
    app.get("/entities/page=:page/perPage=:perPage", (req,res)=>{

        const perPage = Number(req.params.perPage);
        const page = Number(req.params.page) * perPage;
    
        db.query(`SELECT * FROM entities LIMIT ?, ?`, [page, perPage], 
            (err,result)=>{
            if(err) {
                //console.log(err)
                res.send(err)
            } else{
                //console.log(result)
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
            //console.log(err)
            console.log(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
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
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
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
            //console.log(err)
            res.send(err)
        } else{
            //console.log(result)
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
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });
}

// Machines Routes
{
    // Route to get all Machines
    app.get("/machines", (req,res)=>{
    db.query("SELECT * FROM machines", (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result)
        }});
    });

    // Route to get one Machine by limit
    app.get("/machines/page=:page/perPage=:perPage", (req,res)=>{

        const perPage = Number(req.params.perPage);
        const page = Number(req.params.page) * perPage;
    
        db.query(`SELECT machines.id, machines.num_serial, entities.name AS entities_name, type_machine.name AS type_machine_name, machines.status FROM machines JOIN entities ON machines.id_entities_m = entities.id JOIN type_machine ON machines.id_type_m = type_machine.id LIMIT ?, ?`, [page, perPage], 
            (err,result)=>{
            if(err) {
                //console.log(err);
                res.send(err)
            } else{
                //console.log(result);
                res.send(result)
            }
        });
    });

    // Route to get one Machine by id
    app.get("/machines/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT machines.id, machines.num_serial, machines.model, machines.description, machines.id_type_m, machines.id_entities_m, machines.status, entities.name AS entities_name, type_machine.name AS type_machine_name FROM machines JOIN entities ON machines.id_entities_m = entities.id JOIN type_machine ON machines.id_type_m = type_machine.id WHERE machines.id = ?", id, 
        (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result);
        }});
    });

    // Route to get all Machine Types
    app.get("/machines-types", (req,res)=>{
    db.query("SELECT * FROM type_machine ORDER BY id", (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result);
        }});
    });

    // Route for creating a Machine
    app.post('/machines/create', (req,res)=> {

    const num_serial = req.body.num_serial;
    const model = req.body.model;
    const description = req.body.description;
    const id_type = req.body.id_type;
    const id_entity = req.body.id_entity;
    const status = req.body.status;

    db.query("INSERT INTO machines (num_serial, model, description, id_type_m, id_entities_m, status) VALUES (?,?,?,?,?,?)",
        [num_serial, model, description, id_type, id_entity, status],
        (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result);
        }
        });
    })


    // Route to update a Machine
    app.put('/machines/:id/update',(req,res)=>{
    const id = req.params.id;

    const num_serial = req.body.num_serial;
    const model = req.body.model;
    const description = req.body.description;
    const id_type_m = req.body.id_type_m;
    const id_entities_m = req.body.id_entities_m;
    const status = req.body.status;

    db.query("UPDATE machines SET num_serial = ?, model = ?, description = ?, id_type_m = ?, id_entities_m = ?, status = ? WHERE id = ?",
        [num_serial, model, description, id_type_m, id_entities_m, status, id],
        (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result);
        }});
    })

    // Route to delete a Machine
    app.delete('/machines/:id/delete',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM machines WHERE id = ?", id,
        (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else {
            //console.log(result);
            res.send(result);
        }});
    });
}

// Historic Machines
{
    // Route to get all Records
    app.get("/records", (req,res)=>{
    db.query("SELECT * FROM historic_machines",
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }
        });
    });
    
    // Route to get Records by limit
    app.get("/records/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT historic_machines.id, historic_machines.date, historic_machines.action, machines.num_serial as machine, entities.name as entity FROM historic_machines JOIN machines ON machines.id = historic_machines.id_machine_h JOIN entities ON entities.id = machines.id_entities_m LIMIT ?, ?", [page, perPage], 
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else{
            //console.log(result)
            res.send(result)
        }
        });
    });

    // Route for creating a Historic
    app.post('/records/create', (req,res)=> {

    const id_machine = req.body.id_machine;
    const id_entity = req.body.id_entity;
    const action = req.body.action;

    db.query("INSERT INTO historic_machines (id_machine_h, id_entity_h, action) VALUES (?,?,?)",
        [id_machine, id_entity, action],
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }});
    })
}

//Services Internal
{
    // Route to get all Internals
    app.get("/internals", (req,res)=>{
    db.query("SELECT * FROM service_internal",
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }
        });
    });
    
    // Route to get Internals by limit
    app.get("/internals/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT service_internal.id, machines.num_serial as machine, service_internal.problem, users.realname as user, service_internal.service_performed FROM service_internal JOIN machines ON machines.id = service_internal.id_machine_si JOIN users ON users.id = service_internal.id_user_si LIMIT ?, ?", [page, perPage], 
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else{
            //console.log(result)
            res.send(result)
        }
        });
    });
    }

    // Route to get one Internal by id
    app.get("/internals/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT service_internal.id, service_internal.id_machine_si, machines.num_serial as machine, service_internal.problem, service_internal.id_user_si, users.realname as user, service_internal.service_performed FROM service_internal JOIN machines ON machines.id = service_internal.id_machine_si JOIN users ON users.id = service_internal.id_user_si WHERE service_internal.id = ?", id, 
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });


    // Route for creating a User
    app.post('/internals/create', (req,res)=> {

    const machine = req.body.machine;
    const problem = req.body.problem;
    const user = req.body.user;
    const service = req.body.service;

    db.query("INSERT INTO service_internal (id_machine_si, problem, id_user_si, service_performed) VALUES (?,?,?,?)",
        [machine, problem, user, service],
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }});
    })

    // Route to update a User
    app.put('/internals/:id/update',(req,res)=>{
    const id = req.params.id;

    const machine = req.body.machine;
    const problem = req.body.problem;
    const user = req.body.user;
    const service = req.body.service;

    db.query("UPDATE service_internal SET id_machine_si = ?, problem = ?, id_user_si = ?, service_performed = ? WHERE id = ?",
        [machine, problem, user, service, id],
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }
        });    
    });


//Listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})