import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Card, Input } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentDownload } from 'react-icons/gr';
import { pdfFromReact } from "generate-pdf-from-react-html";

import '../../../styles/read-one.css';
import DocumentHeader from "../../doc_itens/header";

export default function MachineDeactivateDOC() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [machineData, setMachineData] = useState([]);

    //Get the Machine data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/machines/${id}`)
        .then((res) => {
            setMachineData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/dmei-sys/machines/${id}/update`)
    };

    //Go Back to Machine
    const goBack = () => {
        navigate(`/dmei-sys/machines/${id}/deactivate`);
    };

    return(
        <div className="read-one">
            <h1>Máquina</h1>
            <h5>Documento de Desativação</h5>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>

                        <div id="DocumentPDF"
                            style={{
                                width:'100%',
                                height:'auto',
                                background:'white',
                                padding:'30px 80px',
                                fontFamily:'Times',
                                fontSize:'12px',
                                justifyContent:'center',
                                textAlign:'center'
                            }}>
                                <document>
                                    <DocumentHeader/>

                                    <Card><strong>M: {val.id}</strong></Card>

                                    <p><strong>Parecer Técnico</strong></p>

                                    <hr/>
                                    <br/><br/>
                                    <p style={{textAlign:"justify", margin:'0px'}}>
                                        Declaramos que o&#40;a&#41; <strong>{val.type_machine_name} {val.model} N/S:{val.num_serial}</strong> está
                                        danificado&#40;a&#41; e sem possibilidade de reparo, impossibilitando, assim, o funcionamento da mesma.
                                        Tendo em vista que não temos substitutos adequados para suprir a necessidade
                                        da <strong>{val.entities_name} / Cód: {val.entities_code}</strong> deve-se, assim, substituir a máquina por outro equipamento.
                                        Mediante isto, reiteramos a solicitação em caráter de necessidade de um novo substituto para continuar as
                                        atividades no setor.
                                    </p>
                                    <br/>
                                    <p>
                                        Problema:
                                        <Input
                                            style={{
                                                fontFamily: 'Times',
                                                fontSize: '12px',
                                            }}
                                            type='textarea'
                                        />
                                    </p>
                                    <br/><br/>
                                    <hr/>

                                    Data de Emissão: <strong>
                                                        {(() => {
                                                            let date = new Date(Date.now());
                                                            return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
                                                        })()}
                                                    </strong>
                                    <hr/>
                                    
                                    <br/><br/>
                                    <p>Teresina &#40;PI&#41;, ___ de _______________ de {(() => {
                                                                                            let date = new Date(Date.now());
                                                                                            return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(6,10);
                                                                                        })()}
                                    </p>

                                    <br/><br/>
                                    <line>____________________________________</line>
                                    <p>Assinatura do Recebedora</p>

                                    <br/><br/>
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
                                pdfFromReact("#DocumentPDF", `M-${val.id}-LAUDO`, "p", false, false)
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