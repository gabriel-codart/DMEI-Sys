import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { confirmAlert } from "react-confirm-alert";
import { Button, Form, Input } from "reactstrap";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

import '../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function TesteTable() {
    const navigate = useNavigate();


    


    const [usersList, setUsersList] = useState([]);
    const [filterText, setFilterText] = useState("");
    const ver = 1;

    //Get all users
    const getAll = () => {
        axios.get(`http://10.10.136.109:3002/users/`,)
        .then((res) => {
            setUsersList(res.data);
            console.log(res.data[0].nickname)
        });
    }
    useEffect(() => {
        getAll();
    }, [ver]);
    //Get users by search

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
    const goToUpdate = (id) => {
        navigate(`/users/${id}/update/`);
    }

    //Add user
    const goToAdd = () => {
        navigate('/users/create');
    }

    console.log(usersList && {usersList});
    //Config Table and Search
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            width: '50px',
            center: 'yes'
        },
        {
            name: 'Nickname',
            selector: row => row.nickname,
            sortable: true,
            width: '150px',
            center: 'yes'
        },
        {
            name: 'Password',
            selector: row => row.password,
            center: 'yes'
        },
        {
            name: 'Realname',
            selector: row => row.realname,
            sortable: true,
            width: '200px',
            center: 'yes'
        },
        {
            name: 'Edit',
            selector: row => <Button color="info" ><BiEdit/></Button>,
            center: 'yes'
        },
        {
            name: 'Remove',
            selector: row => <Button
                                color="danger"
                                onClick={deleteUser}
                            >
                                <RiDeleteBin2Line/>
                            </Button>,
            center: 'yes'
        },
    ];
    const tableData = usersList?.filter(
      (user) =>
        user.nickname && user.nickname.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((user) => {
      return {
        id: user.id,
        nickname: user.nickname,
        password: user.password,
        realname: user.realname,
      };
    });

  /*const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };*/

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Users</h1>
                <Button color='primary' onClick={goToAdd}>Adicionar</Button>
            </div>

            <Form className="read-search">
                <Input
                    placeholder='Pesquise aqui'
                    type="text"
                    value={filterText}
                    onChange={(event) => {
                        setFilterText(event.target.value);
                    }}
                />
                <Button onClick={handleClear}>
                    X
                </Button>
            </Form>

            <hr/>
            <DataTable
                columns={columns}
                data={tableData}
                selectableRows
            />
        </div>
    );
};
