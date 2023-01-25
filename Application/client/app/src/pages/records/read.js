import { React, useEffect, useState } from "react";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { Button, Form, Input } from "reactstrap";
import { MdClear } from 'react-icons/md';

import '../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Records() {

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [recordsList, setRecordsList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting records
    useEffect(() => {
        console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.100:3002/records/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setRecordsList(res.data);
        });

        axios.get('http://10.10.136.100:3002/records/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);

    //Config Table and Search
    const columns = [
        {
            name: 'Record',
            selector: row => row.id,
            width: '100px',
            center: 'yes'
        },
        {
            name: 'Machine',
            selector: row => row.machine,
            width: '140px',
            center: 'yes'
        },
        {
            name: 'Entity',
            selector: row => row.entity,
            center: 'yes'
        },
        {
            name: 'Datetime',
            id: 'date',
            selector: row => row.date,
            sortable: true,
            width: '200px',
            center: 'yes'
        },
        {
            name: 'Action',
            selector: row => row.action,
            width: '140px',
            center: 'yes'
        },
    ];
    const tableData = recordsList?.filter(
      (record) =>
        String(record.machine) && String(record.machine).toLowerCase().includes(filterText.toLowerCase())
    )
    .map((record) => {
      return {
        id: record.id,
        machine: record.machine,
        entity: record.entity,
        date: record.date,
        action: record.action,
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
                <h1>Registros</h1>
                <br/>
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
                defaultSortFieldId={'date'}
                defaultSortAsc={false}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};