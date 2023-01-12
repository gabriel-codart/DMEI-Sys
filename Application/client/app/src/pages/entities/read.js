import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import { Button, Form, Input } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { IoMdOpen } from 'react-icons/io';

import '../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Entities() {
    const navigate = useNavigate();

    const [entitiesList, setEntitiesList] = useState([]);
    const [searchedName, setSearchedName] = useState('');

    //Get all Entities
    const getAll = () => {
        axios.get(`http://10.10.136.109:3002/entities/`,)
        .then((res) => {
            setEntitiesList(res.data);
        });
    }
    //Get Entities by search
    useEffect(() => {
        if (searchedName === '') {
            getAll();
        } else{
            axios.get(`http://10.10.136.109:3002/entities/name=${searchedName}`,)
            .then((res) => {
                setEntitiesList(res.data);
            });
        };
    }, [searchedName]);

    //Delete Entity
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteEntity(id);
                        getAll();
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteEntity = (id) => {
        axios.delete(`http://10.10.136.109:3002/entities/${id}/delete`)
        .then((res) => {
            alert('Entidade deletada!');
        });
    }

    //Open Entity
    const openEntity = (id) => {
        navigate(`/entities/${id}`);
    }

    //Add Entity
    const addEntity = () => {
        navigate('/entities/create');
    }

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Entities</h1>
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
                            <p>{val.zone_adress}</p>
                        </div>
                        <div className='read-buttons'>
                            <Button
                                title="Ver Mais"
                                color="info"
                                onClick={() => {openEntity(val.id)}}>
                                    <IoMdOpen/>
                            </Button>
                            <Button
                                title="Deletar"
                                color="danger"
                                onClick={() => {dialogDelete(val.id)}}>
                                    <RiDeleteBin2Line/>
                            </Button>
                        </div>
                    </ul>
                )
            })}
        </div>
    );
};