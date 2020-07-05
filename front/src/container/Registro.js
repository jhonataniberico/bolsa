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
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    function handleClick() {
        console.log("nombre: "+name);
        fetch('http://localhost:4000/professional/insert', {
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
                user: user,
                password: password,
                type_professional: "1",
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson['status'] != 0){
                alert("Alguno de sus datos son incorrectos");
                return;
                }else {
                    alert("Se registró correctamente");
                    //window.location.href = "Dashboard";
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
                    <Form.Control type="text" placeholder="Ingrese su nombre" onChange={ (e) => setName(e.target.value) } />
                </Form.Group>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su apellido" onChange={ (e) => setLast(e.target.value) } />
                </Form.Group>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Control as="select" onChange={ (e) => setType(e.target.value) }>
                    <option>Select...</option>
                    <option value="2">DNI</option>
                    <option value="1">CARNET DE EXTRANJERÍA</option>
                </Form.Control>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridNumero">
                <Form.Label>Nro de documento</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su número de documento" onChange={ (e) => setNumber(e.target.value) } />
                </Form.Group>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su email" onChange={ (e) => setEmail(e.target.value) } />
                </Form.Group>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridPhone">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control type="number" placeholder="Ingrese su número de teléfono" onChange={ (e) => setPhone(e.target.value) } />
                </Form.Group>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Form.Group controlId="formGridEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su usuario" onChange={ (e) => setUser(e.target.value) } />
                </Form.Group>
            </div>
            <div className="col-6">

                <Form.Group controlId="formGridPhone">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingrese su contraseña" onChange={ (e) => setPassword(e.target.value) } />
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
