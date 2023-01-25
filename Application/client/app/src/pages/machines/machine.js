import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from "react-icons/ri";

import '../styles/read-one.css';
import { confirmAlert } from "react-confirm-alert";

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

    //Delete Machine
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteMachine(id);
                        navigate('/entities');
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteMachine = (id) => {
        axios.delete(`http://10.10.136.100:3002/machines/${id}/delete`)
        .then((res) => {
            alert('Entidade deletada!');
        });
    }

    //Back to Entities Menu
    const goBack = () => {
        navigate('/machines');
    }

    return(
        <div className="read-one">
            <h1>Machine</h1>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>

                        <div style={{
                            display:'grid',
                            gridTemplateColumns:'300px 20px 300px'
                        }}>
                            <FormGroup className="column">
                                <Label>Número de Série: {val.num_serial}</Label>
                                <Label>Modelo: {val.model}</Label>
                                <Label>Descrição: {val.description}</Label>
                            </FormGroup>
                            <br/>
                            <FormGroup className="column">
                                <Label>Entidade: {val.entities_name}</Label>
                                <Label>Tipo: {val.type_machine_name}</Label>
                                {val.status === 1 ?
                                    <Label>Status: Ativo</Label>
                                    :
                                    <Label>Status: Inativo</Label>
                                }
                            </FormGroup>
                        </div>
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