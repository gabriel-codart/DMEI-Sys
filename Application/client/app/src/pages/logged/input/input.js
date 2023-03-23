import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Form, Label, Card, Alert } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';
import { AiOutlineQrcode } from 'react-icons/ai';

import { jsPDF } from "jspdf";
import QRCode from "react-qr-code";

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

    //Export QrCode to PDF
    const handleExportPDF = () => {
        const svg = document.getElementById("QrCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
          const pdf = new jsPDF({
            orientation: 'l',
            unit: 'px',
            format: [500, 500],
          });
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 150, 150, 200, 200);
          pdf.save('qr-code.pdf');
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return(
        <div className="read-one">
            <h1>Entrada de Equipamento</h1>

            {inputData?.map((val, key) => {
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

                        <Label>Serviço Realizado: 
                            <Alert color="secondary">{val.service_performed}</Alert>
                        </Label>
                        <br/>
                        <Label>Comentário: 
                            <Alert color="secondary">{val.comment}</Alert>
                        </Label>

                        <hr/>
                            <div id="QrCode-Card" style={{padding: "30px", borderRadius: "10px"}}>
                                <QRCode
                                id="QrCode"
                                size={200}
                                style={{
                                    width: "auto",
                                    height: "auto",
                                }}
                                    value={`Escola: ${val.entity_name}\nCod.: ${val.entity_code}\n\nMáquina: ${val.machine_model}\nN/S: ${val.machine_num}\n\nProblema: ${val.problem}\nSolução: ${val.service_performed}\n\nData de Entrada: ${val.date_input}\nData de Saída: ${val.date_exit}\n`}
                                />
                            </div>
                            
                            <Button color="light"
                                onClick={handleExportPDF}>
                                Baixar <AiOutlineQrcode/>
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