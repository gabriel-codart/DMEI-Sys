import React, { useState } from "react";
import axios from 'axios';
import { Alert, Button, Form, Input, Label } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

import './users.css';
import './create.css';
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();

    const [nickname, setNickname ] = useState("");
    const [password, setPassword ] = useState("");
    const [realname, setRealname ] = useState("");

    const addUser = () => {
        axios.post("http://localhost:3002/user/create", {
            nickname: nickname,
            password: password,
            realname: realname,
        }).then((res) => {
            console.log(res);
            Alert("Adicionado!");
        }).catch((err) => {
            console.log
            Alert("Error!")
        })
        navigate("/users");
    };

    return(
        <div className="users">
            <h1>Create user</h1>

            <Form className="create_users"> 
                <Label>Nickname:</Label>
                <Input
                    placeholder="nickname"
                    type='text'
                    onChange={(event) =>{
                        setNickname(event.target.value);
                    }}
                />
                <Label>Password:</Label>
                <Input 
                    placeholder="password"
                    type='text'
                    onChange={(event) =>{
                        setPassword(event.target.value);
                    }}
                    ></Input>
                <Label>Realname:</Label>
                <Input 
                    placeholder="realname"
                    type='text'
                    onChange={(event) =>{
                        setRealname(event.target.value);
                    }}></Input>
                <Button color="primary" onClick={addUser}>Adicionar</Button>
            </Form>
        </div>
    );
};