import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function CreateUser() {
    const navigate = useNavigate();

    const [nickname, setNickname ] = useState("");
    const [password, setPassword ] = useState("");
    const [realname, setRealname ] = useState("");

    const addUser = () => {
        axios.post("http://10.10.136.109:3002/users/create", {
            nickname: nickname,
            password: password,
            realname: realname,
        })
        .then(function (r) {
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, nickname já cadastrado!');
            } else {
                alert('Adicionado!');
                navigate('/users');
            }
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    const cancelAdd = () => {
        navigate('/users');
    }

    return(
        <div className="create-update">
            <h1>Create User</h1>

            <Form className="form-create-update"> 
                <Label>Nickname:</Label>
                <Input
                    placeholder="Nickname"
                    type='text'
                    onChange={(event) =>{
                        setNickname(event.target.value);
                    }}
                />
                <Label>Password:</Label>
                <Input 
                    placeholder="Password"
                    type='text'
                    onChange={(event) =>{
                        setPassword(event.target.value);
                    }}
                />
                <Label>Realname:</Label>
                <Input 
                    placeholder="Realname"
                    type='text'
                    onChange={(event) =>{
                        setRealname(event.target.value);
                    }}
                />
                <Button color="primary" onClick={addUser}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};