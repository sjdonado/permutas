import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
  Row } from 'reactstrap';

class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Iniciar Sesión</h1>
                    <p className="text-muted">Iniciar sesión con tu cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Contraseña" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Iniciar Sesión</Button>
                      </Col>                      
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
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
        </Container>
      </div>
    );
  }
}

export default Login;
