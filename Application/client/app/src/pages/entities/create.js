import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function CreateEntity() {
    const navigate = useNavigate();

    const [code, setCode ] = useState("");
    const [name, setName ] = useState("");
    const [phone, setPhone ] = useState("");
    const [zone_adress, setZone_adress ] = useState("");
    const [name_manager, setName_manager ] = useState("");
    const [phone_manager, setPhone_manager] = useState("");
    const [district_adress, setDistrict_adress] = useState("");
    const [cep_adress, setCep_adress] = useState("");
    const [number_adress, setNumber_adress] = useState("");
    const [street_adress, setStreet_adress] = useState("");

    console.log(code, name);

    const addEntity = () => {
        axios.post("http://10.10.136.109:3002/entities/create", {
            code: code,
            name: name,
            phone: phone,
            name_manager: name_manager,
            phone_manager: phone_manager,
            cep_adress: cep_adress,
            street_adress: street_adress,
            number_adress: number_adress,
            district_adress: district_adress,
            zone_adress: zone_adress
        })
        .then(function (r) {
            console.log(r.data.code)
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, código já cadastrado!');
            } else {
                alert('Adicionado!');
                navigate('/entities');
            }
        })
        .catch(function (e) {
            alert('Erro de conexão!');
        });
    };

    const cancelAdd = () => {
        navigate('/entities');
    }

    return(
        <div className="create-update">
            <h1>Create Entity</h1>
            
            <Form className="form-create-update"> 
                <div className="columns">
                    <FormGroup>
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
                            placeholder="Phone"
                            type='text'
                            onChange={(event) => {
                                setPhone(event.target.value);
                            }}
                        />

                        <Label>Manager Name:</Label>
                        <Input
                            placeholder="Manager Name"
                            type='text'
                            onChange={(event) => {
                                setName_manager(event.target.value);
                            }}
                        />
                        
                        <Label>Manager Phone:</Label>
                        <Input
                            placeholder="Manager Phone"
                            type='text'
                            onChange={(event) => {
                                setPhone_manager(event.target.value);
                            }}
                        />
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <Label>CEP:</Label>
                        <Input
                            placeholder="CEP"
                            type='text'
                            onChange={(event) => {
                                setCep_adress(event.target.value);
                            }}
                        />

                        <Label>Street:</Label>
                        <Input
                            placeholder="Street"
                            type='text'
                            onChange={(event) => {
                                setStreet_adress(event.target.value);
                            }}
                        />

                        <Label>Number:</Label>
                        <Input
                            placeholder="Number"
                            type='number'
                            onChange={(event) => {
                                setNumber_adress(event.target.value);
                            }}
                        />

                        <Label>District:</Label>
                        <Input
                            placeholder="District"
                            type='text'
                            onChange={(event) => {
                                setDistrict_adress(event.target.value);
                            }}
                        />

                        <Label>Zone:</Label>
                        <Input
                            placeholder="Zone"
                            type='text'
                            onChange={(event) => {
                                setZone_adress(event.target.value);
                            }}
                        />
                    </FormGroup>
                </div>
                <Button color="primary" onClick={addEntity}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};