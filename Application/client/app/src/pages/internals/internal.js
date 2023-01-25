import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Label } from "reactstrap";
import { BiEdit } from 'react-icons/bi';

import '../styles/read-one.css';

export default function Internal() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [internalId] = useState(id);
    const [internalData, setInternalData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/internals/${internalId}`)
        .then((res) => {
            //console.log(res);
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
            <h1>Internal</h1>

            {internalData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>
                            <Label>Máquina: {val.machine}</Label>
                            <br/>
                            <Label>Usuário: {val.user}</Label>
                            <br/>
                            <Label>Problema: {val.problem}</Label>
                            <br/>
                            <Label>Serviço: {val.service_performed}</Label>
                        <hr/>

                        <Button
                            title="Editar"
                            color="info"
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