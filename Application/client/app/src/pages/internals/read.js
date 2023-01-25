import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { Button, Form, Input } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';

import '../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Internals() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [internalsList, setInternalsList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting users
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.100:3002/internals/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            console.log(res.data);
            setInternalsList(res.data);
        });

        axios.get('http://10.10.136.100:3002/internals/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);


    //Open Internal
    const openInternal = (id) => {
        navigate(`/internals/${id}`);
    }

    //Add user
    const goToAdd = () => {
        navigate('/internals/create');
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            width: '50px',
            center: 'yes'
        },
        {
            name: 'User',
            selector: row => row.user,
            sortable: true,
            width: '150px',
            center: 'yes'
        },
        {
            name: 'Machine',
            selector: row => row.machine,
            center: 'yes'
        },
        {
            name: 'Problem',
            selector: row => row.problem,
            sortable: true,
            width: '200px',
            center: 'yes'
        },
        {
            name: 'Service',
            selector: row => row.service_performed,
            sortable: true,
            width: '200px',
            center: 'yes'
        },
        {
            name: 'Open',
            selector: row => <Button
                                color="info"
                                onClick={() => openInternal(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
            center: 'yes'
        },
    ];
    const tableData = internalsList?.filter(
      (internal) =>
        internal.user && internal.user.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((internal) => {
      return {
        id: internal.id,
        machine: internal.machine,
        user: internal.user,
        problem: internal.problem,
        service_performed: internal.service_performed,
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
                <h1>Serviços Internos</h1>
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