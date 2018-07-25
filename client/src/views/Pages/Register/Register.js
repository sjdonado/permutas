import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert
} from 'reactstrap';
import { COLOMBIA_TEACHING_LADDER, COLOMBIA_REGION_LIST } from '../../../complements/Colombia';
import _ from 'lodash';
import Requests from '../../../requests';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      dni: '',
      name: '',
      telephone: '',
      mobile: '',
      department: 'Atlántico',
      city: 'Barranquilla',
      school: '',
      teachingLadder: 1,
      appointmentArea: '',
      barterDepartment: 'Atlántico',
      region: '',
      alert: {
        visible: false,
        message: ''
      },
    }
  }

  filterRegionListByState = department => {
    return COLOMBIA_REGION_LIST.filter(element => element.departamento === department);
  }

  fetchDepartments = () => {
    return _.uniqBy(COLOMBIA_REGION_LIST, element => element.departamento);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDismiss = () => {
    let { alert } = this.state;
    alert.visible = false
    this.setState({ alert });
  }

  showAlert = msg => {
    let { alert } = this.state;
    alert.visible = true
    alert.message = msg
    this.setState({ alert });
  }

  onSubmit = e => {
    e.preventDefault();

    let state = this.state;
    let doc = {
      fullname: state.name,
      dni: state.dni,
      email: state.email,
      password: state.password,
      phone: state.telephone,
      mobilePhone: state.mobile,
      department: state.department,
      village: state.city,
      school: state.school,
      educationalLadder: state.teachingLadder,
      appointment: state.appointmentArea,
      zone: state.zone,
      swapDepartment: state.barterDepartment
    }
    if (!state.region) doc.region = state.region;
    Requests.post('/users', this.props.token, doc)
      .then(res => {
        console.log(res);
        this.props.saveUser(res.item);
        this.props.saveToken(res.meta.token);
      })
      .catch(err => {
        this.showAlert("Ocurrió un error");
        console.error(err);
      });
  }

  render() {
    const alert = <Alert color="info"
      isOpen={this.state.alert.visible}
      toggle={this.onDismiss}>
      {this.state.alert.message}
    </Alert>
    if (this.props.token) return <Redirect to='/' />;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Registro</h1>
                  <p className="text-muted">Crea tu cuenta</p>
                  <form>
                    
                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Nombre completo"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              #
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="number"
                            placeholder="Cédula"
                            name="dni"
                            value={this.state.dni}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="number"
                            name="telephone"
                            placeholder="Teléfono fijo"
                            value={this.state.telephone}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>

                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-action-redo"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="number"
                            placeholder="Celular"
                            name="mobile"
                            value={this.state.mobile}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              Departamento
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="department"
                            value={this.state.department}
                            onChange={this.onChange}>
                            {this.fetchDepartments().map(element =>
                              <option
                                key={element.c_digo_dane_del_departamento}
                                value={element.departamento}> {element.departamento}
                              </option>
                            )}
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              Ciudad
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="city"
                            value={this.state.city}
                            onChange={this.onChange}>
                            {this.filterRegionListByState(this.state.department).map(el =>
                              <option
                                key={el.c_digo_dane_del_municipio}
                                value={el.municipio}> {el.municipio}
                              </option>
                            )}
                          </Input>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-notebook"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="school"
                            type="text"
                            placeholder="Institución educativa"
                            value={this.state.school}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              Escalafón
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="teachingLadder"
                            value={this.state.teachingLadder}
                            onChange={this.onChange}>
                            {COLOMBIA_TEACHING_LADDER.map(grade =>
                              <option
                                key={grade}
                                value={grade}>
                                {grade}
                              </option>)}
                          </Input>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-location-pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="appointmentArea"
                            type="text"
                            value={this.state.appointmentArea}
                            placeholder="Área de nombramiento"
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              Zona
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name="zone"
                            value={this.state.zone}
                            placeholder={"Zona"}
                            onChange={this.onChange}>
                          </Input>
                        </InputGroup>
                      </Col>
                    </Row>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Departamento que desea la permuta
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        name="barterDepartment"
                        value={this.state.barterDepartment}
                        onChange={this.onChange}>
                        {this.fetchDepartments().map(element =>
                          <option
                            key={element.c_digo_dane_del_departamento}
                            value={element.departamento}> {element.departamento}
                          </option>
                        )}
                      </Input>
                    </InputGroup>

                    <Button
                      type="submit"
                      color="success"
                      onClick={this.onSubmit}
                      block>
                      Crear cuenta
                      </Button>
                  </form>

                </CardBody>
              </Card>
            </Col>
          </Row>        
          {alert}        
        </Container>
      </div>
    );
  }
}

export default Register;
