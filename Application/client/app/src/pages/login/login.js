import React from "react";
import { Form, Input, Button } from "reactstrap";

import './login.css';

export default function Login() {
    return(
        <div className="login">
            <h1>DMEIsys</h1>

            <Form>
                <h4>Login</h4>
                <Input
                    id="username"
                    placeholder="username">
                </Input>
                <Input
                    id="password"
                    placeholder="password"
                    type="password">
                </Input>
                <hr />
                <Button color="primary">Entrar</Button>
            </Form>

        </div>
    );
};