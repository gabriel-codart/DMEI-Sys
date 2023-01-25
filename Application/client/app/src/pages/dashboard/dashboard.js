import React from "react";
import { Col, Container, Row } from 'reactstrap';
import '../styles/read.css';
import CallsGraph from "./graphs/calls";
import TechnicianGraph from "./graphs/technicians";
import HistoryGraph from "./graphs/history";

import './dashboard.css';

export default function Dashboard() {

    return(
        <div className="dashboard">
            <Container>
                <Row>
                    <Col>
                        <h2>Equipamentos</h2>
                        <CallsGraph/>
                    </Col>
                    <Col>
                        <h2>Técnicos</h2>
                        <TechnicianGraph/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <h2>Histórico</h2>
                        <HistoryGraph/>
                    </Col>
                </Row>
            </Container>            
        </div>
    );
};