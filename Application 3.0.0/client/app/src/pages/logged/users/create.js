import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import '../../styles/create-update.css';

export default function CreateUser() {
    const navigate = useNavigate();

    const [nickname, setNickname ] = useState("");
    const [password, setPassword ] = useState("");
    const [realname, setRealname ] = useState("");

    //Check the Permission
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")).type !== 1) navigate(`/dmei-sys/users`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const addUser = () => {
        axios.post("http://10.10.136.100:3002/api/users/create", {
            nickname: nickname,
            password: password,
            realname: realname,
        })
        .then(function (r) {
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, nickname já cadastrado!');
            } else {
                alert('Adicionado!');
                navigate(`/dmei-sys/users`);
            }
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    const cancelAdd = () => {
        navigate(`/dmei-sys/users`);
    }

    return(
        <div className="create-update">
            <h1>Adicionar</h1>
            <h4>Usuário</h4>

            <Form className="form-create-update">
                <hr/>
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
                <br/>
                <hr/>
                
                <Button color="primary" onClick={addUser}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};