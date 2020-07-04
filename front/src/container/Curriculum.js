import React, {Component, useState, useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function Curriculum() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Bolsa de trabajo</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#features">Historial</Nav.Link>
                <Nav.Link href="#pricing">Curriculum</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="#deets">Perfil</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Logout
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div className="container py-5">
            <div style={{borderWidth: "1px", borderColor: '#000000', borderRadius: '10px', border: '1px solid', padding: '10px'}}>
                <h5>CREAR UN CURRICULUM VITAE</h5>
            </div>
            <div className="py-4">
                <div style={{borderWidth: "1px", borderColor: '#000000', borderRadius: '10px', border: '1px solid', padding: '10px'}}>
                <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                    <Tab eventKey="general" title="Datos Generales">
                        <h4 className="text-center mt-4">DATOS GENERALES</h4>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Título profesional</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese su título profesional" />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Resumen</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un resumen" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Tasa por hora</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la tasa por hora" />
                                </Form.Group>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="home" title="Educación">
                        <h4 className="text-center mt-4">EDUCACIÓN</h4>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Label>País</Form.Label>
                                <Form.Control as="select">
                                    <option>Seleccione...</option>
                                    <option value="DNI">Perú</option>
                                    <option value="CARNET DE EXTRANJERÍA">Brasil</option>
                                </Form.Control>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridNumero">
                                <Form.Label>Universidad / Instituto</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su universidad/instituto" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Año de inicio</Form.Label>
                                    <Form.Control type="date" placeholder="Ingrese el año de inicio" />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Año de fin</Form.Label>
                                    <Form.Control type="date" placeholder="Ingrese el año de fin" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button type="button" className="btn btn-primary">Agregar</button>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Experiencia Laboral">
                        <h4 className="text-center mt-4">EXPERIENCIA LABORAL</h4>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="Título" />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Compañía</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la compañía" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Comenzó</Form.Label>
                                    <Form.Control type="date" placeholder="Título" />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Finalizó</Form.Label>
                                    <Form.Control type="date" placeholder="Ingrese la compañía" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button type="button" className="btn btn-primary">Agregar</button>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Portafólio">
                        <h4 className="text-center mt-4">PORTAFOLIO DE TRABAJOS</h4>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Añadir trabajo" />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese una descripción" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Habilidades</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese sus habilidades" />
                                </Form.Group>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <div className="text-right ml-4">
                        <button type="button" className="btn btn-primary">Guardar Todo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Curriculum;
