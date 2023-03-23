const express = require('express');
const multer  = require('multer');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Users Routes
{
    // Route to get all Users
    app.get("/api/users", (req,res)=>{
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

    // Route to get all possible Secondary Users
    app.get("/api/users/not=:id", (req,res)=>{

        const id = req.params.id;

        db.query("SELECT * FROM users WHERE id != ?", [id],
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
    app.get("/api/users/page=:page/perPage=:perPage", (req,res)=>{

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
    app.get("/api/users/:id", (req,res)=>{

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
    app.post('/api/users/create', (req,res)=> {

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
    app.patch('/api/users/:id/update',(req,res)=>{
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
    app.delete('/api/users/:id/delete',(req,res)=>{
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
    app.get("/api/entities", (req,res)=>{
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
    app.get("/api/entities/page=:page/perPage=:perPage", (req,res)=>{

        const perPage = Number(req.params.perPage);
        const page = Number(req.params.page) * perPage;
    
        db.query('SELECT entities.id, entities.code, entities.name, entities.phone, zone.name as zone_name, zone.color as zone_color FROM entities LEFT JOIN zone ON zone.id = entities.id_zone_adress LIMIT ?, ?', [page, perPage], 
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
    app.get("/api/entities/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT entities.*, zone.name as zone_name, zone.color as zone_color FROM entities LEFT JOIN zone ON zone.id = entities.id_zone_adress WHERE entities.id = ?", id, 
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
    app.post('/api/entities/create', (req,res)=> {

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

    db.query("INSERT INTO entities (code, name, phone, name_manager, phone_manager, cep_adress, street_adress, number_adress, district_adress, id_zone_adress) VALUES (?,?,?,?,?,?,?,?,?,?)",
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
    app.patch('/api/entities/:id/update',(req,res)=>{
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

    db.query("UPDATE entities SET code = ?, name = ?, phone = ?, name_manager = ?, phone_manager = ?, cep_adress = ?, street_adress = ?, number_adress = ?, district_adress = ?, id_zone_adress = ? WHERE id = ?",
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
    app.delete('/api/entities/:id/delete',(req,res)=>{
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

    // Route to get all Zones
    app.get("/api/zones/all", (req,res)=>{
    db.query("SELECT * FROM zone",
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
}

// Machines Routes
{
    // Route to get all Machines
    app.get("/api/machines", (req,res)=>{
    db.query("SELECT * FROM machines", (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result)
        }});
    });

    // Route to get all Machines from a Entity
    app.get("/api/machines/entity/:id", (req,res)=>{
    
    const id = req.params.id;
    db.query("SELECT * FROM machines WHERE id_entities_m = ? AND maintenance = 0 AND id_status_m = 1", id, (err,result)=>{
        if(err) {
            //console.log(err);
            res.send(err);
        } else{
            //console.log(result);
            res.send(result)
        }});
    });

    // Route to get one Machine by limit
    app.get("/api/machines/page=:page/perPage=:perPage", (req,res)=>{

        const perPage = Number(req.params.perPage);
        const page = Number(req.params.page) * perPage;
    
        db.query(`SELECT machines.id, machines.num_serial, machines.model, entities.name AS entities_name, type_machine.name AS type_machine_name, status_machine.name as status_name, status_machine.color as status_color FROM machines LEFT JOIN entities ON machines.id_entities_m = entities.id LEFT JOIN type_machine ON machines.id_type_m = type_machine.id LEFT JOIN status_machine ON machines.id_status_m = status_machine.id LIMIT ?, ?`, [page, perPage], 
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
    app.get("/api/machines/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT machines.*, status_machine.name as status_name, status_machine.color as status_color, entities.name AS entities_name, entities.code AS entities_code, type_machine.name AS type_machine_name FROM machines LEFT JOIN entities ON machines.id_entities_m = entities.id LEFT JOIN type_machine ON machines.id_type_m = type_machine.id LEFT JOIN status_machine ON machines.id_status_m = status_machine.id WHERE machines.id = ?", id, 
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
    app.get("/api/machines-types", (req,res)=>{
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
    app.post('/api/machines/create', (req,res)=> {

    const num_serial = req.body.num_serial;
    const model = req.body.model;
    const description = req.body.description;
    const id_type = req.body.id_type;
    const id_entity = req.body.id_entity;
    const status = req.body.status;

    db.query("INSERT INTO machines (id_entities_m, num_serial, model, id_type_m, description, id_status_m) VALUES (?,?,?,?,?,?)",
        [id_entity, num_serial, model, id_type, description, status],
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
    app.patch('/api/machines/:id/update',(req,res)=>{
    const id = req.params.id;

    const num_serial = req.body.num_serial;
    const model = req.body.model;
    const description = req.body.description;
    const id_type_m = req.body.id_type_m;
    const id_entities_m = req.body.id_entities_m;
    const status = req.body.status;

    db.query("UPDATE machines SET num_serial = ?, model = ?, description = ?, id_type_m = ?, id_entities_m = ?, id_status_m = ? WHERE id = ?",
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

    // Route to update Machine Maintenance to 'ON' or 'OFF'
    app.patch('/api/machines/:id/update/maintenance',(req,res)=>{
        const id = req.params.id;

        const maintenance = req.body.maintenance;
    
        db.query("UPDATE machines SET maintenance = ? WHERE id = ?",
            [maintenance, id],
            (err,result)=>{
            if(err) {
                //console.log(err);
                res.send(err);
            } else{
                //console.log(result);
                res.send(result);
            }});
        })

    // Route to ADD Document Deactivate Machine
    app.patch('/api/machines/:id/deactivate/doc', upload.single('file'), (req,res)=>{
        const id = req.params.id;

        const deactivate_doc = req.file.buffer;
    
        db.query("UPDATE historic_machines SET deactivate_doc = ? WHERE id = ?",
            [deactivate_doc, id],
            (err,result)=>{
            if(err) {
                //console.log(err);
                res.send(err);
            } else{
                //console.log(result);
                res.send(result);
            }});
        })
    
    // Route to GET Document Deactivate Machine
    app.get("/api/records/machines/:id/deactivate/doc", (req,res)=>{
        
        const id = req.params.id;
        db.query("SELECT max(date), deactivate_doc FROM historic_machines WHERE id_machine_h = ? AND action LIKE 'Desativado'", id,
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

    // Route to Deactivate Machine
    app.patch('/api/machines/:id/deactivate', (req,res)=>{
        const id = req.params.id;
    
        db.query("UPDATE machines SET id_status_m = 0, maintenance = 0 WHERE id = ?",
            [id],
            (err,result)=>{
            if(err) {
                //console.log(err);
                res.send(err);
            } else{
                //console.log(result);
                res.send(result);
            }});
        })
}

// Historic Machines
{
    // Route to get all Records
    app.get("/api/records", (req,res)=>{
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
    app.get("/api/records/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT historic_machines.*, machines.id as machine_id, machines.num_serial as machine_serial, entities.name as entity FROM historic_machines LEFT JOIN machines ON machines.id = historic_machines.id_machine_h LEFT JOIN entities ON entities.id = historic_machines.id_entity_h ORDER BY historic_machines.date DESC LIMIT ?, ?", [page, perPage], 
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
    app.post('/api/records/create', (req,res)=> {

    const id_machine = req.body.id_machine;
    const id_entity = req.body.id_entity;
    const action = req.body.action;
    const observation = req.body.observation;
    console.log(observation);


    db.query("INSERT INTO historic_machines (id_machine_h, id_entity_h, action, observation) VALUES (?,?,?,?)",
        [id_machine, id_entity, action, observation],
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
    app.get("/api/internals", (req,res)=>{
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
    app.get("/api/internals/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT service_internal.id, machines.num_serial as machine_num, entities.name as entity_name, users.realname as user_name, zone.name as zone_name, zone.color as zone_color FROM service_internal LEFT JOIN users ON users.id = service_internal.id_user_si LEFT JOIN entities ON entities.id = service_internal.id_entity_si LEFT JOIN machines ON machines.id = service_internal.id_machine_si LEFT JOIN zone ON zone.id = entities.id_zone_adress LIMIT ?, ?", [page, perPage], 
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
    

    // Route to get one Internal by id
    app.get("/api/internals/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT service_internal.*, machines.num_serial as machine_num, users.realname as user_name, entities.name as entity_name, entities.code as entity_code FROM service_internal LEFT JOIN machines ON machines.id = service_internal.id_machine_si LEFT JOIN users ON users.id = service_internal.id_user_si LEFT JOIN entities ON entities.id = service_internal.id_entity_si WHERE service_internal.id = ?", id, 
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });


    // Route for creating a Internal
    app.post('/api/internals/create', (req,res)=> {

    const entity = req.body.entity;
    const machine = req.body.machine;
    const problem = req.body.problem;
    const user = req.body.user;
    const service = req.body.service;

    db.query("INSERT INTO service_internal (id_entity_si, id_machine_si, id_user_si, problem, service_performed) VALUES (?,?,?,?,?)",
        [entity, machine, user, problem, service],
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }});
    })

    // Route to update a Internal
    app.patch('/api/internals/:id/update',(req,res)=>{
    const id = req.params.id;

    const entity = req.body.entity;
    const machine = req.body.machine;
    const problem = req.body.problem;
    const user = req.body.user;
    const service = req.body.service;
    console.log(machine);
    db.query("UPDATE service_internal SET id_entity_si = ? ,id_machine_si = ?, problem = ?, id_user_si = ?, service_performed = ? WHERE id = ?",
        [entity ,machine, problem, user, service, id],
        (err,result)=>{
        if(err) {
            console.log(err)
            res.send(err);
        } else{
            console.log(result)
            res.send(result);
        }
        });    
    });
}

//External Schedulings
{
    // Route to get all Externals
    app.get("/api/externals", (req,res)=>{
    db.query("SELECT * FROM external_scheduling",
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
    
    // Route to get Externals by limit
    app.get("/api/externals/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT external_scheduling.id, machines.num_serial as machine_num, entities.name as entity_name, zone.name as zone_name, zone.color as zone_color, external_scheduling.date_scheduling FROM external_scheduling LEFT JOIN entities ON entities.id = external_scheduling.id_entity_es LEFT JOIN machines ON machines.id = external_scheduling.id_machine_es LEFT JOIN zone ON zone.id = entities.id_zone_adress LIMIT ?, ?", [page, perPage], 
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
    

    // Route to get one External by id
    app.get("/api/externals/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT external_scheduling.*, entities.name as entity_name, entities.code as entity_code, entities.street_adress as entity_street_adress, entities.number_adress as entity_number_adress, entities.district_adress as entity_district_adress, zone.name as zone_name, machines.num_serial as machine_num, users.realname as user_name FROM external_scheduling LEFT JOIN entities ON entities.id = external_scheduling.id_entity_es LEFT JOIN machines ON machines.id = external_scheduling.id_machine_es LEFT JOIN users ON users.id = external_scheduling.id_user_es LEFT JOIN zone ON zone.id = entities.id_zone_adress WHERE external_scheduling.id = ?", id, 
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });


    // Route for creating a External
    app.post('/api/externals/create', (req,res)=> {

    const entity = req.body.entity;
    const machine = req.body.machine;
    const problem = req.body.problem;
    const user = req.body.user;
    const comment = req.body.comment;
    const date = req.body.date;

    db.query("INSERT INTO external_scheduling (id_entity_es, id_machine_es, id_user_es, problem, comment, date_scheduling) VALUES (?,?,?,?,?,?)",
        [entity, machine, user, problem, comment, date],
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }});
    })

    // Route to update a External
    app.patch('/api/externals/:id/update',(req,res)=>{
    const id = req.params.id;

    const entity = req.body.entity;
    const machine = req.body.machine;
    const problem = req.body.problem;
    const user = req.body.user;
    const comment = req.body.comment;
    const date = req.body.date;

    db.query("UPDATE external_scheduling SET id_entity_es = ? ,id_machine_es = ?, problem = ?, id_user_es = ?, comment = ?, date_scheduling = ? WHERE id = ?",
        [entity ,machine, problem, user, comment, date, id],
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
}

//Equipments Inputs
{
    // Route to get all Inputs
    app.get("/api/inputs", (req,res)=>{
    db.query("SELECT * FROM input_equipment",
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
    
    // Route to get Inputs by limit
    app.get("/api/inputs/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT input_equipment.*, entities.name as entity_name, machines.num_serial as machine_num, users.realname as user_name FROM input_equipment LEFT JOIN entities ON entities.id = input_equipment.id_entity_ie LEFT JOIN machines ON machines.id = input_equipment.id_machine_ie LEFT JOIN users ON users.id = input_equipment.id_user_ie ORDER BY input_equipment.id DESC LIMIT ?, ?", [page, perPage], 
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
    

    // Route to get one Inputs by id
    app.get("/api/inputs/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT input_equipment.*, entities.name as entity_name, entities.code as entity_code, entities.street_adress as entity_street_adress, entities.number_adress as entity_number_adress, entities.district_adress as entity_district_adress, zone.name as zone_name, machines.num_serial as machine_num, machines.model as machine_model, primary_users.realname as user_name, second_users.realname as second_user_name FROM input_equipment LEFT JOIN entities ON entities.id = input_equipment.id_entity_ie LEFT JOIN zone ON zone.id = entities.id_zone_adress LEFT JOIN machines ON machines.id = input_equipment.id_machine_ie LEFT JOIN users as primary_users ON primary_users.id = input_equipment.id_user_ie LEFT JOIN users as second_users ON second_users.id = input_equipment.id_second_user_ie WHERE input_equipment.id = ?", id, 
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err)
        } else {
            //console.log(result)
            res.send(result)
        }});
    });


    // Route for creating a Input
    app.post('/api/inputs/create', (req,res)=> {

    const entity = req.body.entity;
    const machine = req.body.machine;
    const responsable = req.body.responsable;
    const phone_responsable = req.body.phone_responsable;

    const user = req.body.user;
    const problem = req.body.problem;
    const comment = req.body.comment;
    const date_input = req.body.date_input;
    const peripheral = req.body.peripheral;

    db.query("INSERT INTO input_equipment (id_machine_ie, problem, date_input, id_user_ie, comment, id_entity_ie, peripheral, responsable, phone_responsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [machine, problem, date_input, user, comment, entity, peripheral, responsable, phone_responsable],
        (err,result)=>{
        if(err) {
            //console.log(err)
            res.send(err);
        } else{
            //console.log(result)
            res.send(result);
        }});
    })

    // Route to update a Input
    app.patch('/api/inputs/:id/update',(req,res)=>{
    const id = req.params.id;

    const entity = req.body.entity;
    const machine = req.body.machine;
    const responsable = req.body.responsable;
    const phone_responsable = req.body.phone_responsable;
    
    const user = req.body.user;
    const problem = req.body.problem;
    const comment = req.body.comment;
    const peripheral = req.body.peripheral;
    const date_input = req.body.date_input;

    db.query("UPDATE input_equipment SET id_entity_ie = ?, id_machine_ie = ?, id_user_ie = ?, problem = ?, comment = ?, peripheral = ?, date_input = ?, responsable = ?, phone_responsable = ? WHERE input_equipment.id = ?",
        [entity, machine, user, problem, comment, peripheral, date_input, responsable, phone_responsable, id],
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


    // Route to get Inputs NOT TERMINATEDs
    app.get("/api/inputs/not/terminateds", (req,res)=>{

    db.query("SELECT input_equipment.*, entities.name as entity_name, machines.num_serial as machine_num, users.realname as user_name FROM input_equipment LEFT JOIN entities ON entities.id = input_equipment.id_entity_ie LEFT JOIN machines ON machines.id = input_equipment.id_machine_ie LEFT JOIN users ON users.id = input_equipment.id_user_ie WHERE input_equipment.date_exit IS NULL ORDER BY input_equipment.date_input DESC", 
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

    // Route to get all Inputs TERMINATEDs
    app.get("/api/inputs/terminateds", (req,res)=>{
    db.query("SELECT * FROM input_equipment WHERE date_exit IS NOT NULL",
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

    // Route to get Inputs TERMINATEDs by limit
    app.get("/api/inputs/terminateds/page=:page/perPage=:perPage", (req,res)=>{

    const perPage = Number(req.params.perPage);
    const page = Number(req.params.page) * perPage;

    db.query("SELECT input_equipment.*, entities.name as entity_name, machines.num_serial as machine_num, users.realname as user_name FROM input_equipment LEFT JOIN entities ON entities.id = input_equipment.id_entity_ie LEFT JOIN machines ON machines.id = input_equipment.id_machine_ie LEFT JOIN users ON users.id = input_equipment.id_user_ie WHERE input_equipment.date_exit IS NOT NULL ORDER BY input_equipment.date_exit DESC LIMIT ?, ?", [page, perPage], 
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

    // Route to TERMINATE a Input
    app.patch('/api/inputs/:id/terminate',(req,res)=>{
    const id = req.params.id;

    const user = req.body.user;
    const secondUser = req.body.secondUser;
    const service = req.body.service;
    const comment = req.body.comment;

    db.query("UPDATE input_equipment SET id_user_ie = ?, id_second_user_ie = ?, service_performed = ?, comment = ?, date_exit = NOW() WHERE input_equipment.id = ?",
        [user, secondUser, service, comment, id],
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
}

// Dashboard
{
    // Route to get all Technicans
    app.get("/api/calls", (req,res)=>{
    db.query("SELECT users.nickname as username, COUNT(input_equipment.id) as score FROM users JOIN input_equipment ON users.id = input_equipment.id_user_ie OR users.id = input_equipment.id_second_user_ie WHERE input_equipment.date_exit IS NOT null GROUP BY username",
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

    // Route to get all Zones
    app.get("/api/zones", (req,res)=>{
    db.query("SELECT zone.name as zonename, zone.color as zonecolor, COUNT(date_scheduling) as score FROM external_scheduling JOIN entities ON entities.id = external_scheduling.id_entity_es JOIN zone ON zone.id = entities.id_zone_adress GROUP BY zone.name",
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

    // Route to get all Historic PerMonth
    app.get("/api/historic/:year", (req,res)=>{
        const year = req.params.year;
        db.query("SELECT month(date_input) as month,COUNT(date_input) as inputs, COUNT(date_exit) as exits FROM input_equipment WHERE year(date_input) = ? GROUP BY month(date_input) ORDER BY month(date_input) ASC", [year], 
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

    // Route to get all Historic Years
    app.get("/api/historic-years", (req,res)=>{
        db.query("SELECT year(date_input) as year FROM input_equipment GROUP BY year(date_input)", 
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
}


//Listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})