import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert
} from 'reactstrap';

import Requests from '../../../requests';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      alert: {
        visible: false,
        message: ''
      },
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const doc = {
      email: this.state.email,
      password: this.state.password,
    }
    Requests.post('/users/signin', this.props.token, doc)
      .then(res => {
        if (res.item.active) {
          this.props.saveUser(res.item);
          this.props.saveToken(res.meta.token);
        } else {
          this.showAlert("Cuenta desactivada");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  showAlert = msg => {
    let { alert } = this.state;
    alert.visible = true
    alert.message = msg
    this.setState({ alert });
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') this.handleSubmit(e);
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
            <Col md="10">
              <CardGroup>
                <Card className="p-5">
                  <CardBody>
                    <h1>Iniciar Sesión</h1>
                    <p className="text-muted">Iniciar sesión con tu cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Correo electrónico"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={this.handleSubmit}>
                          Iniciar Sesión
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="p-5 text-white bg-primary">
                  <CardBody className="text-center">
                    <div>
                      <h2>Registrarse</h2>
                      <p>¡Crea una cuenta!</p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active >
                          Crear cuenta
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          {alert}
        </Container>
      </div>
    );
  }
}

export default Login;
