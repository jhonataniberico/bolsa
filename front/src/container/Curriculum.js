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
    const [titulo, setTitulo] = useState("");
    const [resumen, setResumen] = useState("");
    const [precio, setPrecio] = useState("");
    const [pais, setPais] = useState("");
    const [universidad, setUniversidad] = useState("");
    const [carrera, setCarrera] = useState("");
    const [fini, setFini] = useState("");
    const [ffin, setFfin] = useState("");
    const [mini, setMini] = useState("");
    const [mfin, setMfin] = useState("");
    const [position, setTitulowork] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [summary, setSummary] = useState("");
    const [work_fini, setWorkfini] = useState("");
    const [work_ffin, setWorkffin] = useState("");
    const [work_mini, setWorkmini] = useState("");
    const [work_mfin, setWorkmfin] = useState("");
    const [studies, setEstudios] = useState([]);
    const [work_experence, setWork] = useState([]);
    function handleClick() {
        if(titulo == "" || resumen == "" || precio == "" || pais == "" || universidad == "" || carrera == "" || fini == "" || ffin == "" || mini == "" || mfin == "" || position == "" || empresa == "" || summary == "" || work_fini == "" || work_ffin == "" || work_mini == "" || work_mfin == "" || studies == [] || studies == []){
            alert("ingrese todos los campos");
            return;
        }else {
            const general = JSON.stringify({
                id_professional : 1,
                profession_title : titulo,
                summary : resumen,
                hourly_rate : precio,
                schedule : null,
                studies : studies,
                work_experence : work_experence});
                //console.log(general);
            fetch('http://localhost:4000/professional/updCurriculum', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: general,
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
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
    }

    function agregarEstudios(){
        const estudios = [
            {
                "id_country": "",
                "country": pais,
                "study_center": universidad,
                "profession_title": carrera,
                "year_init": fini,
                "month_init": mini,
                "year_end": ffin,
                "month_end": mfin,
            }
        ];
        setEstudios(estudios);
    }
    function agregarTrabajo(){
        const trabajo = [
            {
                "position": position,
                "company": empresa,
                "year_init": work_fini,
                "month_init": work_mini,
                "year_end": work_ffin,
                "month_end": work_mfin,
                "summary": summary,
            }
        ];
        setWork(trabajo);
    }
  return (
    <div>
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
                                    <Form.Control type="text" placeholder="Ingrese su título profesional" onChange={ (e) => setTitulo(e.target.value) } />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Resumen</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un resumen" onChange={ (e) => setResumen(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Tasa por hora</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese la tasa por hora" onChange={ (e) => setPrecio(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="home" title="Educación">
                        <h4 className="text-center mt-4">EDUCACIÓN</h4>
                        <div className="row p-4">
                            <div className="col-4">
                                <Form.Label>País</Form.Label>
                                <Form.Control as="select" onChange={ (e) => setPais(e.target.value) }>
                                    <option>Seleccione...</option>
                                    <option value="Peru">Perú</option>
                                    <option value="Brasil">Brasil</option>
                                </Form.Control>
                            </div>
                            <div className="col-4">

                                <Form.Group controlId="formGridNumero">
                                <Form.Label>Universidad / Instituto</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su universidad/instituto" onChange={ (e) => setUniversidad(e.target.value) } />
                                </Form.Group>
                            </div>
                            <div className="col-4">

                                <Form.Group controlId="formGridNumero">
                                <Form.Label>Carrera</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su carrera" onChange={ (e) => setCarrera(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Año de inicio</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese el año de inicio" onChange={ (e) => setFini(e.target.value) } />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Año de fin</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese el año de fin" onChange={ (e) => setFfin(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Mes de inicio</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese el mes de inicio" onChange={ (e) => setMini(e.target.value) } />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Mes de fin</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese el mes de fin" onChange={ (e) => setMfin(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button type="button" className="btn btn-primary" onClick={agregarEstudios}>Agregar</button>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Experiencia Laboral">
                        <h4 className="text-center mt-4">EXPERIENCIA LABORAL</h4>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="Título" onChange={ (e) => setTitulowork(e.target.value) } />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Compañía</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la compañía" onChange={ (e) => setEmpresa(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Año Comenzó</Form.Label>
                                    <Form.Control type="number" placeholder="Año en la que empezó" onChange={ (e) => setWorkfini(e.target.value) }  />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Año en el que Finalizó</Form.Label>
                                    <Form.Control type="number" placeholder="Año en la que finalizó" onChange={ (e) => setWorkffin(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Mes Comenzó</Form.Label>
                                    <Form.Control type="number" placeholder="Mes en la que empezó" onChange={ (e) => setWorkmini(e.target.value) }  />
                                </Form.Group>
                            </div>
                            <div className="col-6">

                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Mes en el que Finalizó</Form.Label>
                                    <Form.Control type="number" placeholder="Mes en la que finalizó" onChange={ (e) => setWorkmfin(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-6">
                                <Form.Group controlId="formGridApellido">
                                    <Form.Label>Resumen</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese un resumen" onChange={ (e) => setSummary(e.target.value) } />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button type="button" className="btn btn-primary" onClick={agregarTrabajo}>Agregar</button>
                        </div>
                    </Tab>
                </Tabs>
                <div className="text-right ml-4">
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Crear CV</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Curriculum;
