import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function CreateEntity() {
    const navigate = useNavigate();

    const [code, setCode ] = useState("");
    const [name, setName ] = useState("");
    const [phone, setPhone ] = useState("");
    const [zone, setZone ] = useState("");

    const addEntity = () => {
        axios.post("http://localhost:3002/entities/create", {
            code: code,
            name: name,
            phone: phone,
            zone: zone,
        })
        .then(function (r) {
            alert('Adicionado!');
            navigate('/entities');
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    const cancelAdd = () => {
        navigate('/entities');
    }

    return(
        <div className="create">
            <h1>Create Entity</h1>

            <Form className="form-create"> 
            <Label>Code:</Label>
                <Input
                    placeholder="Code"
                    type='text'
                    onChange={(event) =>{
                        setCode(event.target.value);
                    }}
                />

                <Label>Name:</Label>
                <Input
                    placeholder="Name"
                    type='text'
                    onChange={(event) =>{
                        setName(event.target.value);
                    }}
                />
                <Label>Phone:</Label>
                <Input 
                    placeholder="Password"
                    type='text'
                    onChange={(event) =>{
                        setPhone(event.target.value);
                    }}
                />
                <Label>Zone:</Label>
                <Input 
                    placeholder="Zone"
                    type='text'
                    onChange={(event) =>{
                        setZone(event.target.value);
                    }}
                />
                <Button color="primary" onClick={addEntity}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};