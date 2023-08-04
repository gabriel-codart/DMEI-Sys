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
    const [observation, setObservation ] = useState(null);

    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/machines/${id}`).then((res) => {
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
            axios.post("http://10.10.136.100:3002/api/records/create", {
                id_machine: machineData[0].id,
                id_entity: machineData[0].id_entities_m,
                action: "Desativado",
                deactivate_doc: null,
                observation: observation,
            }).then(function (r) {
                //console.log(r);
                axios.patch(`http://10.10.136.100:3002/api/machines/${r.data.insertId}/deactivate/doc`, deactivate_doc, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then((r) => {
                    //console.log(r);
                    axios.patch(`http://10.10.136.100:3002/api/machines/${id}/deactivate`)
                    .then((r) => {
                        alert('Desativado com sucesso!');
                        navigate(`/dmei-sys/machines/${id}/`)
                    })
                    .catch((e) => {
                        alert('Erro de Conexão com o Banco!');
                    });
                })
                .catch((e) => {
                    alert('Erro de Conexão com o Banco!');
                });
            }).catch(function (e) {
                //console.log(e);
            })
        };
    };

    //Cancel Deactivate
    const cancelDeactivate = () => {
        navigate(`/dmei-sys/machines/${id}/deactivate`);
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
                                    <>
                                    <p>Desativação Liberada!</p>
                                    <Label>Observação:</Label>
                                    <Input
                                        defaultValue={val.observation}
                                        value={observation}
                                        placeholder="Observação"
                                        type='textarea'
                                        onChange={(event) =>{
                                            if (!event.target.value === true) {
                                                setObservation(null);
                                            } else {
                                                setObservation(event.target.value);
                                            }
                                        }}
                                    />
                                    </>
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