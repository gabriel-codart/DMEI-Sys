import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';

import { Button, Form, Input } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';

import '../../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function InputsTerminateds() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [inputsList, setInputsList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting inputs
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);

        axios.get(`http://10.10.136.100:3002/api/inputs/terminateds/page=${(page-1)}/perPage=${perPage}`,)
        .then((res) => {
            setInputsList(res.data);
        });

        axios.get('http://10.10.136.100:3002/api/inputs/terminateds/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);


    //Open Input
    const openInput = (id) => {
        navigate(`/dmei-sys/inputs/terminateds/${id}`);
    }

    //Terminate input
    const goToTerminate = () => {
        navigate(`/dmei-sys/inputs/terminate`);
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
            name: 'Usuário',
            selector: row => row.user_name,
            center: 'yes'
        },
        {
            name: 'Saída',
            selector: row => {
                const date = new Date(row.date_exit);
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
      (input) =>
        input.entity_name && input.entity_name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((input) => {
      return {
        id: input.id,
        machine_num: input.machine_num,
        entity_name: input.entity_name,
        user_name: input.user_name,
        date_exit: input.date_exit,
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
                <h1>Equipamentos Finalizados</h1>
                <Button color='success' onClick={goToTerminate}>Finalizar</Button>
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