import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from "react-icons/ri";

import '../styles/read-one.css';
import { confirmAlert } from "react-confirm-alert";

export default function User() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [userId] = useState(id);
    const [userData, setUserData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/users/${userId}`)
        .then((res) => {
            setUserData(res.data);
        });
    }, [userId]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/users/${id}/update`)
    };

    //Delete User
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteUser(id);
                        navigate('/entities');
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteUser = (id) => {
        axios.delete(`http://10.10.136.100:3002/users/${id}/delete`)
        .then((res) => {
            alert('Usuário deletado!');
        });
    }

    //Back to Users Menu
    const goBack = () => {
        navigate('/users');
    }

    return(
        <div className="read-one">
            <h1>Usuário</h1>

            {userData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>

                        <Label>Nickname: {val.nickname}</Label>
                        <br/>
                        <Label>Password: {val.password}</Label>
                        <br/>
                        <Label>Realname: {val.realname}</Label>

                        <hr/>

                        <Button
                            title="Editar"
                            color="info"
                            onClick={() => {goToUpdate(val.id)}}>
                                <BiEdit/>
                        </Button>
                        <Button
                            title="Deletar"
                            color="danger"
                            onClick={() => {dialogDelete(val.id)}}>
                                <RiDeleteBin2Line/>
                        </Button>
                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
};