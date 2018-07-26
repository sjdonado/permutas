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
import {
  COLOMBIA_TEACHING_LADDER,
  COLOMBIA_REGION_LIST,
  COLOMBIA_APPOINTMENT_AREA } from '../../../complements/Colombia';
import _ from 'lodash';
import Requests from '../../../requests';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {value: '', validate: true},
      password: {value: '', validate: true},
      dni: {value: '', validate: true},
      name: {value: '', validate: true},
      telephone: {value: '', validate: true},
      mobile: {value: '', validate: true},
      department: {value: 'Atlántico', validate: false},
      municipality: {value: 'Barranquilla', validate: false},
      school: {value:'', validate: true},
      teachingLadder: {value: "Grado 1 - 2277", validate: false},
      appointmentArea: {value: 'Rectores', validate: true},
      barterDepartment: {value: '', validate: true},
      zone: {value: 'Ninguno', validate: false},
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
    let field = this.state[e.target.name];
    field.value = e.target.value
    this.setState({ field });
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
    if(this.validateFields()){
      let state = this.state;
      let doc = {
        fullname: state.fullname.value,
        dni: state.dni.value,
        email: state.email.value,
        password: state.password.value,
        telephone: state.telephone.value,
        mobile: state.mobile.value,
        department: state.department.value,
        municipality: state.municipality.value,
        school: state.school.value,
        teachingLadder: state.teachingLadder.value,
        appointmentArea: state.appointmentArea.value,
        barterDepartment: state.barterDepartment.value,
        zone: state.zone.value
      }
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
    } else this.showAlert("Faltan datos");
  }

  validateFields = () => {
    let state = this.state;
    for( let propName in state){
      let prop = state[propName];
      if(prop.validate && !this.validateField(prop)) return false;
    }
    return true;
  }

  validateField = field => {
    return field.value && field.value.trim() !== '';
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
                            name="fullname"
                            value={this.state.fullname.value}
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
                            value={this.state.dni.value}
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
                            value={this.state.email.value}
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
                            value={this.state.password.value}
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
                            value={this.state.telephone.value}
                            onChange={this.onChange} />
                        </InputGroup>
                      </Col>

                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-screen-smartphone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="number"
                            placeholder="Celular"
                            name="mobile"
                            value={this.state.mobile.value}
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
                            value={this.state.department.value}
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
                              Muncipio
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="municipality"
                            value={this.state.municipality.value}
                            onChange={this.onChange}>
                            {this.filterRegionListByState(this.state.department.value).map(el =>
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
                            value={this.state.school.value}
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
                            value={this.state.teachingLadder.value}
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
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="appointmentArea"
                            type="select"
                            value={this.state.appointmentArea.value}
                            onChange={this.onChange}>
                            {
                              COLOMBIA_APPOINTMENT_AREA.map( (area,index) =>
                                <option
                                key={index}
                                value={area}>
                                {area}
                                </option>)
                            }
                            </Input>
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-location-pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="select"
                            name="zone"
                            value={this.state.zone.value}
                            onChange={this.onChange}>
                            <option value="Rural">Rural</option>
                            <option value="Urbano">Urbano</option>
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
                        required
                        type="text"
                        name="barterDepartment"
                        value={this.state.barterDepartment.value}
                        onChange={this.onChange}/>
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
