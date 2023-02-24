import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Form, Card } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentDownload } from 'react-icons/gr';
import { pdfFromReact } from "generate-pdf-from-react-html";

import '../../../styles/read-one.css';
import DocumentHeader from "../../doc_itens/header";

export default function InputGenerateEntry() {
    const navigate = useNavigate();
    const location = useLocation();

    const {id} = useParams();
    const [inputId] = useState(id);
    const [inputData, setInputData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/inputs/${inputId}`)
        .then((res) => {
            setInputData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/inputs/${id}/update`)
    };

    //Go Back to Input
    const goBack = () => {
        if (location.pathname.slice(0,20) === '/inputs/terminateds/') {
            navigate(`/inputs/terminateds/${id}`);
        } else {
            navigate(`/inputs/${id}`);
        }
    };

    return(
        <div className="read-one">
            <h1>Entrada de Equipamento</h1>
            <h5>Documento de Entrada</h5>

            {inputData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>

                        <div id="DocumentPDF"
                            style={{
                                width:'100%',
                                height:'auto',
                                background:'white',
                                padding:'30px',
                                fontFamily:'Times',
                                fontSize:'10px',
                                justifyContent:'center',
                                textAlign:'center'
                            }}>
                                <document>
                                    <DocumentHeader/>

                                    <Card><strong>OS: {val.id}</strong></Card>

                                    <p><strong>Comprovante de Recebimento de Equipamento</strong></p>

                                    <p>
                                        Equipamento Recebido: <strong>{val.machine_model} </strong>
                                        . . . . . .
                                        N/S: <strong>{val.machine_num}</strong>
                                        <br/>
                                        Entidade Possuidora: <strong>{val.entity_name}</strong>
                                        <br/>
                                        Data de Emissão: <strong>
                                                            {(() => {
                                                                let date = new Date(Date.now());
                                                                return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
                                                            })()}
                                                        </strong>
                                    </p>

                                    <br/>
                                    <line>____________________________________</line>
                                    <p>Assinatura do Responsável</p>

                                    <br/>
                                    <line>____________________________________</line>
                                    <p>Assinatura Setor DMEI</p>
                                </document>

                                <hr style={{marginTop:'70px', marginBottom:'50px'}}/>

                                <document>
                                    <DocumentHeader/>

                                    <Card><strong>OS: {val.id}</strong></Card>

                                    <p><strong>Comprovante de Recebimento de Equipamento</strong></p>

                                    <p>
                                        Equipamento Recebido: <strong>{val.machine_model} </strong>
                                        . . . . . .
                                        N/S: <strong>{val.machine_num}</strong>
                                        <br/>
                                        Entidade possuidora: <strong>{val.entity_name}</strong>
                                        <br/>
                                        Data de Emissão: <strong>
                                                            {(() => {
                                                                let date = new Date(Date.now());
                                                                return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
                                                            })()}
                                                        </strong>
                                    </p>

                                    <br/>
                                    <line>____________________________________</line>
                                    <p>Assinatura do Responsável</p>

                                    <br/>
                                    <line>____________________________________</line>
                                    <p>Assinatura Setor DMEI</p>
                                </document>
                        </div>

                        <hr/>
                        <Button
                            title="Editar"
                            color="primary"
                            onClick={() => {goToUpdate(val.id)}}>
                                <BiEdit/>
                        </Button>
                        
                        <Button color="success"
                            onClick={() =>
                                pdfFromReact("#DocumentPDF", `OS-${val.id}-ENTRADA`, "p", false, false)
                            }
                        >
                            Gerar PDF <GrDocumentDownload/>
                        </Button>

                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
}