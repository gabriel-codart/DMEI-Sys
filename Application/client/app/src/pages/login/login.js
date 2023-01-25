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

        axios.get('http://10.10.136.100:3002/users')
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                if (nickname === res.data[i].nickname && password === res.data[i].password) {
                    console.log("Um");
                    signin(nickname);
                    alert('Você está logado!');
                    navigate('/dashboard');
                    return;
                };
            };
            alert('Usuário ou senha incorretos!');
        })
        .catch((err) => {
            alert('Erro na conexão!');
        });
    };

    return(
        <div className="login">
            <Form>
                <h1>DMEIsys</h1>
                <hr />
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
            <br/>
            <Button color="secondary">Entrar como Anônimo</Button>

        </div>
    );
};