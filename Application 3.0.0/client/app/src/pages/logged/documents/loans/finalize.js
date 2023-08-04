import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";

import '../../../styles/create-update.css';

export default function LoanUpload() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [loan, setLoan] = useState("");
    const [loanList, setLoanList] = useState([]);

    const [machines, setMachines] = useState(null);

    const [loan_doc, setLoan_doc] = useState(null);
    const [docSelected, setDocSelected] = useState(null);

    //Get the Dispatch data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/loans/doc-null`)
        .then((res) => {
            setLoanList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.id,
                    entity: obj.id_entities_del
                }
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ver]);

    //Get the Machines data
    useEffect(() => {
        if (loan !== ""){
            let id = loan.value.split(' ')[2];
            let year = loan.value.split(' ')[4];

            axios.get(`http://10.10.136.100:3002/api/loans/${id}/${year}/itens`)
            .then((res) => {
                setMachines(res.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loan]);

    //Confirm Loan
    const loanMachine = () => {
        //Alert if there is Empty Fields
        if (loan_doc === null) {
            alert('Erro, o campo Documento está vazio!');
        }
        else{
            let id = loan.value.split(' ')[2];
            let year = loan.value.split(' ')[4];

            axios.patch(`http://10.10.136.100:3002/api/loans/create/doc-loan/${id}/${year}`, loan_doc, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((r) => {
                for (let count = 0; count < machines.length; count++) {
                    axios.patch(`http://10.10.136.100:3002/api/machines/${machines[count].id_machine_del}/loan`, {
                        id_entity: loan.entity
                    })
                    .then((r) => {
                        //console.log(r);
                    })
                    .catch((e) => {
                        alert('Erro de Conexão com o Banco!');
                    });
                }
                alert('Empréstimo Liberado com sucesso!');
                navigate(`/dmei-sys/documents/loans`)
            })
            .catch((e) => {
                alert('Erro de Conexão com o Banco!');
            });
        };
    };

    //Cancel Loan
    const cancelLoan = () => {
        navigate(`/dmei-sys/documents/loans`);
    }

    return(
        <div className="read-one">
            <h1>Empréstimo</h1>
            <h4>Guardar Termo</h4>

            <hr/>

            <Card color="light" outline>
                <CardBody>
                    <Label>Empréstimo:</Label>
                    <Select
                        placeholder='Código da Empréstimo...'
                        options={loanList}
                        defaultValue={loan}
                        value={loan}
                        onChange={setLoan}
                    />
                </CardBody>
                <br/>
            </Card>

            {machines !== null ? (
                <Form className="form-create-update">
                    <hr/>
                    <h5><strong>{loan.value}</strong></h5>
                    <hr/>
                    
                    <Card color="light" outline>
                        <CardBody>
                            <Label>Termo de Empréstimo:</Label>
                            <Input
                                placeholder="Termo de Empréstimo"
                                type="file"
                                name="file"
                                accept="application/pdf"
                                onChange={(event) =>{
                                    if (!event.target.value === true) {
                                        setLoan_doc(null);
                                        setDocSelected(null);
                                    } else {
                                        const file = event.target.files[0];
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        setLoan_doc(formData);
                                        setDocSelected(event.target.value);
                                    }
                                }}
                            />

                            <hr/>

                            {docSelected ? (
                                <p>Documento carregado! Finalize para emprestar a Máquina</p>
                            ) : (
                                <p>Carregue o Termo para emprestar a Máquina</p>
                            )}
                        </CardBody>
                        <br/>
                    </Card>

                    <hr/>
                    
                    {docSelected ? (
                        <Button color="success" onClick={loanMachine}>Finalizar</Button>
                    ) : ("")}
                </Form>
            ) : ('')}

            <hr/>

            <Form className="form-read-one">
                <Button color="secondary" onClick={cancelLoan}>Cancelar</Button>
            </Form>
        </div>
    );
};