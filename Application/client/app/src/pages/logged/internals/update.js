import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";
import Select from 'react-select';

import '../../styles/create-update.css';

export default function UpdateInternal() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [internalId] = useState(id);
    const [internalData, setInternalData] = useState([]);

    const [entity, setEntity ] = useState("");
    const [machine, setMachine ] = useState("");
    const [user, setUser ] = useState("");
    const [problem, setProblem ] = useState(null);
    const [service, setService ] = useState(null);

    const [entitiesNameList, setEntitiesNameList] = useState([]);
    const [entitiesCodeList, setEntitiesCodeList] = useState([]);
    const [machinesList, setMachinesList] = useState([]);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        axios.get('http://10.10.136.100:3002/entities').then((res) => {
            setEntitiesNameList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.name,
                    code: obj.code,
                    name: obj.name
                }
            }));
            setEntitiesCodeList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.code,
                    code: obj.code,
                    name: obj.name
                }
            }));
        });
        axios.get('http://10.10.136.100:3002/users').then((res) => {
            setUsersList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.realname
                }
            }));
        });
        axios.get(`http://10.10.136.100:3002/internals/${internalId}`).then((res) => {
            setInternalData(res.data);

            setEntity({value: res.data[0].id_entity_si, name: res.data[0].entity_name, code: res.data[0].entity_code});
            setMachine({value: res.data[0].id_machine_si, label: res.data[0].machine_num});
            setProblem(res.data[0].problem);
            setUser({value: res.data[0].id_user_si, label: res.data[0].user_name});
            setService(res.data[0].service_performed);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id, internalId])

    useEffect(() => {        
        axios.get(`http://10.10.136.100:3002/machines/entity/${entity.value}`).then((res) => {
            setMachinesList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.num_serial
                }
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[entity])

    //On Change Entity
    const onChangeEntity = () => {
        setMachine({value: null, label: 'Código da Máquina...'});
    }

    //Confirm Update
    const updateInternal = () => {
        //Alert if there is Empty Fields
        if (problem === null) {
            alert('Erro, o campo Problema está vazio!');
        }
        else if (service === null) {
            alert('Erro, o campo Serviço Realizado está vazio!');
        }
        else{
            axios.patch(`http://10.10.136.100:3002/internals/${id}/update`, {
                entity: entity.value,
                machine: machine.value,
                problem: problem,
                user: user.value,
                service: service,
            })
            .then(function (r) {
                alert('Atulizado!');
                navigate('/internals');
            })
            .catch(function (e) {
                alert('Erro de Conexão com o Banco!');
            });
        };
    };

    //Cancel update
    const cancelUpdate = () => {
        navigate('/internals');
    }

    return(
        <div className="create-update">
            <h1>Atualizar</h1>
            <h4>Serviço Interno</h4>

            {internalData?.map((val, key) => {
                return (
                    <Form className="form-create-update" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>

                        <Card color="light" outline>
                            <CardBody>
                                <Label>Entidade:</Label>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <Select
                                        options={entitiesNameList}
                                        placeholder='Nome da Escola...'
                                        defaultValue={{value:entity.value, label:entity.name}}
                                        value={{value:entity.value, label:entity.name}}
                                        onChange={setEntity}
                                        onInputChange={(null, onChangeEntity)}
                                    />
                                    <p>&nbsp;&nbsp;</p>
                                    <Select
                                        options={entitiesCodeList}
                                        placeholder='Código da Escola...'
                                        defaultValue={{value:entity.value, label:entity.code}}
                                        value={{value:entity.value, label:entity.code}}
                                        onChange={setEntity}
                                        onInputChange={(null, onChangeEntity)}
                                    />
                                </div>
                                
                                <Label>Máquina:</Label>
                                <Select
                                    options={machinesList}
                                    defaultValue={machine}
                                    value={machine}
                                    onChange={setMachine}
                                />
                                <br/>
                            </CardBody>
                        </Card>

                        <Label>Técnico:</Label>
                        <Select
                            options={usersList}
                            defaultValue={user}
                            onChange={setUser}
                        />

                        <Label>Problema:</Label>
                        <Input
                            defaultValue={val.problem}
                            placeholder="Problema"
                            type='textarea'
                            onChange={(event) =>{
                                if (!event.target.value === true) {
                                    setProblem(null);
                                } else {
                                    setProblem(event.target.value);
                                }
                            }}
                        />

                        <Label>Serviço Realizado:</Label>
                        <Input
                            defaultValue={val.service_performed}
                            placeholder="Serviço Realizado..."
                            type='textarea'
                            onChange={(event) =>{
                                if (!event.target.value === true) {
                                    setService(null);
                                } else {
                                    setService(event.target.value);
                                }
                            }}
                        />

                        <hr/>
                        
                        <Button color="primary" onClick={updateInternal}>Atualizar</Button>
                        <Button color="danger" onClick={cancelUpdate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};