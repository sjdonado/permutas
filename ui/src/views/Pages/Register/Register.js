import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
import {COLOMBIA_TEACHING_LADDER, COLOMBIA_REGION_LIST} from '../../../complements/Colombia';
import _ from 'lodash';

class Register extends Component {
  constructor(props){
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
      barterDepartment: 'Atlántico'
    }
  }

  filterRegionListByState = department => {
    return COLOMBIA_REGION_LIST.filter(element => element.departamento === department);
  }

  fetchDepartments = () => {    
    return _.uniqBy(COLOMBIA_REGION_LIST, element => element.departamento);
  }

  onChange = e => {        
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e =>{
    e.preventDefault();

  }

  render() {
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
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value = {this.state.email}
                            onChange={this.onChange}/>
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
                            value = {this.state.password}
                            onChange={this.onChange}/>
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
                            value = {this.state.telephone}
                            onChange={this.onChange}/>
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
                            value = {this.state.mobile}
                            onChange={this.onChange}/>
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
                            value = {this.state.department}
                            onChange={this.onChange}>
                            {this.fetchDepartments().map( element => 
                              <option
                                key = {element.c_digo_dane_del_departamento}
                                value = {element.departamento}> {element.departamento}
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
                            value = {this.state.city}
                            onChange={this.onChange}>
                            {this.filterRegionListByState(this.state.department).map( el => 
                              <option
                                key = {el.c_digo_dane_del_municipio}
                                value = {el.municipio}> {el.municipio} 
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
                            value = {this.state.school}
                            onChange={this.onChange}/>
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
                            value = {this.state.teachingLadder}
                            onChange={this.onChange}>
                            {COLOMBIA_TEACHING_LADDER.map( grade =>
                              <option
                                key={grade}
                                value={grade}>
                                  {grade}
                              </option>)}
                          </Input>
                        </InputGroup>
                      </Col>
                    </Row>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-location-pin"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="appointmentArea"
                        type="text"
                        value = {this.state.appointmentArea}
                        placeholder="Área de nombramiento" 
                        onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-3">                  
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Departamento que desea la permuta
                        </InputGroupText>
                      </InputGroupAddon>                    
                      <Input
                        type="select"
                        name="barterDepartment"
                        value = {this.state.barterDepartment}
                        onChange={this.onChange}>
                        {this.fetchDepartments().map( element => 
                          <option
                            key = {element.c_digo_dane_del_departamento}
                            value = {element.departamento}> {element.departamento}
                          </option>
                        )}
                      </Input>
                    </InputGroup>

                    <Button type="submit" color="success" block>Crear cuenta</Button>
                  </form>                  

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
