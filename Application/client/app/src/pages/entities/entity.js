import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";

import '../styles/create-update.css';

export default function UpdateEntity() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [entityId] = useState(id);
    const [entityData, setEntityData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.109:3002/entities/${entityId}`)
        .then((res) => {
            setEntityData(res.data);
        });
    }, [entityId]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/entities/${id}`)
    };

    //Back to entities
    const goBack = () => {
        navigate('/entities');
    }

    return(
        <div className="create">
            <h1>Entity</h1>

            {entityData?.map((val, key) => {
                return (
                    <Form className="form-create" key={key}>
                        <h5>Id: <strong>{val.id}</strong></h5>

                        <div style={{
                            display:'grid',
                            gridTemplateColumns:'200px 50px 200px'
                        }}>
                            <FormGroup>
                                <Label>Code: {val.code}</Label>
                                <Label>Name: {val.name}</Label>
                                <Label>Phone: {val.phone}</Label>
                                <Label>Zone: {val.zone_adress}</Label>
                                <Label>Atributo: sdsaj</Label>
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <Label>Code: {val.code}</Label>
                                <Label>Name: {val.name}</Label>
                                <Label>Phone: {val.phone}</Label>
                                <Label>Zone: {val.zone_adress}</Label>
                                <Label>Atributo: asndkjas</Label>
                            </FormGroup>
                        </div>

                        <Button color="info" onClick={goToUpdate(val.id)}>Editar</Button>
                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
};