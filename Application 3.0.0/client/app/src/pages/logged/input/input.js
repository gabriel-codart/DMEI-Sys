import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PDFDocument } from 'pdf-lib';
import { confirmAlert } from "react-confirm-alert";

import { Button, Input, Form, Label, Card, Alert } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentPdf, GrDocumentDownload, GrDocumentUpload } from 'react-icons/gr';
import { RiDeleteBin2Line } from 'react-icons/ri';

import '../../styles/read-one.css';

export default function InputEquip() {
    const navigate = useNavigate();
    const location = useLocation();
    const [ver, setVer] = useState(true);

    const {id} = useParams();
    const [inputId] = useState(id);
    const [inputData, setInputData] = useState([]);

    const [exitDocument, setExitDocument] = useState(null);
    const [docSelected, setDocSelected] = useState(null);

    //Get the Input data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/inputs/${inputId}`)
        .then((res) => {
            console.log(res.data)
            setInputData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,ver]);

    //Save Exit Document
    const saveExitDocument = () => {
        //Alert if there is Empty Fields
        if (exitDocument === null) {
            alert('Erro, o campo Documento está vazio!');
        }
        else{
            axios.patch(`http://10.10.136.100:3002/api/inputs/${id}/exit/doc/add`, exitDocument, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((r)=>{
                alert('Saída assinada salva com sucesso!');
                setVer(!ver);
                console.log(r);
            })
            .catch((e)=>{
                alert('Erro de Conexão com o Banco!');
                //console.log(e);
            })
        }
    }

    //Download Report
    async function downloadExitDoc(buffer) {
        console.log(buffer);
        const pdfDoc = await PDFDocument.load(new Uint8Array(buffer.data));
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `OS ${id} - Assinado.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    //Delete Exit Document
    const removeDialog = () => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza que quer remover um documento de saída assinado?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        removeExitDocument();
                        setDocSelected(null);
                        setVer(!ver);
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    //Remove Exit Document
    const removeExitDocument = () => {
        axios.patch(`http://10.10.136.100:3002/api/inputs/${id}/exit/doc/remove`)
        .then((r)=>{
            alert('Documento removido!');
            //console.log(r);
        })
        .catch((e)=>{
            alert('Erro de Conexão com o Banco!');
            //console.log(e);
        })
    }

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
                                        <Alert color="secondary">{val.machine_model} - - {val.machine_num}</Alert>
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
                                        Aguardando...
                                    </Alert>
                                    )}
                                </Label>

                                <Label>Problema: 
                                    <Alert color="secondary">{val.problem}</Alert>
                                </Label>
                            </div>
                        </div>

                        <div style={{display:'grid'}}>
                        {val.service_performed ? (
                            <Label>Serviço Realizado: 
                                <Alert color="secondary">{val.service_performed}</Alert>
                            </Label>
                        ):('')}

                        {val.comment ? (
                            <Label>Comentário: 
                                <Alert color="secondary">{val.comment}</Alert>
                            </Label>
                        ):('')}
                        </div>

                        <hr/>

                        {val.date_exit ? (
                            <>
                            <p>Documento de Saída &#40;Assinado&#41;</p>

                            {!val.exit_assined ? (
                                <>
                                <Input
                                    placeholder="Laudo de Saída"
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    onChange={(event) =>{
                                        if (!event.target.value === true) {
                                            setExitDocument(null);
                                            setDocSelected(null);
                                        } else {
                                            const file = event.target.files[0];
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            setExitDocument(formData);
                                            setDocSelected(event.target.value);
                                        }
                                    }}
                                />
                                {docSelected ? (
                                    <Button color="light"
                                        title="Guardar Saída"
                                        onClick={saveExitDocument}
                                    >
                                        Salvar <GrDocumentUpload/>
                                    </Button>
                                ):(
                                    <Button color="light"
                                        title="Guardar Saída"
                                        disabled
                                    >
                                        Salvar <GrDocumentUpload/>
                                    </Button>
                                )}
                                </>
                            ):('')}

                            {val.exit_assined ? (
                                <>
                                <Button color="success"
                                    onClick={() => downloadExitDoc(val.exit_assined)}
                                >
                                    Imprimir Saída <GrDocumentDownload/>
                                </Button>
                                <Button color="danger"
                                    onClick={removeDialog}>
                                    <RiDeleteBin2Line/>
                                </Button>
                                </>
                            ) : ("")}

                            <hr/>
                            </>
                        ):('')}

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

                        {val.date_exit && !val.exit_assined ? (
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