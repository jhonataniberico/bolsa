import React, {Component, useState, useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registro() {
    const [name, setName] = useState("");
    const [last_name, setLast] = useState("");
    const [type_doc, setType] = useState("");
    const [number_doc, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    function handleClick() {
        fetch('http://localhost:4000/user/insert/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                last_name: last_name,
                type_doc: type_doc,
                number_doc: number_doc,
                email: email,
                phone: phone,
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['status'] != 0){
                alert("Alguno de sus datos son incorrectos");
                return;
                }else {
                    alert("Se registró correctamente");
                    window.location.href = "Dashboard";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
  return (
    <div className="container py-5">
        <h4 className="text-center">Registrar Profesional</h4>
        <div className="row">
            <div className="col-6">
                <Form.Group controlId="formGridName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" value={name} onChange={() => setName(name)} />
                </Form.Group>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su apellido" value={last_name} onChange={() => setLast(last_name)} />
                </Form.Group>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Control as="select" value={type_doc} onChange={() => setType(type_doc)}>
                    <option>Choose...</option>
                    <option value="DNI">DNI</option>
                    <option value="CARNET DE EXTRANJERÍA">CARNET DE EXTRANJERÍA</option>
                </Form.Control>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridNumero">
                <Form.Label>Nro de documento</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su apellido" value={number_doc} onChange={() => setNumber(number_doc)} />
                </Form.Group>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su email" value={email} onChange={() => setEmail(email)} />
                </Form.Group>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridPhone">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control type="number" placeholder="Ingrese su número de teléfono" value={phone} onChange={() => setPhone(phone)} />
                </Form.Group>
            </div>
        </div>
        <Button variant="primary" type="button" onClick={handleClick}>
            Registrar
        </Button>
    </div>
  );
}

export default Registro;
