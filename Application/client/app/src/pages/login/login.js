import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "reactstrap";

import './login.css';

export default function Login() {
    const navigate = useNavigate();

    const verifyUser = () => {
        let nickname = document.getElementById('nickname').value;
        let password = document.getElementById('password').value;

        axios.get('http://localhost:3002/users').then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                if (nickname === res.data[i].nickname && password === res.data[i].password) {
                    alert('Você está logado!');
                    navigate('/users');
                } else {
                    alert('User or password incorrect!')
                };
            };
        });
    };

    return(
        <div className="login">
            <h1>DMEIsys</h1>

            <Form>
                <h4>Login</h4>
                <Input
                    id="nickname"
                    placeholder="nickname">
                </Input>
                <Input
                    id="password"
                    placeholder="password"
                    type="password">
                </Input>
                <hr />
                <Button color="primary" onClick={verifyUser}>Entrar</Button>
            </Form>

        </div>
    );
};