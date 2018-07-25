import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import TeacherModal from './TeacherModal';
import Requests from '../../requests';

function TeacherRow(props) {
  return (
    <tr key={props.user._id}>
      <th scope="row"><a onClick={e => props.onClick(props.user)}>{props.user.fullname}</a></th>
      <td>{props.user.dni}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.mobilePhone}</td>
    </tr>
  )
}

class Teachers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      teacherModal: false,
    }
    console.log('TEACHERS', props);
  }

  componentDidMount() {
    this.getUsers();
  }

  toggleTeacherModal = user => {
    this.setState({
      teacherModal: !this.state.teacherModal,
    });
    if (this.props.currentUser) {
      this.props.deleteCurrentUser();
    } else {
      this.props.saveCurrentUser(user);
    }
  }

  getUsers() {
    Requests.get('/users/all', this.props.token)
      .then(res => {
        this.setState({
          usersData: res.items
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Docentes
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Número de identificación</th>
                      <th scope="col">Correo electrónico</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Celular</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersData.map((user, index) =>
                      <TeacherRow key={index} user={user} onClick={this.toggleTeacherModal} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.teacherModal && <TeacherModal open={this.state.teacherModal} toggle={this.toggleTeacherModal} getUsers={this.getUsers} {...this.props} />}
      </div>
    )
  }
}

export default Teachers;
