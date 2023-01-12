import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from "react-icons/ri";

import '../styles/read-one.css';
import { confirmAlert } from "react-confirm-alert";

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
        navigate(`/entities/${id}/update`)
    };

    //Delete Entity
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteEntity(id);
                        navigate('/entities');
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteEntity = (id) => {
        axios.delete(`http://10.10.136.109:3002/entities/${id}/delete`)
        .then((res) => {
            alert('Entidade deletada!');
        });
    }

    //Back to Entities Menu
    const goBack = () => {
        navigate('/entities');
    }

    return(
        <div className="read-one">
            <h1>Entity</h1>

            {entityData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <h5>Id: <strong>{val.id}</strong></h5>

                        <div style={{
                            display:'grid',
                            gridTemplateColumns:'200px 50px 200px'
                        }}>
                            <FormGroup className="column">
                                <Label>Code: {val.code}</Label>
                                <Label>Name: {val.name}</Label>
                                <Label>Phone: {val.phone}</Label>
                                <Label>Manager Name: {val.name_manager}</Label>
                                <Label>Manager Phone: {val.phone_manager}</Label>
                            </FormGroup>
                            <br/>
                            <FormGroup className="column">
                                <Label>CEP: {val.cep_adress}</Label>
                                <Label>Street: {val.street_adress}</Label>
                                <Label>Number: {val.number_adress}</Label>
                                <Label>District: {val.district_adress}</Label>
                                <Label>Zone: {val.zone_adress}</Label>
                            </FormGroup>
                        </div>

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