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

export default function Loans() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [loansList, setLoansList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting Loans
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);
        let search = "";
        if (filterText === "" || filterText === " ") {
            search = 'null';
        } else {
            search = filterText;
        }
        axios.get(`http://10.10.136.100:3002/api/loans/page=${(page-1)}/perPage=${perPage}/search=${search}`,)
        .then((res) => {
            setLoansList(res.data);
        });

        axios.get('http://10.10.136.100:3002/api/loans/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);


    //Delete Loan
    const dialogDeleteLoan = (cod) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: `Tem certeza que quer remover o Empréstimo ${cod}?`,
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteLoan(cod);
                        setFilterText(" ");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteLoan = (cod) => {
        let id = cod.split(' ')[2];
        let year = cod.split(' ')[4];
        axios.delete(`http://10.10.136.100:3002/api/loans/${id}/${year}/delete-itens`)
        .then((res) => {
            axios.delete(`http://10.10.136.100:3002/api/loans/${id}/${year}/delete`)
            .then((r) => {
                console.log(r);
                alert('Empréstimo removido!');
                setFilterText("");
            })
            .catch((e)=>{
                alert('Erro de Conexão com o Banco!');
                console.log(e);
            });
        })
        .catch((err)=>{
            alert('Erro de Conexão com o Banco!');
            console.log(err);
        });
    }

    //Delete Loan Doc
    const dialogDeleteLoanDoc = (cod) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: `Tem certeza que quer remover o Termo do Empréstimo ${cod}?`,
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteLoanDoc(cod);
                        setFilterText(" ");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteLoanDoc = (cod) => {
        let id = cod.split(' ')[2];
        let year = cod.split(' ')[4];
        axios.patch(`http://10.10.136.100:3002/api/loans/${id}/${year}/delete-doc-loan`)
        .then((res) => {
            console.log(res);
            alert('Termo de Empréstimo removido!');
            setFilterText("");
        })
        .catch((e)=>{
            alert('Erro de Conexão com o Banco!');
            //console.log(e);
        });
    }

    //Delete Devolution Doc
    const dialogDeleteDevDoc = (cod) => {
        confirmAlert({
            title: 'Confirme a remoção',
            message: `Tem certeza que quer remover a Devolução do Empréstimo ${cod}?`,
            buttons: [
                {
                label: 'Sim',
                onClick: () => {
                        deleteDevDoc(cod);
                        setFilterText(" ");
                    }
                },
                {
                label: 'Não'
                }
            ]
        });
    };
    const deleteDevDoc = (cod) => {
        let id = cod.split(' ')[2];
        let year = cod.split(' ')[4];
        axios.patch(`http://10.10.136.100:3002/api/loans/${id}/${year}/delete-doc-devolution`)
        .then((res) => {
            console.log(res);
            alert('Devolução removida!');
            setFilterText("");
        })
        .catch((e)=>{
            alert('Erro de Conexão com o Banco!');
            //console.log(e);
        });
    }


    //Download Report
    async function downloadDoc(id, buffer) {
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

    //Open Loan
    const openLoan = (cod) => {
        const id = cod.split(' ')[2];
        const year = cod.split(' ')[4];
    
        navigate(`/dmei-sys/documents/loans/${id}/${year}`);
    }

    //Add Machine
    const goToAdd = () => {
        navigate(`/dmei-sys/documents/loans/menu`);
    }

    //Return Machine
    const goToReturn = () => {
        navigate(`/dmei-sys/documents/loans/return`);
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
            name: 'Data de Empréstimo',
            selector: row => {
                const date = new Date(row.date_loan);
                const offset = date.getTimezoneOffset();
                date.setMinutes(date.getMinutes() - offset);
                return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
            },
            width: '15%',
            center: 'yes'
        },
        {
            name: 'Termo de Empréstimo',
            selector: row => {
                if (row.document_loan){
                    return (
                        <InputGroup>
                            <Button
                                color="warning"
                                onClick={() => downloadDoc(row.id, row.document_loan)}
                            >
                                <GrDocumentDownload/>
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => dialogDeleteLoanDoc(row.id)}
                            >
                                <MdClear/>
                            </Button>
                        </InputGroup>
                    )
                } else {
                    return (
                        <InputGroup>
                            <Button
                                color="warning"
                                disabled
                            >
                                <GrDocumentDownload/>
                            </Button>
                            <Button
                                color="danger"
                                disabled
                            >
                                <MdClear/>
                            </Button>
                        </InputGroup>
                    )
                }},
            width: '15%',
            center: 'yes'
        },
        {
            name: 'Data de Retorno',
            selector: row => {
                if (row.date_return){
                    const date = new Date(row.date_return);
                    const offset = date.getTimezoneOffset();
                    date.setMinutes(date.getMinutes() - offset);
                    return String(date.toLocaleString('pt-BR', { timeZone: 'UTC' })).slice(0,10);
                } else {
                    return(' - - - - - ')
                }},
            width: '15%',
            center: 'yes'
        },
        {
            name: 'Documento de Retorno',
            selector: row => {
                if (row.document_return){
                    return (
                        <InputGroup>
                            <Button
                                color="warning"
                                onClick={() => downloadDoc(row.id, row.document_return)}
                            >
                                <GrDocumentDownload/>
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => dialogDeleteDevDoc(row.id)}
                            >
                                <MdClear/>
                            </Button>
                        </InputGroup>
                    )
                } else {
                    return (
                        <InputGroup>
                            <Button
                                color="warning"
                                disabled
                            >
                                <GrDocumentDownload/>
                            </Button>
                            <Button
                                color="danger"
                                disabled
                            >
                                <MdClear/>
                            </Button>
                        </InputGroup>
                    )
                }},
            width: '15%',
            center: 'yes'
        },
        {
            name: 'Abrir',
            selector: row => <Button
                                color="primary"
                                onClick={() => openLoan(row.id)}
                            >
                                <MdOpenInNew/>
                            </Button>,
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
                            onClick={() => dialogDeleteLoan(row.id)}
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
    const tableData = loansList?.map((obj) => {
      return {
        id: obj.id,
        date_loan: obj.date_loan,
        document_loan: obj.document_loan,
        date_return: obj.date_return,
        document_return: obj.document_return,
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
                <h1>Empréstimos</h1>
                <div>
                    <InputGroup>
                        <Button color='primary' onClick={goToAdd}>Adicionar</Button>
                        <Button color='success' onClick={goToReturn}>Retorno</Button>
                    </InputGroup>
                </div>
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