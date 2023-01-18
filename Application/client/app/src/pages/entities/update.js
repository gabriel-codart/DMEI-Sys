import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function UpdateEntity() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [entityId] = useState(id);
    const [entityData, setEntityData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://10.10.136.109:3002/entities/${entityId}`)
        .then((res) => {
            setEntityData(res.data);
        });
    }, [entityId]);

    //Confirm update
    const updateEntity = () => {
        axios.put(`http://10.10.136.109:3002/entities/${id}/update`,{
            code: document.getElementById('code').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            name_manager: document.getElementById('name_manager').value,
            phone_manager: document.getElementById('phone_manager').value,
            cep_adress: document.getElementById('cep_adress').value,
            street_adress: document.getElementById('street_adress').value,
            number_adress: document.getElementById('number_adress').value,
            district_adress: document.getElementById('district_adress').value,
            zone_adress: document.getElementById('zone_adress').value
        })
        .then(function (r) {
            if (r.data.code === 'ER_DUP_ENTRY') {
                alert('Erro, nickname já cadastrado!');
            } else {
                alert('Atulizado!');
                navigate('/entities');
            }
        })
        .catch(function (e) {
            alert('Erro!');
        });
    };

    //Cancel update
    const cancelUpdate = () => {
        navigate('/entities');
    }

    return(
        <div className="create-update">
            <h1>Update Entity</h1>

            {entityData?.map((val, key) => {
                return (
                    <Form className="form-create-update" key={key}>
                        <h5>Id: <strong>{val.id}</strong></h5>

                        <div className="columns">
                            <FormGroup>
                                <Label>Code:</Label>
                                <Input
                                    id="code"
                                    defaultValue={val.code}
                                    placeholder="Code"
                                    type='text'
                                />

                                <Label>Name:</Label>
                                <Input
                                    id="name"
                                    defaultValue={val.name}
                                    placeholder="Name"
                                    type='text'
                                />

                                <Label>Phone:</Label>
                                <Input
                                    id="phone"
                                    defaultValue={val.phone}
                                    placeholder="Phone"
                                    type='text'
                                />

                                <Label>Manager Name:</Label>
                                <Input
                                    id="name_manager"
                                    defaultValue={val.name_manager}
                                    placeholder="Manager Name"
                                    type='text'
                                />
                                
                                <Label>Manager Phone:</Label>
                                <Input
                                    id="phone_manager"
                                    defaultValue={val.phone_manager}
                                    placeholder="Manager Phone"
                                    type='text'
                                />
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <Label>CEP:</Label>
                                <Input
                                    id="cep_adress"
                                    defaultValue={val.cep_adress}
                                    placeholder="CEP"
                                    type='text'
                                />

                                <Label>Street:</Label>
                                <Input
                                    id="street_adress"
                                    defaultValue={val.street_adress}
                                    placeholder="Street"
                                    type='text'
                                />

                                <Label>Number:</Label>
                                <Input
                                    id="number_adress"
                                    defaultValue={val.number_adress}
                                    placeholder="Number"
                                    type='number'
                                />

                                <Label>District:</Label>
                                <Input
                                    id="district_adress"
                                    defaultValue={val.district_adress}
                                    placeholder="District"
                                    type='text'
                                />

                                <Label>Zone:</Label>
                                <Input
                                    id="zone_adress"
                                    defaultValue={val.zone_adress}
                                    placeholder="Zone"
                                    type='text'
                                />
                            </FormGroup>
                        </div>
                        
                        <Button color="primary" onClick={updateEntity}>Atualizar</Button>
                        <Button color="danger" onClick={cancelUpdate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};