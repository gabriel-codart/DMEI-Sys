import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";
import Select from 'react-select';

import '../styles/create-update.css';

export default function UpdateInternal() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [internalId] = useState(id);
    const [internalData, setInternalData] = useState([]);

    const [machine, setMachine ] = useState("");
    const [user, setUser ] = useState("");
    const [problem, setProblem ] = useState("");
    const [service, setService ] = useState("");

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
                    label: obj.realname
                }
            }));
        });
        axios.get(`http://10.10.136.100:3002/internals/${internalId}`).then((res) => {
            setInternalData(res.data);

            setMachine({value: res.data[0].id_machine_si});
            setProblem(res.data[0].problem);
            setUser({value: res.data[0].id_user_si});
            setService({value: res.data[0].service_performed});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id, internalId])

    //Confirm update
    const updateInternal = () => {
        axios.put(`http://10.10.136.100:3002/internals/${id}/update`, {
            machine: machine.value,
            problem: problem,
            user: user.value,
            service: service,
        })
        .then(function (r) {
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, número de série já cadastrado!');
            } else {
                alert('Atulizado!');
                navigate('/internals');
            }
        })
        .catch(function (e) {
            alert('Erro de Conexão com o Banco!');
        });
    };

    //Cancel update
    const cancelUpdate = () => {
        navigate('/machines');
    }

    return(
        <div className="create-update">
            <h1>Atualizar Serviço</h1>

            {internalData?.map((val, key) => {
                return (
                    <Form className="form-create-update" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>
                        
                        <Label>Máquina:</Label>
                        <Select
                            options={machinesList}
                            defaultValue={machinesList[(machine.value -1)]}
                            onChange={setMachine}
                        />

                        <Label>Problema:</Label>
                        <Input
                            defaultValue={val.problem}
                            placeholder="Problema"
                            type='textarea'
                            onChange={(event) =>{
                                setProblem(event.target.value);
                            }}
                        />

                        <Label>Usuário:</Label>
                        <Select
                            options={usersList}
                            defaultValue={usersList[(user.value -1)]}
                            onChange={setUser}
                        />

                        <Label>Serviço:</Label>
                        <Input
                            defaultValue={val.service_performed}
                            placeholder="Serviço"
                            type='textarea'
                            onChange={(event) =>{
                                setService(event.target.value);
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