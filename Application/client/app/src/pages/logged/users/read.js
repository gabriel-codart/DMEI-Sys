import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { confirmAlert } from "react-confirm-alert";
import { Button, Form, Input } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';
import { RiDeleteBin2Line } from 'react-icons/ri';

import '../../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Users() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [usersList, setUsersList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting users
    useEffect(() => {
        console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.100:3002/users/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setUsersList(res.data);
        });

        axios.get('http://10.10.136.100:3002/users/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);

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
                        setFilterText("");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteUser = (id) => {
        axios.delete(`http://10.10.136.100:3002/users/${id}/delete`)
        .then((res) => {
            alert('Usuário removido!');
        });
    }

    //Update user
    const openUser = (id) => {
        navigate(`/users/${id}`);
    }

    //Add user
    const goToAdd = () => {
        navigate('/users/create');
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            width: '80px',
            center: 'yes'
        },
        {
            name: 'Nickname',
            selector: row => row.nickname,
            sortable: true,
            center: 'yes'
        },
        {
            name: 'Password',
            selector: row => "• • • • • • • • • •",
            center: 'yes'
        },
        {
            name: 'Realname',
            selector: row => row.realname,
            sortable: true,
            center: 'yes'
        },
        {
            name: 'Abrir',
            selector: row => <Button
                                color="primary"
                                onClick={() => openUser(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
            width: '100px',
            center: 'yes'
        },
        {
            name: 'Remover',
            selector: row => <Button
                                color="danger"
                                onClick={() => dialogDelete(row.id)}
                            >
                                <RiDeleteBin2Line/>
                            </Button>,
            width: '100px',
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

    const handleClear = () => {
        if (filterText) {
        setFilterText("");
        }
    };

    const handlePerRowsChange = (newPerPage) => {
        setPerPage(newPerPage);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    return(
        <div className="read">
            <div className='read-title'>
                <h1>Usuários</h1>
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
                    <MdClear/>
                </Button>
            </Form>

            <hr/>
            
            <DataTable
                columns={columns}
                data={tableData}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
                paginationRowsPerPageOptions={[2,10,50,100]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};