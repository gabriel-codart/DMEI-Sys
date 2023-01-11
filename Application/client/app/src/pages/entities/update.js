import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";

import '../styles/create-update.css';

export default function UpdateEntity() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [entityId] = useState(id);
    const [entityData, setEntityData] = useState([]);

    //Get the user data
    useEffect(() => {
        axios.get(`http://localhost:3002/entities/${entityId}`)
        .then((res) => {
            setEntityData(res.data);
        });
    }, [entityId]);

    //Confirm update
    const updateEntity = () => {
        axios.put(`http://localhost:3002/entities/${id}/update`,{
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            zone: document.getElementById('zone').value,
        })
        .then(function (r) {
            alert('Atualizado!');
            navigate('/entities');
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
        <div className="create">
            <h1>Update Entity</h1>

            {entityData?.map((val, key) => {
                return (
                    <Form className="form-create" key={key}>
                        <h5>Id: <strong>{val.id}</strong></h5>
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
                            defaultValue={val.password}
                            placeholder="Phone"
                            type='text'
                        />
                        <Label>Zone:</Label>
                        <Input
                            id="zone"
                            defaultValue={val.zone}
                            placeholder="Zone"
                            type='text'
                        />
                        <Button color="primary" onClick={updateEntity}>Atualizar</Button>
                        <Button color="danger" onClick={cancelUpdate}>Cancelar</Button>
                    </Form>
                )
            })}
        </div>
    );
};