import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "reactstrap";
import { BiEdit } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';
import { GiDeathSkull } from 'react-icons/gi';

import '../../../styles/read-one.css';

export default function MachineDeactivateMenu() {
    const navigate = useNavigate();

    const {id} = useParams();
    const [machineData, setMachineData] = useState([]);

    //Get the Machine data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/machines/${id}`)
        .then((res) => {
            setMachineData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //Go to update
    const goToUpdate = (id) => {
        navigate(`/machines/${id}/update`)
    };

    //Go Back to Machine
    const goBack = () => {
        navigate(`/machines/${id}`);
    };

    return(
        <div className="read-one">
            <h1>Máquina</h1>
            <h5>Menu de Desativação</h5>

            {machineData?.map((val, key) => {
                return (
                    <Form className="form-read-one" key={key}>
                        <hr/>
                        <h5>Id: <strong>{val.id}</strong></h5>
                        <hr/>
                        
                        <p style={{fontWeight:'100'}}>Para desativar uma máquina é necessário gerar um laudo,
                            e, posteriormente, com ele assinado, carregá-lo no sistema.</p>

                        <hr/>

                        <div className="column" style={{justifyItems:'center'}}>
                            <Button color="warning"
                                onClick={() => {navigate('doc')}}>
                                1. Gerar Laudo <GrDocumentPdf/>
                            </Button>

                            <Button color="danger"
                                onClick={() => {navigate('finalize')}}>
                                2. Finalizar <GiDeathSkull/>
                            </Button>
                        </div>

                        <hr/>

                        <Button
                            title="Editar"
                            color="primary"
                            onClick={() => {goToUpdate(val.id)}}>
                                <BiEdit/>
                        </Button>

                        <Button color="secondary" onClick={goBack}>Voltar</Button>
                    </Form>
                )
            })}
        </div>
    );
}