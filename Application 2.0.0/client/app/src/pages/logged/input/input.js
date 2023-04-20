import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Form, Label, Card, Alert } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';

import '../../styles/read-one.css';

export default function Input() {
    const navigate = useNavigate();
    const location = useLocation();

    const {id} = useParams();
    const [inputId] = useState(id);
    const [inputData, setInputData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/inputs/${inputId}`)
        .then((res) => {
            setInputData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Back to Inputs Menu
    const goBack = () => {
        if (location.pathname.slice(0,20) === '/inputs/terminateds/') {
            navigate(`/dmei-sys/inputs/terminateds`);
        } else {
            navigate(`/dmei-sys/inputs`);
        }
    }

    return(
        <div className="read-one">
            <h1>Entrada de Equipamento</h1>

            {inputData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>OS: <strong>{val.id}</strong></h5>
                        <hr/>

                        <div className="column">
                                <Card color="light" outline>
                                    <Label>Entidade: 
                                        <Alert color="secondary">{val.entity_name}</Alert>
                                    </Label>

                                    <Label>Máquina: 
                                        <Alert color="secondary">{val.machine_num}</Alert>
                                    </Label>

                                    <Label>Responsável:</Label>
                                    <div style={{display:'flex', justifyContent:'center'}}>
                                        <Alert color="secondary">{val.responsable}</Alert>
                                        <p>&nbsp;&nbsp;</p>
                                        <Alert color="secondary">{val.phone_responsable}</Alert>
                                    </div>
                                </Card>
                        </div>

                        <div className="group-columns">
                            <div className="column">
                                <Label>Técnico Primário: 
                                    <Alert color="secondary">{val.user_name}</Alert>
                                </Label>

                                <Label>Data de Entrada: 
                                    <Alert color="secondary">
                                        {(() => {
                                            const date = new Date(val.date_input);
                                            const offset = date.getTimezoneOffset();
                                            date.setMinutes(date.getMinutes() - offset);
                                            return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' }));
                                        })()}
                                    </Alert>
                                </Label>
                                
                                <Label>Periféricos: 
                                    <Alert color="secondary">{val.peripheral}</Alert>
                                </Label>
                            </div>
                            <br/>
                            <div className="column">
                                <Label>Técnico Secundário:
                                    {val.id_second_user_ie ? (
                                    <Alert color="secondary">
                                        {val.second_user_name}
                                    </Alert>
                                    ) : (
                                    <Alert color="secondary">
                                        Não Possui...
                                    </Alert>
                                    )}
                                </Label>

                                <Label>Data de Saída: 
                                    {val.date_exit ? (
                                    <Alert color="secondary">
                                        {(() => {
                                            const date = new Date(val.date_exit);
                                            const offset = date.getTimezoneOffset();
                                            date.setMinutes(date.getMinutes() - offset);
                                            return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' }));
                                        })()}
                                    </Alert>
                                    ) : (
                                    <Alert color="secondary">
                                        Em Reparo...
                                    </Alert>
                                    )}
                                </Label>

                                <Label>Problema: 
                                    <Alert color="secondary">{val.problem}</Alert>
                                </Label>
                            </div>
                        </div>

                        <div style={{display:'grid'}}>
                            <Label>Serviço Realizado: 
                                <Alert color="secondary">{val.service_performed}</Alert>
                            </Label>
                            <Label>Comentário: 
                                <Alert color="secondary">{val.comment}</Alert>
                            </Label>
                        </div>
                        
                        <hr/>
                        
                        <Button color="warning" disabled>
                            Documentos
                        </Button>

                        <hr/>

                        <Button
                            title="Editar"
                            color="primary"
                            onClick={() => {navigate('update')}}>
                                <BiEdit/>
                        </Button>
                        
                        <Button color="warning"
                            onClick={() => {navigate('entry')}}>
                            Entrada <GrDocumentPdf/>
                        </Button>

                        {val.date_exit ? (
                            <Button color="warning"
                                onClick={() => {navigate('exit')}}>
                                Saída <GrDocumentPdf/>
                            </Button>
                        ) : ("")}
                        

                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
};