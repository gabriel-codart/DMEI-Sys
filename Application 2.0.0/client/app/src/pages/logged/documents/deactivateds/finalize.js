import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";

import '../../../styles/create-update.css';

export default function DeactivateFinalize() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [deactivate, setDeactivate] = useState("");
    const [deactivateList, setDeactivateList] = useState([]);

    const [machineData, setMachineData] = useState([]);

    const [deactivate_doc, setDeactivate_doc] = useState(null);
    const [docSelected, setDocSelected] = useState(null);

    //Get the Machine data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/deactivateds/doc-null`)
        .then((res) => {
            console.log(res.data)
            setDeactivateList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.id + '  .  .  .  ' + obj.machine_serial + '  .  .  .  ' + obj.machine_model,
                    machine: obj.id_machine_d
                }
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ver]);

    //Get the Machine data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/machines/${deactivate.machine}`)
        .then((res) => {
            setMachineData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deactivate]);

    //Confirm Deactivate
    const deactivateMachine = () => {
        //Alert if there is Empty Fields
        if (deactivate_doc === null) {
            alert('Erro, o campo Documento está vazio!');
        }
        else{
            let id = deactivate.value.split(' ')[2];
            let year = deactivate.value.split(' ')[4];

            axios.patch(`http://10.10.136.100:3002/api/deactivateds/create/doc/${id}/${year}`, deactivate_doc, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((r) => {
                //console.log(r);
                axios.patch(`http://10.10.136.100:3002/api/machines/${deactivate.machine}/deactivate`)
                .then((r) => {
                    alert('Desativado com sucesso!');
                    navigate(`/dmei-sys/documents/deactivateds`)
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
        navigate(`/dmei-sys/documents/deactivateds`);
    }

    return(
        <div className="read-one">
            <h1>Desativação</h1>
            <h4>Guardar Laudo</h4>

            <hr/>

            <Card color="light" outline>
                <CardBody>
                    <Label>Máquina:</Label>
                    <Select
                        placeholder='Código da Máquina...'
                        options={deactivateList}
                        defaultValue={deactivate}
                        value={deactivate}
                        onChange={setDeactivate}
                    />
                </CardBody>
                <br/>
            </Card>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-create-update" key={key}>
                        <hr/>
                        <h5><strong>{deactivate.value}</strong></h5>
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
                                    <p>Documento carregado! Finalize para desativar a Máquina</p>
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
                    </Form>
                )
            })}

            <hr/>

            <Form className="form-read-one">
                <Button color="secondary" onClick={cancelDeactivate}>Cancelar</Button>
            </Form>
        </div>
    );
};