import React, { Component } from 'react';
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { COLOMBIA_TEACHING_LADDER, COLOMBIA_REGION_LIST } from '../../../complements/Colombia';
import _ from 'lodash';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
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
    this.props.newData({ [e.target.name]: e.target.value });
  }

  render() {
    return (
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
                value={this.state.fullname}
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
                name="phone"
                placeholder="Teléfono fijo"
                value={this.state.phone}
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
                name="mobilePhone"
                value={this.state.mobilePhone}
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
                value={this.state.village}
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
                value={this.state.educationalLadder}
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
                value={this.state.appointment}
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
            value={this.state.swapDepartment}
            onChange={this.onChange}>
            {this.fetchDepartments().map(element =>
              <option
                key={element.c_digo_dane_del_departamento}
                value={element.departamento}> {element.departamento}
              </option>
            )}
          </Input>
        </InputGroup>
      </form>
    )
  }
}

export default RegisterForm;