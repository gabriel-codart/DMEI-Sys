import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";

import '../../../styles/create-update.css';

export default function DeliveryUpload() {
    //Verificação de Carregamento Único
    const [ver] = useState(1);

    const navigate = useNavigate();

    const [delivery, setDelivery] = useState("");
    const [deliveryList, setDeliveryList] = useState([]);

    const [machines, setMachines] = useState(null);

    const [delivery_doc, setDelivery_doc] = useState(null);
    const [docSelected, setDocSelected] = useState(null);

    //Get the Dispatch data
    useEffect(() => {
        axios.get(`http://10.10.136.100:3002/api/deliveries/doc-null`)
        .then((res) => {
            setDeliveryList(res.data?.map((obj) => {
                return {
                    value: obj.id,
                    label: obj.id,
                    entity: obj.id_entities_del
                }
            }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ver]);

    //Get the Machines data
    useEffect(() => {
        if (delivery !== ""){
            let id = delivery.value.split(' ')[2];
            let year = delivery.value.split(' ')[4];

            axios.get(`http://10.10.136.100:3002/api/deliveries/${id}/${year}/itens`)
            .then((res) => {
                setMachines(res.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delivery]);

    //Confirm Delivery
    const deliveryMachine = () => {
        //Alert if there is Empty Fields
        if (delivery_doc === null) {
            alert('Erro, o campo Documento está vazio!');
        }
        else{
            let id = delivery.value.split(' ')[2];
            let year = delivery.value.split(' ')[4];

            axios.patch(`http://10.10.136.100:3002/api/deliveries/create/doc/${id}/${year}`, delivery_doc, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((r) => {
                for (let count = 0; count < machines.length; count++) {
                    axios.patch(`http://10.10.136.100:3002/api/machines/${machines[count].id_machine_del}/delivery`, {
                        id_entity: delivery.entity
                    })
                    .then((r) => {
                        //console.log(r);
                    })
                    .catch((e) => {
                        alert('Erro de Conexão com o Banco!');
                    });
                }
                alert('Entrega Liberada com sucesso!');
                navigate(`/dmei-sys/documents/deliveries`)
            })
            .catch((e) => {
                alert('Erro de Conexão com o Banco!');
            });
        };
    };

    //Cancel Delivery
    const cancelDelivery = () => {
        navigate(`/dmei-sys/documents/deliveries`);
    }

    return(
        <div className="read-one">
            <h1>Entrega</h1>
            <h4>Guardar Recibo</h4>

            <hr/>

            <Card color="light" outline>
                <CardBody>
                    <Label>Entrega:</Label>
                    <Select
                        placeholder='Código da Entrega...'
                        options={deliveryList}
                        defaultValue={delivery}
                        value={delivery}
                        onChange={setDelivery}
                    />
                </CardBody>
                <br/>
            </Card>

            {machines !== null ? (
                <Form className="form-create-update">
                    <hr/>
                    <h5><strong>{delivery.value}</strong></h5>
                    <hr/>
                    
                    <Card color="light" outline>
                        <CardBody>
                            <Label>Recibo de Entrega:</Label>
                            <Input
                                placeholder="Recibo de Entrega"
                                type="file"
                                name="file"
                                accept="application/pdf"
                                onChange={(event) =>{
                                    if (!event.target.value === true) {
                                        setDelivery_doc(null);
                                        setDocSelected(null);
                                    } else {
                                        const file = event.target.files[0];
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        setDelivery_doc(formData);
                                        setDocSelected(event.target.value);
                                    }
                                }}
                            />

                            <hr/>

                            {docSelected ? (
                                <p>Documento carregado! Finalize para entregar a Máquina</p>
                            ) : (
                                <p>Carregue o Recibo para entregar a Máquina</p>
                            )}
                        </CardBody>
                        <br/>
                    </Card>

                    <hr/>
                    
                    {docSelected ? (
                        <Button color="success" onClick={deliveryMachine}>Finalizar</Button>
                    ) : ("")}
                </Form>
            ) : ('')}

            <hr/>

            <Form className="form-read-one">
                <Button color="secondary" onClick={cancelDelivery}>Cancelar</Button>
            </Form>
        </div>
    );
};