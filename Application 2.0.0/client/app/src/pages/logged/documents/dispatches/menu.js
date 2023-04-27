import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "reactstrap";
import { GrDocumentPdf, GrDocumentUpload } from 'react-icons/gr';

import '../../../styles/read-one.css';

export default function DispatchMenu() {
    const navigate = useNavigate();

    //Go Back to Machine
    const goBack = () => {
        navigate(`/dmei-sys/documents/dispatches/`);
    };

    return(
        <div className="read-one">
            <h1>Despacho</h1>
            <h5>Menu</h5>

            <Form className="form-read-one">
                <hr/>

                <p style={{fontWeight:'100'}}>Para despachar uma máquina é necessário gerar um memorando,
                    e, posteriormente, com ele assinado, carregá-lo no sistema.</p>

                <hr/>

                <div className="column" style={{justifyItems:'center'}}>
                    <Button color="warning"
                        onClick={() => {navigate(`/dmei-sys/documents/dispatches/doc`)}}>
                        1 - Gerar Laudo <GrDocumentPdf/>
                    </Button>

                    <Button color="success"
                        onClick={() => {navigate(`/dmei-sys/documents/dispatches/finalize`)}}>
                        2 - Salvar <GrDocumentUpload/>
                    </Button>
                </div>

                <hr/>

                <Button color="secondary" onClick={goBack}>Voltar</Button>
            </Form>
        </div>
    );
}