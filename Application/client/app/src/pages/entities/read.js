import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Form, Input } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

import '../styles/read.css';

export default function Entities() {
    const navigate = useNavigate();

    const [entitiesList, setEntitiesList] = useState([]);
    const [searchedName, setSearchedName] = useState('');

    //Get users by search
    useEffect(() => {
        if (searchedName === '') {
            axios.get(`http://localhost:3002/entities/`,)
            .then((res) => {
                setEntitiesList(res.data);
            });
        } else{
            axios.get(`http://localhost:3002/entities/name=${searchedName}`,)
            .then((res) => {
                setEntitiesList(res.data);
            });
        };
    }, [searchedName]);

    //Delete user
    const deleteEntity = (id) => {
        axios.delete(`http://localhost:3002/entities/${id}/delete`)
        .then((res) => {
            alert('Usuário removido!');
        });
    }

    //Update user
    const updateEntity = (id) => {
        navigate(`/entities/${id}/update/`);
    }

    //Add user
    const addEntity = () => {
        navigate('/entities/create');
    }

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Usuários</h1>
                <Button color='primary' onClick={addEntity}>Adicionar</Button>
            </div>
            
            <Form className="read-search">
                <Input
                    placeholder='Pesquise aqui'
                    type="text"
                    onChange={(event) => {
                        setSearchedName(event.target.value);
                    }}
                />
            </Form>
            <ul className="read-list-top">
                <p>CODE</p>
                <p>NAME</p>
                <p>PHONE</p>
                <p>ZONE</p>
            </ul>
            {entitiesList?.map((val, key) => {
                return (
                    <ul className="read-list" key={key}>
                        <div className='read-data'>
                            <p>{val.code}</p>
                            <p>{val.name}</p>
                            <p>{val.phone}</p>
                            <p>{val.zone}</p>
                        </div>
                        <div className='read-buttons'>
                            <Button color="info" onClick={() => {updateEntity(val.id)}}><BiEdit/></Button>
                            <Button color="danger" onClick={() => {deleteEntity(val.id)}}><RiDeleteBin2Line/></Button>
                        </div>
                    </ul>
                )
            })}
        </div>
    );
};