import React, { Component } from 'react';
import { Col, Row, ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText, Button, Card, CardBody, Input, InputGroup } from 'reactstrap';
import Requests from '../../requests';
import {
  COLOMBIA_TEACHING_LADDER,
  COLOMBIA_REGION_LIST,
  COLOMBIA_APPOINTMENT_AREA
} from '../../complements/Colombia';

import _ from 'lodash';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      department: 'Atlántico',
      municipality: 'Barranquilla',
      teachingLadder: 'Grado 1 - 2277',
      appointmentArea: 'Rectores',
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  interaction = id => {
    Requests.post('/messages', this.props.token, { userId: id })
      .then(res => {
        this.props.user.contacted.push(id);
        this.getUsers();
      })
      .catch(err => {
        console.error(err);
      });
  }
  getUsers(filters = '') {
    Requests.get(`/users/all${filters}`, this.props.token)
      .then(res => {
        this.setState({
          usersData: res.items
        })
      })
      .catch(err => {
        console.error(err);
      });
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
  handleCheck = e => {
    const name = e.target.name;
    if (this.state.checkValues.indexOf(name) === -1) {
      this.setState(prevState => ({
        checkValues: [...prevState.checkValues, name]
      }));
    } else {
      this.setState({ checkValues: this.state.checkValues.filter(value => value !== name) });
    }
    console.log(this.state.checkValues);
  }
  filter = e => {
    let filters = "?";
    if (this.state.department.length > 0) filters += `department=${this.state.department}&`;
    if (this.state.municipality.length > 0) filters += `municipality=${this.state.municipality}&`;
    if (this.state.teachingLadder.length > 0) filters += `teachingLadder=${this.state.teachingLadder}&`;
    if (this.state.appointmentArea.length > 0) filters += `appointmentArea=${this.state.appointmentArea}&`;
    console.log(filters);
    this.getUsers(filters);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row>
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="select"
                    name="department"
                    placeholder="Departamento"
                    className={this.state.department.length > 0 ? "input-success" : ""}
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
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="select"
                    name="municipality"
                    placeholder="Municipio"
                    className={this.state.municipality.length > 0 ? "input-success" : ""}
                    value={this.state.municipality}
                    onChange={this.onChange} >
                    {this.filterRegionListByState(this.state.department).map(el =>
                      <option
                        key={el.c_digo_dane_del_municipio}
                        value={el.municipio}> {el.municipio}
                      </option>
                    )}
                  </Input>
                </InputGroup>
              </Col>
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="select"
                    name="teachingLadder"
                    placeholder="Escalafón"
                    className={this.state.teachingLadder.length > 0 ? "input-success" : ""}
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
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="select"
                    name="appointmentArea"
                    placeholder="Área de nombramiento"
                    className={this.state.appointmentArea.length > 0 ? "input-success" : ""}
                    value={this.state.appointmentArea}
                    onChange={this.onChange}>
                    {COLOMBIA_APPOINTMENT_AREA.map((area, index) =>
                      <option
                        key={index}
                        value={area}>
                        {area}
                      </option>)}
                  </Input>
                </InputGroup>
              </Col>
            </Row>
            <Button color="primary" className="filter-btn" onClick={this.filter} block>Filtrar</Button>
          </CardBody>
        </Card>
        <Row>
          <Col lg={12}>
            <ListGroup>
              {this.state.usersData.map((user, index) => {
                return (
                  <ListGroupItem key={index}>
                    <ListGroupItemHeading>{user.fullname}</ListGroupItemHeading>
                    {this.props.user.contacted.some(id => id === user._id) ?
                      <Button color="success" className="contact-btn" disabled >Contactado</Button> :
                      <Button color="primary" className="contact-btn" onClick={e => this.interaction(user._id)}>Contactar</Button>}
                    <ListGroupItemText style={{ whiteSpace: "pre-line" }}>
                      {`Nombre: ${user.fullname}
                        CC: ${user.dni}
                        Correo electrónico: ${user.email}
                        Teléfono fijo: ${user.telephone}
                        Celular: ${user.mobile}
                        Departamento: ${user.department}
                        Municipio: ${user.municipality}
                        Zona: ${user.zone}
                        Institución Educativa: ${user.school}
                        Escalafón: ${user.teachingLadder}
                        Área de nombramiento: ${user.appointmentArea}`}
                    </ListGroupItemText>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
