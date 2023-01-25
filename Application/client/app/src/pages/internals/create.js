import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";
import Select from 'react-select';

import '../styles/create-update.css';

export default function CreateInternal() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [machine, setMachine ] = useState("");
    const [problem, setProblem ] = useState("");
    const [user, setUser ] = useState("");
    const [service, setService] = useState("");

    const [machinesList, setMachinesList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('http://10.10.136.100:3002/machines').then((res) => {
            setMachinesList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.num_serial
                }
            }));
        });
        axios.get('http://10.10.136.100:3002/users').then((res) => {
            setUsersList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.nickname
                }
            }));
        });
    },[ver])

    const addInternal = () => {
        axios.post("http://10.10.136.100:3002/internals/create", {
            machine: machine.value,
            problem: problem,
            user: user.value,
            service: service,
        })
        .then(function (r) {
            if(r.data.code === 'ER_BAD_NULL_ERROR') {
                alert('Erro, há campos ainda vazios!');
            }
            else {
                alert('Adicionado!');
                navigate('/internals');
            }
        })
        .catch(function (e) {
            alert('Erro na conexão!');
        });
    };

    const cancelAdd = () => {
        navigate('/internals');
    };

    return(
        <div className="create-update">
            <h1>Adicionar Máquina</h1>

            <Form className="form-create-update">
                <hr/>
                <Label>Máquina:</Label>
                <Select
                    defaultValue={machine}
                    onChange={setMachine}
                    options={machinesList}
                />

                <Label>Problema:</Label>
                <Input 
                    placeholder="Problema"
                    type='textarea'
                    onChange={(event) =>{
                        setProblem(event.target.value);
                    }}
                />

                <Label>Técnico:</Label>
                <Select
                    defaultValue={user}
                    onChange={setUser}
                    options={usersList}
                />

                <Label>Serviço Realizado:</Label>
                <Input 
                    placeholder="Serviço Realizado"
                    type='textarea'
                    onChange={(event) =>{
                        setService(event.target.value);
                    }}
                />
                <hr/>
                
                <Button color="primary" onClick={addInternal}>Adicionar</Button>
                <Button color="danger" onClick={cancelAdd}>Cancelar</Button>
            </Form>
        </div>
    );
};