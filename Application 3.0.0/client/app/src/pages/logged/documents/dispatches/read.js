import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { PDFDocument } from 'pdf-lib';
import { confirmAlert } from "react-confirm-alert";

import { Button, Input, InputGroup } from "reactstrap";
import { MdClear, MdOpenInNew } from 'react-icons/md';
import { GrDocumentDownload } from 'react-icons/gr';
import { RiDeleteBin2Line } from 'react-icons/ri';

import '../../../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Dispatches() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [dispatchesList, setDispatchesList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting Machines
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);
        let search = "";
        if (filterText === "" || filterText === " ") {
            search = 'null';
        } else {
            search = filterText;
        }
        axios.get(`http://10.10.136.100:3002/api/dispatches/page=${(page-1)}/perPage=${perPage}/search=${search}`,)
        .then((res) => {
            setDispatchesList(res.data);
        });

        axios.get('http://10.10.136.100:3002/api/dispatches/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);


    //Open Dispatch
    const openDispatch = (cod) => {
        const id = cod.split(' ')[2];
        const year = cod.split(' ')[4];
    
        navigate(`/dmei-sys/documents/dispatches/${id}/${year}`);
    }

    //Delete Dispatch
    const dialogDelete = (cod) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: 'Você tem certeza?',
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteDispatch(cod);
                        setFilterText(" ");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteDispatch = (cod) => {
        let id = cod.split(' ')[2];
        let year = cod.split(' ')[4];
        axios.delete(`http://10.10.136.100:3002/api/dispatches/${id}/${year}/delete-itens`)
        .then((res) => {
            axios.delete(`http://10.10.136.100:3002/api/dispatches/${id}/${year}/delete`)
            .then((r) => {
                alert('Despacho removido!');
                setFilterText("");
            })
            .catch((e)=>{
                alert('Erro de Conexão com o Banco!');
            });
        })
        .catch((err)=>{
            alert('Erro de Conexão com o Banco!');
        });
    }


    //Download Report
    async function downloadDeadDoc(id, buffer) {
        console.log(buffer);
        const pdfDoc = await PDFDocument.load(new Uint8Array(buffer.data));
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id} - Assinado.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    //Add Machine
    const goToAdd = () => {
        navigate(`/dmei-sys/documents/dispatches/menu`);
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            width: '20%',
            sortable: true,
            center: 'yes'
        },
        {
            name: 'Nº Série',
            selector: row => ' - - - - - ',
            width: '20%',
            center: 'yes'
        },
        {
            name: 'Modelo',
            selector: row => ' - - - - - ',
            width: '10%',
            center: 'yes'
        },
        {
            name: 'Data',
            selector: row => {
                const date = new Date(row.date);
                const offset = date.getTimezoneOffset();
                date.setMinutes(date.getMinutes() - offset);
                return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
            },
            width: '20%',
            center: 'yes'
        },
        {
            name: 'Abrir',
            selector: row => <Button
                                color="primary"
                                onClick={() => openDispatch(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
            width: '10%',
            center: 'yes'
        },
        {
            name: 'Documento',
            selector: row => {
                if (row.document){
                    return (
                        <Button
                            color="warning"
                            onClick={() => downloadDeadDoc(row.id, row.document)}
                        >
                            <GrDocumentDownload/>
                        </Button>
                    )
                } else {
                    return (
                        <Button
                            color="warning"
                            disabled
                        >
                            <GrDocumentDownload/>
                        </Button>
                    )
                }},
            width: '10%',
            center: 'yes'
        },
        {
            name: 'Remover',
            selector: row => {
                if (JSON.parse(localStorage.getItem("user")).type === 1) {
                    return (
                        <Button
                            color="danger"
                            onClick={() => dialogDelete(row.id)}
                        >
                            <RiDeleteBin2Line/>
                        </Button>
                    )
                } else {
                    return (
                        <Button
                            color="danger"
                            disabled
                        >
                            <RiDeleteBin2Line/>
                        </Button>
                    )
                }
            },
        }    
    ];
    const tableData = dispatchesList?.map((obj) => {
      return {
        id: obj.id,
        date: obj.date,
        document: obj.document,
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
                <h1>Despachos</h1>
                <Button color='primary' onClick={goToAdd}>Adicionar</Button>
            </div>

            <InputGroup className="read-search">
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
            </InputGroup>

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
                paginationRowsPerPageOptions={[5,10,50,100]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};