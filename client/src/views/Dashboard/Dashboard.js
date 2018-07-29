import React, { Component } from 'react';
import { Col, Row, ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText, Button, Card, CardBody, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
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
      department: 'Seleccionar',
      municipality: 'Seleccionar',
      teachingLadder: 'Seleccionar',
      appointmentArea: 'Seleccionar',
      COLOMBIA_TEACHING_LADDER: ['Seleccionar', ...COLOMBIA_TEACHING_LADDER],
      COLOMBIA_APPOINTMENT_AREA: ['Seleccionar', ...COLOMBIA_APPOINTMENT_AREA]
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
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
      let filters = "?";
      if (this.state.department !== 'Seleccionar') filters += `department=${this.state.department}&`;
      if (this.state.municipality !== 'Seleccionar') filters += `municipality=${this.state.municipality}&`;
      if (this.state.teachingLadder !== 'Seleccionar') filters += `teachingLadder=${this.state.teachingLadder}&`;
      if (this.state.appointmentArea !== 'Seleccionar') filters += `appointmentArea=${this.state.appointmentArea}&`;
      this.getUsers(filters);
    });
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
  }
  cleanFilters = e => {
    this.setState({
      department: 'Seleccionar',
      municipality: 'Seleccionar',
      teachingLadder: 'Seleccionar',
      appointmentArea: 'Seleccionar',
    });
    this.getUsers();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
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
                    className={this.state.department.length > 0 ? "input-success" : ""}
                    value={this.state.department}
                    onChange={this.onChange}>
                    {[{ c_digo_dane_del_departamento: 0, departamento: 'Seleccionar' }, ...this.fetchDepartments()].map(element =>
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
                      Municipio
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="municipality"
                    className={this.state.municipality.length > 0 ? "input-success" : ""}
                    value={this.state.municipality}
                    onChange={this.onChange} >
                    {[{ c_digo_dane_del_municipio: 0, municipio: 'Seleccionar' }, ...this.filterRegionListByState(this.state.department)].map(el =>
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
                      Escalafón
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="teachingLadder"
                    className={this.state.teachingLadder.length > 0 ? "input-success" : ""}
                    value={this.state.teachingLadder}
                    onChange={this.onChange}>
                    {['Seleccionar', ...COLOMBIA_TEACHING_LADDER].map(grade =>
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
                      Área de nombramiento
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="appointmentArea"
                    className={this.state.appointmentArea.length > 0 ? "input-success" : ""}
                    value={this.state.appointmentArea}
                    onChange={this.onChange}>
                    {['Seleccionar', ...COLOMBIA_APPOINTMENT_AREA].map((area, index) =>
                      <option
                        key={index}
                        value={area}>
                        {area}
                      </option>)}
                  </Input>
                </InputGroup>
              </Col>
            </Row>
            <Button color="danger" className="filter-btn" onClick={this.cleanFilters}>Limpiar</Button>
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
                      <Button color="success" className="contact-btn" disabled >Solicitud enviada</Button> :
                      <Button color="primary" className="contact-btn" onClick={e => this.interaction(user._id)}>Interesado</Button>}
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
