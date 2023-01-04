import React, { useState } from "react";
import axios from 'axios';
import { Button } from "reactstrap";

import './home.css';

export default function Home() {
    const [usersList, setUsersList] = useState([]);

    const getUsers = () => {
        axios.get('http://localhost:3002/users').then((res) => {
            setUsersList(res.data);
        });
    };

    return(
        <div className="home">
            <h1>TESTE HOME</h1>
            <Button onClick={getUsers}>Carregar Users</Button>
            {usersList?.map((val, key) => {
                return (
                    <ul className="users" key={key}>
                        <p>{val.id}</p>
                        <p>{val.nickname}</p>
                        <p>{val.password}</p>
                    </ul>
                )
            })}
        </div>
    );
};