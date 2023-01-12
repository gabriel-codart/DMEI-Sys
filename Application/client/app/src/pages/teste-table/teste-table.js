import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import { Button, Form, Input } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

import '../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function TesteTable() {
    const navigate = useNavigate();

    const [usersList, setUsersList] = useState([]);
    const [searchedNick, setSearchedNick] = useState('');

    //Get all users
    const getAll = () => {
        axios.get(`http://10.10.136.109:3002/users/`,)
        .then((res) => {
            setUsersList(res.data);
        });
    }
    //Get users by search
    useEffect(() => {
        if (searchedNick === '') {
            getAll();
        } else{
            axios.get(`http://10.10.136.109:3002/users/nick=${searchedNick}`,)
            .then((res) => {
                setUsersList(res.data);
            });
        };
    }, [searchedNick]);

    //Delete user
    const dialogDelete = (id) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteUser(id);
                        getAll();
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteUser = (id) => {
        axios.delete(`http://10.10.136.109:3002/users/${id}/delete`)
        .then((res) => {
            alert('Usuário removido!');
        });
    }

    //Update user
    const updateUser = (id) => {
        navigate(`/users/${id}/update/`);
    }

    //Add user
    const addUser = () => {
        navigate('/users/create');
    }

    //Config Table
    const columns = ["Name", "Company", "City", "State"];

    const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ];

    const options = {
    filterType: 'checkbox',
    };

    <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
    />

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Users</h1>
                <Button color='primary' onClick={addUser}>Adicionar</Button>
            </div>

            <hr/>
            
            

            {/*usersList?.map((val, key) => {
                return (
                    <ul className="read-list" key={key}>
                        <div className='read-data'>
                            <p>{val.id}</p>
                            <p>{val.nickname}</p>
                            <p>{val.password}</p>
                            <p>{val.realname}</p>
                        </div>
                        <div className='read-buttons'>
                            <Button
                                title="Editar"
                                color="info"
                                onClick={() => {updateUser(val.id)}}>
                                    <BiEdit/>
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
            })*/}
        </div>
    );
};