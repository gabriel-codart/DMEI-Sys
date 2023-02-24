import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Form, Label } from "reactstrap";
import { BiEdit } from 'react-icons/bi';

import '../../styles/read-one.css';

export default function Machine() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [machineId] = useState(id);
    const [machineData, setMachineData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/machines/${machineId}`)
        .then((res) => {
            //console.log(res);
            setMachineData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/machines/${id}/update`)
    };


    //Back to Entities Menu
    const goBack = () => {
        navigate('/machines');
    }

    return(
        <div className="read-one">
            <h1>Máquina</h1>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>

                        <div className="group-columns">
                            <div className="column">
                                <Label>Número de Série: 
                                    <Alert color="secondary">{val.num_serial}</Alert>
                                </Label>

                                <Label>Modelo: 
                                    <Alert color="secondary">{val.model}</Alert>
                                </Label>

                                <Label>Tipo: 
                                    <Alert color="secondary">{val.type_machine_name}</Alert>
                                </Label>
                            </div>

                            <br/>

                            <div className="column">
                                <Label>Entidade: 
                                    <Alert color="secondary">{val.entities_name}</Alert>
                                </Label>

                                <Label>Status: 
                                    <Alert color="secondary">{val.status_name}</Alert>
                                </Label>

                                <Label>Descrição: 
                                    <Alert color="secondary">{val.description}</Alert>
                                </Label>
                            </div>
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