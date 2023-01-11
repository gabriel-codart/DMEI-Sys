import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/useAuth";
import { Form, Input, Button } from "reactstrap";

import './login.css';

export default function Login() {
    const { signin } = useAuth();

    const navigate = useNavigate();

    const verifyUser = () => {
        let nickname = document.getElementById('nickname').value;
        let password = document.getElementById('password').value;

        axios.get('http://10.10.136.109:3002/users')
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                if (nickname === res.data[i].nickname && password === res.data[i].password) {
                    signin(nickname);
                    alert('Você está logado!');
                    navigate('/entities');
                    return;
                } else {
                    console.log(res);
                };
            };
        })
        .catch((err) => {
            alert('Usuário ou senha incorretos!');
        });
    };

    return(
        <div className="login">
            <h1>DMEIsys</h1>

            <Form>
                <h4>Login</h4>
                <Input
                    id="nickname"
                    placeholder="Nickname">
                </Input>
                <Input
                    id="password"
                    placeholder="Password"
                    type="password">
                </Input>
                <hr />
                <Button color="primary" onClick={verifyUser}>Entrar</Button>
            </Form>

        </div>
    );
};