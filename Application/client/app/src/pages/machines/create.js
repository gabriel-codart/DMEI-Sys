import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Select from 'react-select';

import '../styles/create-update.css';

export default function CreateMachine() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [num_serial, setNum_serial ] = useState("");
    const [model, setModel ] = useState("");
    const [description, setDescription ] = useState("");
    const [id_type, setId_type ] = useState("");
    const [id_entity, setId_entity ] = useState("");
    const [status, setStatus ] = useState("");

    const statusList = [{value: 0, label: 'Inativo'},
                        {value: 1, label: 'Ativo'}];
    const [typesList, setTypesList] = useState([]);
    const [entitiesList, setEntitiesList] = useState([]);
    useEffect(() => {
        axios.get('http://10.10.136.100:3002/machines-types').then((res) => {
            setTypesList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.name
                }
            }));
        });
        axios.get('http://10.10.136.100:3002/entities').then((res) => {
            setEntitiesList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.name
                }
            }));
        });
    },[ver])

    const addMachine = () => {
        axios.post("http://10.10.136.100:3002/machines/create", {
            num_serial: num_serial,
            model: model,
            description: description,
            id_type: id_type.value,
            id_entity: id_entity.value,
            status: status.value,
        })
        .then(function (r) {
            console.log(r.data.insertId);
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, número de série já cadastrado!');
            }
            else if(r.data.code === 'ER_BAD_NULL_ERROR') {
                alert('Erro, há campos ainda vazios!');
            }
            else {
                alert('Adicionado!');
                navigate('/machines');
                axios.post("http://10.10.136.100:3002/records/create", {
                    id_machine: r.data.insertId,
                    id_entity: id_entity.value,
                    action: 'Adicionado',
                }).then(function (r) {
                    //console.log(r);
                }).catch(function (e) {
                    //console.log(e);
                })
            }
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    const cancelAdd = () => {
        navigate('/machines');
    };

    return(
        <div className="create-update">
            <h1>Adicionar Máquina</h1>

            <Form className="form-create-update">
                <hr/>
                <div className="columns">
                    <FormGroup>
                        <Label>Número de série:</Label>
                        <Input
                            placeholder="Número de serie"
                            type='text'
                            onChange={(event) =>{
                                setNum_serial(event.target.value);
                            }}
                        />
                        <Label>Modelo:</Label>
                        <Input 
                            placeholder="Modelo"
                            type='text'
                            onChange={(event) =>{
                                setModel(event.target.value);
                            }}
                        />
                        <Label>Descrição:</Label>
                        <Input 
                            placeholder="Descrição"
                            type='textarea'
                            onChange={(event) =>{
                                setDescription(event.target.value);
                            }}
                        />
                        <Label>Entidade:</Label>
                        <Select
                            defaultValue={id_entity}
                            onChange={setId_entity}
                            options={entitiesList}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label>Tipo:</Label>
                        <Select
                            defaultValue={id_type}
                            onChange={setId_type}
                            options={typesList}
                        />

                        <Label>Status:</Label>
                        <Select
                            defaultValue={status}
                            onChange={setStatus}
                            options={statusList}
                        />
                    </FormGroup>
                </div>
                <hr/>
                
                <Button color="primary" onClick={addMachine}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};