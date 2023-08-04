import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";
import Select from 'react-select';

import '../../styles/create-update.css';

export default function CreateInternal() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [entity, setEntity ] = useState({value:null, name:"Nome da Escola...", code:"Código da Escola..."});
    const [machine, setMachine ] = useState(null);
    const [text_machines, setText_machines] = useState(null);
    const [problem, setProblem ] = useState(null);
    const [user, setUser ] = useState(null);

    const [entitiesNameList, setEntitiesNameList] = useState([]);
    const [entitiesCodeList, setEntitiesCodeList] = useState([]);
    const [machinesList, setMachinesList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('http://10.10.136.100:3002/api/entities').then((res) => {
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
        axios.get('http://10.10.136.100:3002/api/users').then((res) => {
            setUsersList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.nickname
                }
            }));
        });
    },[ver])
    useEffect(() => {
        if (entity !== '') {
        axios.get(`http://10.10.136.100:3002/api/machines/entity/${entity.value}`).then((res) => {
            setMachinesList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.num_serial
                }
            }));
        });
        }
    },[entity])

    //On Change Entity
    const onChangeEntity = () => {
        setMachine(null);
    }

    //Confirm ADD
    const addInternal = () => {
        if (machine === null && (text_machines === null)) alert('Informe uma ou mais máquinas!')
        else if (user === null) alert('Informe um ou mais técnicos!')
        else{
            axios.post("http://10.10.136.100:3002/api/internals/create", {
                entity: entity.value,
                machine: machine[0].value,
                text_machines: text_machines,
                problem: problem,
                user: user[0].value,
            })
            .then(function (r) {
                //Alert if there is Empty Fields
                if(r.data.code === 'ER_BAD_NULL_ERROR') {
                    const column = r.data.sqlMessage.split(' ');
                    let field = ("");
                    switch (column[1]) {
                        case `'id_entity_si'`:
                            field = "Entidade"
                            break;
                        case `'problem'`:
                            field = "Problema"
                            break;
                        default:
                            break;
                    }
                    alert('Erro, o campo ' + field + ' está vazio!');
                }
                //Alert if the Post was Successful
                else {
                    for (let count = 0; count < machine.length; count++) {
                        axios.post("http://10.10.136.100:3002/api/internals/create/item-machine", {
                            id_service: r.data.insertId,
                            id_machine: machine[count].value
                        })
                        .then((res)=>{
                            //console.log(res);
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    }

                    for (let count = 0; count < user.length; count++) {
                        axios.post("http://10.10.136.100:3002/api/internals/create/item-user", {
                            id_service: r.data.insertId,
                            id_user: user[count].value
                        })
                        .then((res)=>{
                            //console.log(res);
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    }
                    alert('Adicionado!');
                    navigate(`/dmei-sys/internals`);
                }
            })
            .catch(function (e) {
                alert('Erro na conexão!');
            });
        }
    };

    const cancelAdd = () => {
        navigate(`/dmei-sys/internals`);
    };

    return(
        <div className="create-update">
            <h1>Adicionar</h1>
            <h4>Serviço Interno</h4>

            <Form className="form-create-update">
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
                            placeholder='Código da Máquina...'
                            options={machinesList}
                            defaultValue={machine}
                            value={machine}
                            onChange={setMachine}
                            isMulti
                        />

                        <br/>

                        <Input
                            placeholder='Equipamentos...'
                            type='textarea'
                            onChange={(event) =>{
                                if (!event.target.value === true) {
                                    setText_machines(null);
                                } else {
                                    setText_machines(event.target.value);
                                }
                            }}
                        />

                        <br/>
                    </CardBody>
                </Card>

                <Label>Técnico:</Label>
                <Select
                    placeholder="Nome do Técnico..."
                    options={usersList}
                    defaultValue={user}
                    value={user}
                    onChange={setUser}
                    isMulti
                />

                <Label>Problema:</Label>
                <Input 
                    placeholder="Problema..."
                    type='textarea'
                    onChange={(event) =>{
                        if (!event.target.value === true) {
                            setProblem(null);
                        } else {
                            setProblem(event.target.value);
                        }
                    }}
                />

                <hr/>
                
                <Button color="primary" onClick={addInternal}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};