import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { PDFDocument } from 'pdf-lib';

import { Button, Form, Input } from "reactstrap";
import { MdClear } from 'react-icons/md';
import { GrDocumentDownload } from 'react-icons/gr';
import { RiDeleteBin2Line } from 'react-icons/ri';

import '../../../styles/read.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Deactivateds() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [deactivatedsList, setDeactivatedsList] = useState([]);
    const [filterText, setFilterText] = useState("");


    //Getting Machines
    useEffect(() => {
        //console.log('page = ',page-1, '\nperPage = ',perPage, '\ntotalRows = ', totalRows);
        let search = "";
        if (filterText === "") {
            search = 'null';
        } else {
            search = filterText;
        }
        axios.get(`http://10.10.136.100:3002/api/deactivateds/page=${(page-1)}/perPage=${perPage}/search=${search}`,)
        .then((res) => {
            setDeactivatedsList(res.data);
        });

        axios.get('http://10.10.136.100:3002/api/deactivateds/')
        .then((res) => {
            setTotalRows(res.data.length);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, page, perPage]);

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
        navigate(`/dmei-sys/documents/deactivateds/menu`);
    }

    //Config Table and Search
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            width: '20%',
            center: 'yes'
        },
        {
            name: 'Nº Série',
            selector: row => row.num_serial,
            width: '20%',
            center: 'yes'
        },
        {
            name: 'Modelo',
            selector: row => row.model,
            width: '20%',
            center: 'yes'
        },
        {
            name: 'Data',
            selector: row => row.date,
            width: '20%',
            sortable: true,
            center: 'yes'
        },
        {
            name: 'Documento',
            selector: row => <Button
                                color="warning"
                                onClick={() => downloadDeadDoc(row.id, row.document)}
                            >
                                <GrDocumentDownload/>
                            </Button>,
            width: '10%',
            center: 'yes'
        },
        {
            name: 'Remover',
            selector: row => <Button
                                color="danger"
                            >
                                <RiDeleteBin2Line/>
                            </Button>,
            width: '10%',
            center: 'yes'
        },
    ];
    const tableData = deactivatedsList?.map((obj) => {
      return {
        id: obj.id,
        num_serial: obj.machine_serial,
        model: obj.machine_model,
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
                <h1>Desativações</h1>
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
                paginationRowsPerPageOptions={[5,10,50,100]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};