import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function UpdateUser() {

    let {id} = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);

    const [newNickname, setNewNickname ] = useState("");
    const [newPassword, setNewPassword ] = useState("");
    const [newRealname, setNewRealname ] = useState("");

    const getUser = () => {
        axios.get(`http://localhost:3002/users/${id}`)
        .then((res) => {
            setUserData(res.data);
        });
    };

    const updateUser = () => {
        axios.put(`http://localhost:3002/users/update/${id}`,{
            nickname: newNickname,
            password: newPassword,
            realname: newRealname,
        })
        .then(function (r) {
            alert('Atualizado!');
            navigate('/users');
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    const cancelUpdate = () => {
        navigate('/users');
    }

    return(
        <div className="create" onLoad={getUser()}>
            <h1>Update User{id}</h1>

            {userData?.map((val, key) => {
                return (
                    <Form className="form-create" key={key}> 
                        <Label>Nickname:</Label>
                        <Input value={val.nickname}
                            placeholder="Nickname"
                            type='text'
                            onChange={(event) =>{
                                setNewNickname(event.target.value);
                            }}
                        />
                        <Label>Password:</Label>
                        <Input value={val.password}
                            placeholder="Password"
                            type='text'
                            onChange={(event) =>{
                                setNewPassword(event.target.value);
                            }}
                        />
                        <Label>Realname:</Label>
                        <Input value={val.realname}
                            placeholder="Realname"
                            type='text'
                            onChange={(event) =>{
                                setNewRealname(event.target.value);
                            }}
                        />
                        <Button color="primary" onClick={updateUser}>Atualizar</Button>
                        <Button color="danger" onClick={cancelUpdate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};