import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Form, Input } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

import '../styles/read.css';

export default function OuterSched() {
    const navigate = useNavigate();

    const [outerSchedList, setOuterSchedList] = useState([]);
    const [searchedNick, setSearchedNick] = useState('');

    //Get users by search
    useEffect(() => {
        if (searchedNick === '') {
            axios.get(`http://localhost:3002/users/`,)
            .then((res) => {
                setOuterSchedList(res.data);
            });
        } else{
            axios.get(`http://localhost:3002/users/nick=${searchedNick}`,)
            .then((res) => {
                setOuterSchedList(res.data);
            });
        };
    }, [searchedNick]);

    //Delete user
    const deleteOuterSched = (id) => {
        axios.delete(`http://localhost:3002/users/${id}/delete`)
        .then((res) => {
            alert('Usuário removido!');
        });
    }

    //Update user
    const updateOuterSched = (id) => {
        navigate(`/users/${id}/update/`);
    }

    //Add user
    const addOuterSched = () => {
        navigate('/users/create');
    }

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Usuários</h1>
                <Button color='primary' onClick={addOuterSched}>Adicionar</Button>
            </div>
            
            <Form className="read-search">
                <Input
                    placeholder='Pesquise aqui'
                    type="text"
                    onChange={(event) => {
                        setSearchedNick(event.target.value);
                    }}
                />
            </Form>
            <ul className="read-list-top">
                <p>COD ESC</p>
                <p>NOME ESC</p>
                <p>ZONA</p>
                <p>NOME TEC</p>
            </ul>
            {outerSchedList?.map((val, key) => {
                return (
                    <ul className="read-list" key={key}>
                        <div className='read-data'>
                            <p>{val.id}</p>
                            <p>{val.nickname}</p>
                            <p>{val.password}</p>
                            <p>{val.realname}</p>
                        </div>
                        <div className='read-buttons'>
                            <Button color="info" onClick={() => {updateOuterSched(val.id)}}><BiEdit/></Button>
                            <Button color="danger" onClick={() => {deleteOuterSched(val.id)}}><RiDeleteBin2Line/></Button>
                        </div>
                    </ul>
                )
            })}
        </div>
    );
};