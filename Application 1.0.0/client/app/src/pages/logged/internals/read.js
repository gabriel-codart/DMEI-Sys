import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { Button, Form, Input } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';

import '../../styles/read.css';
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

        axios.get(`http://10.10.136.100:3002/api/internals/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setInternalsList(res.data);
        });

        axios.get('http://10.10.136.100:3002/api/internals/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);


    //Open Internal
    const openInternal = (id) => {
        navigate(`/dmei-sys/internals/${id}`);
    }

    //Add user
    const goToAdd = () => {
        navigate(`/dmei-sys/internals/create`);
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
            sortable: true,
            center: 'yes'
        },
        {
            name: 'Máquina',
            selector: row => row.machine_num,
            center: 'yes'
        },
        {
            name: 'Técnico',
            selector: row => row.user_name,
            center: 'yes'
        },
        {
            name: 'Abrir',
            selector: row => <Button
                                color="primary"
                                onClick={() => openInternal(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
            width: '100px',
            center: 'yes'
        },
    ];
    const tableData = internalsList?.filter(
      (internal) =>
        (internal.user_name && internal.user_name.toLowerCase().includes(filterText.toLowerCase())) ||
        (internal.entity_name && internal.entity_name.toLowerCase().includes(filterText.toLowerCase())) ||
        (internal.zone_name && internal.zone_name.toLowerCase().includes(filterText.toLowerCase()))
    )
    .map((internal) => {
      return {
        id: internal.id,
        machine_num: internal.machine_num,
        user_name: internal.user_name,
        zone_name: internal.zone_name,
        zone_color: internal.zone_color,
        entity_name: internal.entity_name,
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
                defaultSortFieldId={'id'}
                defaultSortAsc={false}
                paginationRowsPerPageOptions={[2,10,50,100]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};