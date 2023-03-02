import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";

import '../../../styles/create-update.css';

export default function MachineDeactivateFinalize() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [machineData, setMachineData] = useState([]);

    const [deactivate_doc, setDeactivate_doc] = useState(null);
    const [docSelected, setDocSelected] = useState(null);

    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/machines/${id}`).then((res) => {
            setMachineData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    //Confirm Deactivate
    const deactivateMachine = () => {
        //Alert if there is Empty Fields
        if (deactivate_doc === null) {
            alert('Erro, o campo Documento está vazio!');
        }
        else{
            axios.patch(`http://10.10.136.100:3002/machines/${id}/deactivate/doc`, deactivate_doc, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            .then((r) => {
                axios.patch(`http://10.10.136.100:3002/machines/${id}/deactivate`)
                .then((r) => {
                    alert('Desativado com sucesso!');
                    navigate(`/machines/${id}/`)
                })
                .catch((e) => {
                    alert('Erro de Conexão com o Banco!');
                });
            })
            .catch((e) => {
                alert('Erro de Conexão com o Banco!');
            });
        };
    };

    //Cancel Deactivate
    const cancelDeactivate = () => {
        navigate(`/machines/${id}/deactivate`);
    }

    return(
        <div className="create-update">
            <h1>Desativar</h1>
            <h4>Máquina</h4>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-create-update" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>
                        
                        <Card color="light" outline>
                            <CardBody>
                                <Label>Laudo de Desativação:</Label>
                                <Input
                                    placeholder="Laudo de Desativação"
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    onChange={(event) =>{
                                        if (!event.target.value === true) {
                                            setDeactivate_doc(null);
                                            setDocSelected(null);
                                        } else {
                                            const file = event.target.files[0];
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            setDeactivate_doc(formData);
                                            setDocSelected(event.target.value);
                                        }
                                    }}
                                />

                                <hr/>

                                {docSelected ? (
                                    <p>Desativação Liberada!</p>
                                ) : (
                                    <p>Carregue o Laudo de Desativação para liberar a Desativação da Máquina</p>
                                )}
                            </CardBody>
                            <br/>
                        </Card>

                        <hr/>
                        
                        {docSelected ? (
                            <Button color="danger" onClick={deactivateMachine}>Finalizar</Button>
                        ) : ("")}

                        <Button color="secondary" onClick={cancelDeactivate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};