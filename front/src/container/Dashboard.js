import React, {Component, useState, useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import {Link, Route, BrowserRouter as Router,} from 'react-router-dom';
import Historial from './Historial';

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

function Dashboard() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <Router>
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Bolsa de trabajo</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="Historial">Historial</Nav.Link>
                <Nav.Link>Curriculum</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link eventKey={2} href="#memes">
                    Logout
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div className="container py-5">
            <div style={{borderWidth: "1px", borderColor: '#000000', borderRadius: '10px', border: '1px solid', padding: '10px'}}>
                <h5>SOLICITUDES DE TRABAJO</h5>
            </div>
            <div className="py-4">
                <div style={{borderWidth: "1px", borderColor: '#000000', borderRadius: '10px', border: '1px solid', padding: '10px'}}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Empresa</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Detalle</th>
                            <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td><button type="button" className="btn btn-primary" onClick={() => setModalShow(true)}>Ver detalle</button></td>
                            <td><button type="button" className="btn btn-primary">Acept</button><button type="button" className="btn btn-danger">Cancel</button></td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Mark</td>
                            <td><button type="button" className="btn btn-primary" onClick={() => setModalShow(true)}>Ver detalle</button></td>
                            <td><button type="button" className="btn btn-primary">Acept</button><button type="button" className="btn btn-danger">Cancel</button></td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>Thornton</td>
                            <td>@twitter</td>
                            <td>Mark</td>
                            <td><button type="button" className="btn btn-primary" onClick={() => setModalShow(true)}>Ver detalle</button></td>
                            <td><button type="button" className="btn btn-primary">Acept</button><button type="button" className="btn btn-danger">Cancel</button></td>
                            </tr>
                        </tbody>
                    </Table>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </div>
    </div>
    </Router>
  );
}

export default Dashboard;
