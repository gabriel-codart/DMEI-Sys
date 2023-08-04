import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";

import '../../../styles/create-update.css';

export default function SubstitutionUpload() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [substitution, setSubstitution] = useState(null);
    const [substitutionList, setSubstitutionList] = useState([]);

    const [substitution_doc, setSubstitution_doc] = useState(null);
    const [docSelected, setDocSelected] = useState(null);

    //Get the Substitution data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/substitutions/doc-null`)
        .then((res) => {
            setSubstitutionList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.id,
                    entity: obj.id_entities_sub,
                    machine_in: obj.id_machine_in_sub,
                    machine_out: obj.id_machine_out_sub
                }
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ver]);

    //Confirm Substitution
    const substitutionMachine = () => {
        //Alert if there is Empty Fields
        if (substitution_doc === null) {
            alert('Erro, o campo Documento está vazio!');
        }
        else{
            let id = substitution.value.split(' ')[2];
            let year = substitution.value.split(' ')[4];

            axios.patch(`http://10.10.136.100:3002/api/substitutions/create/doc/${id}/${year}`, substitution_doc, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                axios.patch(`http://10.10.136.100:3002/api/machines/${substitution.machine_in}/substitution`,{
                    id_entity: substitution.entity
                })
                .then((res) => {
                    //console.log(res);
                    axios.patch(`http://10.10.136.100:3002/api/machines/${substitution.machine_out}/substitution`,{
                        id_entity: 339
                    })
                    .then((r) => {
                        //console.log(r);
                    })
                    .catch((e) => {
                        alert('Erro de Conexão com o Banco!');
                    });
                })
                .catch((err) => {
                    alert('Erro de Conexão com o Banco!');
                });

                alert('Substituído com sucesso!');
                navigate(`/dmei-sys/documents/substitutions`)
            })
            .catch((error) => {
                alert('Erro de Conexão com o Banco!');
            });
        };
    };

    //Cancel Substitution
    const cancelSubstitution = () => {
        navigate(`/dmei-sys/documents/substitutions`);
    }

    return(
        <div className="read-one">
            <h1>Substituíção</h1>
            <h4>Guardar Laudo</h4>

            <hr/>

            <Card color="light" outline>
                <CardBody>
                    <Label>Substituíção:</Label>
                    <Select
                        placeholder='Código da Substituíção...'
                        options={substitutionList}
                        defaultValue={substitution}
                        value={substitution}
                        onChange={setSubstitution}
                    />
                </CardBody>
                <br/>
            </Card>

            {substitution !== null ? (
                <Form className="form-create-update">
                    <hr/>
                    <h5><strong>{substitution?.value}</strong></h5>
                    <hr/>
                    
                    <Card color="light" outline>
                        <CardBody>
                            <Label>Laudo de Substituíção:</Label>
                            <Input
                                placeholder="Laudo de Substituíção"
                                type="file"
                                name="file"
                                accept="application/pdf"
                                onChange={(event) =>{
                                    if (!event.target.value === true) {
                                        setSubstitution_doc(null);
                                        setDocSelected(null);
                                    } else {
                                        const file = event.target.files[0];
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        setSubstitution_doc(formData);
                                        setDocSelected(event.target.value);
                                    }
                                }}
                            />

                            <hr/>

                            {docSelected ? (
                                <p>Documento carregado! Finalize para substituir a Máquina</p>
                            ) : (
                                <p>Carregue o Laudo de Substituição para substituir a Máquina</p>
                            )}
                        </CardBody>
                        <br/>
                    </Card>

                    <hr/>
                    
                    {docSelected ? (
                        <Button color="success" onClick={substitutionMachine}>Finalizar</Button>
                    ) : ("")}
                </Form>
            ) : ('')}

            <hr/>

            <Form className="form-read-one">
                <Button color="secondary" onClick={cancelSubstitution}>Cancelar</Button>
            </Form>
        </div>
    );
};