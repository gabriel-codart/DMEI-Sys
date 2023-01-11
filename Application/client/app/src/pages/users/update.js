import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function UpdateUser() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [userId] = useState(id);
    const [userData, setUserData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://localhost:3002/users/${userId}`)
        .then((res) => {
            setUserData(res.data);
        });
    }, [userId]);

    //Confirm update
    const updateUser = () => {
        axios.put(`http://localhost:3002/users/${id}/update`,{
            nickname: document.getElementById('nickname').value,
            password: document.getElementById('password').value,
            realname: document.getElementById('realname').value,
        })
        .then(function (r) {
            alert('Atualizado!');
            navigate('/users');
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    //Cancel update
    const cancelUpdate = () => {
        navigate('/users');
    }

    return(
        <div className="create">
            <h1>Update User</h1>

            {userData?.map((val, key) => {
                return (
                    <Form className="form-create" key={key}>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <Label>Nickname:</Label>
                        <Input
                            id="nickname"
                            defaultValue={val.nickname}
                            placeholder="Nickname"
                            type='text'
                        />
                        <Label>Password:</Label>
                        <Input
                            id="password"
                            defaultValue={val.password}
                            placeholder="Password"
                            type='text'
                        />
                        <Label>Realname:</Label>
                        <Input
                            id="realname"
                            defaultValue={val.realname}
                            placeholder="Realname"
                            type='text'
                        />
                        <Button color="primary" onClick={updateUser}>Atualizar</Button>
                        <Button color="danger" onClick={cancelUpdate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};