import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Select from 'react-select';

import '../styles/create-update.css';

export default function UpdateMachine() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [machineId] = useState(id);
    const [machineData, setMachineData] = useState([]);

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
        axios.get(`http://10.10.136.100:3002/machines/${machineId}`).then((res) => {
            setMachineData(res.data);

            setNum_serial(res.data[0].num_serial);
            setModel(res.data[0].model);
            setDescription(res.data[0].description);
            setId_type({value: res.data[0].id_type_m});
            setId_entity({value: res.data[0].id_entities_m});
            setStatus({value: res.data[0].status});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id, machineId])

    //Confirm update
    const updateMachine = () => {
        axios.put(`http://10.10.136.100:3002/machines/${id}/update`, {
            num_serial: num_serial,
            model: model,
            description: description,
            id_type_m: id_type.value,
            id_entities_m: id_entity.value,
            status: status.value,
        })
        .then(function (r) {
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, número de série já cadastrado!');
            } else {
                alert('Atulizado!');
                navigate('/machines');

                //Registra no Historico
                if (id_entity.value !== machineData[0].id_entities_m){
                    axios.post("http://10.10.136.100:3002/records/create", {
                        id_machine: machineId,
                        id_entity: id_entity.value,
                        action: 'Atualizado',
                    }).then(function (r) {
                        //console.log(r);
                    }).catch(function (e) {
                        //console.log(e);
                    })
                }
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
            <h1>Atualizar Máquinas</h1>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-create-update" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>
                        
                        <div className="columns">
                            <FormGroup>
                                <Label>Número de Série:</Label>
                                <Input
                                    defaultValue={val.num_serial}
                                    placeholder="Número de Série"
                                    type='text'
                                    onChange={(event) => {
                                        setNum_serial(event.target.value)
                                    }}
                                />

                                <Label>Modelo:</Label>
                                <Input
                                    defaultValue={val.model}
                                    placeholder="Modelo"
                                    type='text'
                                    onChange={(event) =>{
                                        setModel(event.target.value);
                                    }}
                                />

                                <Label>Descrição:</Label>
                                <Input
                                    defaultValue={val.description}
                                    placeholder="Descrição"
                                    type='text'
                                    onChange={(event) =>{
                                        setDescription(event.target.value);
                                    }}
                                />

                                <Label>ID Entidade: {val.id_entities_m}</Label>
                                <Select
                                    options={entitiesList}
                                    defaultValue={entitiesList[(id_entity.value -1)]}
                                    onChange={setId_entity}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>ID Tipo: {val.id_type_m}</Label>
                                <Select
                                    options={typesList}
                                    defaultValue={typesList[(id_type.value -1)]}
                                    onChange={setId_type}
                                />

                                <Label>Status:</Label>
                                <Select
                                    options={statusList}
                                    defaultValue={statusList[status.value]}
                                    onChange={setStatus}
                                />
                            </FormGroup>
                        </div>
                        <hr/>
                        
                        <Button color="primary" onClick={updateMachine}>Atualizar</Button>
                        <Button color="danger" onClick={cancelUpdate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};