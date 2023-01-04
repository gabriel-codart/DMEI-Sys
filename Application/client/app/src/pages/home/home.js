import React, { useState } from "react";
import axios from 'axios';
import { Button } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

import './home.css';

export default function Home() {
    const [usersList, setUsersList] = useState([]);

    const getUsers = () => {
        axios.get('http://localhost:3002/users').then((res) => {
            setUsersList(res.data);
        });
    };

    return(
        <div className="home" onLoad={getUsers()}>
            <h1>Users</h1>
            <ul className="users-list-top">
                <p>id</p>
                <p>nickname</p>
                <p>password</p>
                <p>realname</p>
            </ul>
            {usersList?.map((val, key) => {
                return (
                    <ul className="users-list" key={key}>
                        <p>{val.id}</p>
                        <p>{val.nickname}</p>
                        <p>{val.password}</p>
                        <p>{val.realname}</p>
                        <Button color="primary"><BiEdit/></Button>
                        <Button color="danger"><RiDeleteBin2Line/></Button>
                    </ul>
                )
            })}
        </div>
    );
};