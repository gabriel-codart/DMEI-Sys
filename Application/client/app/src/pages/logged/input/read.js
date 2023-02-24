import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { Button, Form, Input } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';

import '../../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Inputs() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [inputsList, setInputsList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting inputs
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.100:3002/inputs/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setInputsList(res.data);
        });

        axios.get('http://10.10.136.100:3002/inputs/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);


    //Open Input
    const openInput = (id) => {
        navigate(`/inputs/${id}`);
    }

    //Add input
    const goToAdd = () => {
        navigate('/inputs/create');
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Id',
            id: 'id',
            selector: row => row.id,
            sortable: true,
            width: '80px',
            center: 'yes'
        },
        {
            name: 'Entidade',
            selector: row => row.entity_name,
            center: 'yes'
        },
        {
            name: 'Máquina',
            selector: row => row.machine_num,
            center: 'yes'
        },
        {
            name: 'Problema',
            width: '120px',
            selector: row => row.problem,
            center: 'yes'
        },
        {
            name: 'Entrada',
            selector: row => {
                const date = new Date(row.date_input);
                const offset = date.getTimezoneOffset();
                date.setMinutes(date.getMinutes() - offset);
                return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' }));
            },
            center: 'yes'
        },
        {
            name: 'Abrir',
            selector: row => <Button
                                color="primary"
                                onClick={() => openInput(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
            width: '100px',
            center: 'yes'
        },
    ];
    const tableData = inputsList?.filter(
      (obj) =>
        obj.entity_name && obj.entity_name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((obj) => {
      return {
        id: obj.id,
        machine_num: obj.machine_num,
        entity_name: obj.entity_name,
        problem: obj.problem,
        date_input: obj.date_input,
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
                <h1>Entrada de Equipamentos</h1>
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
                defaultSortFieldId={'id'}
                defaultSortAsc={false}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};