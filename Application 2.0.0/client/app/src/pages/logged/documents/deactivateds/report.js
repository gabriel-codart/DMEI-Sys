import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import { Button, Form, Card, Input, CardBody, Label } from "reactstrap";
import { GrDocumentDownload } from 'react-icons/gr';

import { useReactToPrint } from 'react-to-print';

import '../../../styles/read-one.css';
import DocumentHeader from "../../doc_itens/header";

export default function DeactivateDOC() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [id, setID] = useState("");
    const [machine, setMachine ] = useState("");
    const [machinesList, setMachinesList] = useState([]);

    const [machineData, setMachineData] = useState(null);

    //Get the Machine data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/machines/`)
        .then((res) => {
            setMachinesList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.num_serial + '  .  .  .  ' + obj.model,
                }
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ver]);

    //Get the Machine data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/deactivateds/this-year`)
        .then((res) => {
            let date = new Date(Date.now());
            let year = String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(6,10);
            setID(`GA/DMEI Nº ${(res.data.length + 1)} / ${year} - PT`);
        });

        axios.get(`http://10.10.136.100:3002/api/machines/${machine.value}`)
        .then((res) => {
            setMachineData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [machine]);

    //ADD a Deactivation
    const deactivate = () => {
        axios.post("http://10.10.136.100:3002/api/deactivateds/create/", {
            id: id,
            machine: machine.value,
        })
        .then((res)=>{
            alert('Desativação Criada!');
            handlePrint();
        })
        .catch((err)=>{
            alert('Erro de Conexão com o Banco!');
        })
    }

    //Print Document
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //Go Back
    const goBack = () => {
        navigate(`/dmei-sys/documents/deactivateds/menu`);
    };

    return(
        <div className="read-one">
            <h1>Desativação</h1>
            <h5>Parecer Técnico</h5>

            <hr/>

            <Card color="light" outline>
                <CardBody>
                    <Label>Máquina:</Label>
                    <Select
                        placeholder='Código da Máquina...'
                        options={machinesList}
                        defaultValue={machine}
                        value={machine}
                        onChange={setMachine}
                    />
                </CardBody>
                <br/>
            </Card>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>

                        <div id="DocumentPDF" ref={componentRef}
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

                                    <Card><strong>{id}</strong></Card>

                                    <p><strong>Parecer Técnico</strong></p>

                                    <hr/>
                                    <br/><br/>
                                    <p style={{textAlign:"justify", margin:'0px'}}>
                                        Declaramos que o&#40;a&#41; <strong>{val.model} N/S:{val.num_serial}</strong> está
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

                        <Button color="success"
                            onClick={deactivate}
                        >
                            Imprimir <GrDocumentDownload/>
                        </Button>
                    </Form>
                )
            })}

            <hr/>

            <Form className="form-read-one">
                <Button color="secondary" onClick={goBack}>Voltar</Button>
            </Form>
        </div>
    );
}