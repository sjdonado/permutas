import React, { Component } from 'react';
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {
  COLOMBIA_TEACHING_LADDER,
  COLOMBIA_REGION_LIST,
  COLOMBIA_APPOINTMENT_AREA
} from '../../../complements/Colombia';
import _ from 'lodash';

const DEFAULT_CITY = "Barranquilla";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.currentUser,
    }
    this.state.municipality = (this.state.municipality === "Ninguno") ?
      DEFAULT_CITY : this.state.municipality;
  }

  filterRegionListByState = department => {
    return COLOMBIA_REGION_LIST.filter(element => element.departamento === department);
  }

  fetchDepartments = () => {
    return _.uniqBy(COLOMBIA_REGION_LIST, element => element.departamento);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const updatedCurrentUser = Object.assign(this.props.currentUser, { [e.target.name]: e.target.value });
    this.props.saveCurrentUser(updatedCurrentUser);
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
                  <i className="icon-screen-smartphone"></i>
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
                name="municipality"
                value={this.state.municipality}
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
                  <i className="icon-location-pin"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                name="zone"
                value={this.state.zone}
                onChange={this.onChange}>
                <option value="Rural">Rural</option>
                <option value="Urbano">Urbano</option>
              </Input>
            </InputGroup>
          </Col>
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

        </Row>

        <Row>
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
                value={this.state.appointmentArea}
                onChange={this.onChange}>
                {
                  COLOMBIA_APPOINTMENT_AREA.map((area, index) =>
                    <option
                      key={index}
                      value={area}>
                      {area}
                    </option>)
                }
              </Input>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col md="12">
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
                value={this.state.barterDepartment}
                onChange={this.onChange} />
            </InputGroup>
          </Col>
        </Row>
      </form>
    )
  }
}

export default RegisterForm;
