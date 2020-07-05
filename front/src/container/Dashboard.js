import React, {Component, useState, useRef, useEffect} from "react";
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
    //console.log(props.idUser)
    const [datos, setDatos] = useState([]);
    useEffect(() => { 
      fetch('http://localhost:4000/work/detail?id_work='+props.idUser, {
        method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson['data'][0].full_name);
            setDatos(responseJson['data']);
        })
        .catch((error) => {
            console.log(error);
        });
    });
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detalle del trabajo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Detalle del trabajo:</h5>
        <p>
          {datos.description}
        </p>
        <h5>Empresa:</h5>
        <p>
        {datos.company_name}
        </p>
        <h5>Categoría:</h5>
        <p>
        {datos.desc_category}
        </p>
        <h5>Sub Categoría:</h5>
        <p>
        {datos.desc_sub_category}
        </p>
        <h5>Fecha:</h5>
        <p>
        {datos.register_date}
        </p>
        <h5>Monto:</h5>
        <p>
        S/. {datos.amount_proposed}
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
    const [datos, setTabla] = useState([]);
    const [id_user, setUser] = useState(0);
    //useEffect(() => console.log('mounted'), []);
    useEffect(() => { 
      fetch('http://localhost:4000/professional/listWork?id_professional=1&state=SOLICITADO', {
            method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson['data'][0].full_name);
                setTabla(responseJson['data']);
            })
            .catch((error) => {
                console.log(error);
            });
    });
  return (
    <div>
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
                          {datos.map(item => (
                              <tr key={item.id_work}>
                                <td>1</td>
                                <td>{item.company_name}</td>
                                <td>{item.full_name}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td><button type="button" className="btn btn-primary" onClick={() => {setModalShow(true); setUser(item.id_work)}}>Ver detalle</button></td>
                                <td><button type="button" className="btn btn-primary">Acept</button><button type="button" className="btn btn-danger">Cancel</button></td>
                              </tr>
                          ))
                          }
                        </tbody>
                    </Table>
                    {modalShow == true ? 
                    <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    idUser={id_user}
                /> : <p></p>
                  }
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
