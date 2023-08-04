import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Card, Input } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentDownload } from 'react-icons/gr';

import { useReactToPrint } from 'react-to-print';

import '../../../styles/read-one.css';
import DocumentHeader from "../../doc_itens/header";

export default function InternalGenerateDOC() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [internalData, setInternalData] = useState([]);

    //Get the External data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/internals/${id}`)
        .then((res) => {
            setInternalData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Print Document
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/dmei-sys/internals/${id}/update`)
    };

    //Go Back to External
    const goBack = () => {
        navigate(`/dmei-sys/internals/${id}`);
    };

    return(
        <div className="read-one">
            <h1>Agendamento Externo</h1>
            <h5>Documento de Relatório</h5>

            {internalData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>

                        <div id="DocumentPDF" ref={componentRef}
                            style={{
                                width:'100%',
                                height:'auto',
                                background:'white',
                                padding:'30px',
                                fontFamily:'Times',
                                fontSize:'16px',
                                justifyContent:'center',
                                textAlign:'center'
                            }}>
                                <document>
                                    <DocumentHeader/>

                                    <Card><strong>OSI: {val.id}</strong></Card>

                                    <p><strong>Comprovante de Serviço Interno</strong></p>

                                    <hr/>

                                    <p style={{textAlign:"left", margin:'0px'}}>
                                        Código: <strong>{val.entity_code}</strong>
                                        <br/>
                                        Entidade: <strong>{val.entity_name}</strong> 
                                        <br/>
                                        Endereço: <strong>{val.entity_street_adress}, {val.entity_number_adress} - {val.entity_district_adress}</strong>
                                        <br/>
                                        Zona: <strong>{val.zone_name}</strong>
                                        <br/>
                                        Data de Emissão: <strong>
                                                            {(() => {
                                                                let date = new Date(Date.now());
                                                                return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
                                                            })()}
                                                        </strong>
                                        <br/>
                                        Setor Requisição: <strong>
                                                    <Input
                                                        style={{
                                                            display:'inline-flex',
                                                            fontFamily:'Times',
                                                            fontSize:'16px',
                                                            height:'30px',
                                                            width:'250px',
                                                            padding:'2px 10px'
                                                        }}
                                                        type='text'
                                                    />
                                                </strong>
                                    </p>

                                    <hr/>

                                    <p style={{textAlign:"left", margin:'0px'}}>
                                        Relatório de Atendimento:
                                        <strong>
                                            <Card>{val.service_performed}</Card>
                                            <Input
                                                style={{
                                                    fontFamily:'Times',
                                                    fontSize:'16px',
                                                }}
                                                type='textarea'
                                            />
                                        </strong>
                                        <br/>
                                        Problema: <strong>{val.problem}</strong>
                                        <br/>
                                        Comentário: <strong>{val.comment}</strong>
                                    </p>

                                    <hr/>
                                    
                                    <p style={{textAlign:"left", margin:'0px'}}>
                                        Autorização: <strong>Secretaria Municipal de Educação e Cultura de Teresina</strong>
                                        <br/><br/>
                                        <p style={{border:'1px dashed black', borderRadius:'5px', padding:'5px'}}>
                                            Serviço executado por: <line>____________________________________</line>
                                            <br/>
                                            Data: ___/___/______
                                        </p>
                                        <p style={{border:'1px dashed black', borderRadius:'5px', padding:'5px'}}>
                                            Serviço recebido por: <line>____________________________________</line>
                                            <br/>
                                            Data: ___/___/______
                                        </p>
                                    </p>
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
                            onClick={handlePrint}
                        >
                            Imprimir <GrDocumentDownload/>
                        </Button>

                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
}