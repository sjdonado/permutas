import React, { Component } from 'react';
import { Col, Row, ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText, Button, Card, CardBody, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Requests from '../../requests';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      department: '',
      municipality: '',
      educationalLadder: '',
      appointment: '',
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
    if (this.state.educationalLadder.length > 0) filters += `educationalLadder=${this.state.educationalLadder}&`;
    if (this.state.appointment.length > 0) filters += `appointment=${this.state.appointment}&`;
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
                    type="text"
                    name="department"
                    placeholder="Departamento"
                    className={this.state.department.length > 0 ? "input-success" : ""}
                    value={this.state.department}
                    onChange={this.onChange} />
                </InputGroup>
              </Col>
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    name="municipality"
                    placeholder="Municipio"
                    className={this.state.municipality.length > 0 ? "input-success" : ""}
                    value={this.state.municipality}
                    onChange={this.onChange} />
                </InputGroup>
              </Col>
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    name="educationalLadder"
                    placeholder="Escalafón"
                    className={this.state.educationalLadder.length > 0 ? "input-success" : ""}
                    value={this.state.educationalLadder}
                    onChange={this.onChange} />
                </InputGroup>
              </Col>
              <Col md="3">
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    name="appointment"
                    placeholder="Área de nombramiento"
                    className={this.state.appointment.length > 0 ? "input-success" : ""}
                    value={this.state.appointment}
                    onChange={this.onChange} />
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
                        Teléfono fijo: ${user.phone}
                        Celular: ${user.mobilePhone}
                        Departamento: ${user.department}
                        Municipio: ${user.municipality}
                        Vereda o Corregimiento: ${user.village}
                        Institución Educativa: ${user.school}
                        Escalafón: ${user.educationalLadder}
                        Área de nombramiento: ${user.appointment}`}
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
