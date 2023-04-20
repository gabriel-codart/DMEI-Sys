import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "reactstrap";
import { GrDocumentPdf } from 'react-icons/gr';
import { GiDeathSkull } from 'react-icons/gi';

import '../../../styles/read-one.css';

export default function DeactivateMenu() {
    const navigate = useNavigate();

    //Go Back to Machine
    const goBack = () => {
        navigate(`/dmei-sys/documents/deactivateds/`);
    };

    return(
        <div className="read-one">
            <h1>Desativação</h1>
            <h5>Menu</h5>

            <Form className="form-read-one">
                <hr/>

                <p style={{fontWeight:'100'}}>Para desativar uma máquina é necessário gerar um laudo,
                    e, posteriormente, com ele assinado, carregá-lo no sistema.</p>

                <hr/>

                <div className="column" style={{justifyItems:'center'}}>
                    <Button color="warning"
                        onClick={() => {navigate(`/dmei-sys/documents/deactivateds/doc`)}}>
                        1. Gerar Laudo <GrDocumentPdf/>
                    </Button>

                    <Button color="danger"
                        onClick={() => {navigate(`/dmei-sys/documents/deactivateds/finalize`)}}>
                        2. Finalizar <GiDeathSkull/>
                    </Button>
                </div>

                <hr/>

                <Button color="secondary" onClick={goBack}>Voltar</Button>
            </Form>
        </div>
    );
}