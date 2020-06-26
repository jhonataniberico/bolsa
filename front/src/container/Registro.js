import React, {Component, useState, useRef} from "react";
import Form from 'react-bootstrap/Form';

function App() {
    const [name, setName] = useState("");
    const [last_name, setLast] = useState("");
    const [type_doc, setType] = useState("");
    const [number_doc, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    handleClick => () => {
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
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
  return (
    <div className="container">
        <h4 className="text-center">Registrar Profesional</h4>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su nombre" value={name} onChange={setName(name)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su apellido" value={last_name} onChange={setLast(last_name)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Control as="select" value={type_doc} onChange={setType(type_doc)}>
                    <option>Choose...</option>
                    <option value="DNI">DNI</option>
                    <option value="CARNET DE EXTRANJERÍA">CARNET DE EXTRANJERÍA</option>
                </Form.Control>

                <Form.Group as={Col} controlId="formGridNumero">
                <Form.Label>Nro de documento</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su apellido" value={number_doc} onChange={setNumber(number_doc)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su email" value={email} onChange={setEmail(email)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control type="number" placeholder="Ingrese su número de teléfono" value={phone} onChange={setPhone(phone)} />
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="button" onClick={handleClick}>
                Registrar
            </Button>
            </Form>
    </div>
  );
}

export default App;
