import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Form, Label } from "reactstrap";
import { BiEdit } from 'react-icons/bi';

import '../../styles/read-one.css';

export default function Internal() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [internalId] = useState(id);
    const [internalData, setInternalData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/internals/${internalId}`)
        .then((res) => {
            setInternalData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/internals/${id}/update`)
    };

    //Back to Entities Menu
    const goBack = () => {
        navigate('/internals');
    }

    return(
        <div className="read-one">
            <h1>Serviço Interno</h1>

            {internalData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>

                        <div className="column">
                            <Card color="light" outline>
                                <Label>Entidade: 
                                    <Alert color="secondary">{val.entity_name}</Alert>
                                </Label>

                                <Label>Máquina: 
                                    <Alert color="secondary">{val.machine_num}</Alert>
                                </Label>
                            </Card>

                            <Label>Técnico: 
                                <Alert color="secondary">{val.user_name}</Alert>
                            </Label>

                            <Label>Problema: 
                                <Alert color="secondary">{val.problem}</Alert>
                            </Label>

                            <Label>Serviço: 
                                <Alert color="secondary">{val.service_performed}</Alert>
                            </Label>
                        </div>
                        <hr/>

                        <Button
                            title="Editar"
                            color="primary"
                            onClick={() => {goToUpdate(val.id)}}>
                                <BiEdit/>
                        </Button>

                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
};