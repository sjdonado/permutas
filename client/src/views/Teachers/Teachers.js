import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import TeacherModal from './TeacherModal';
import Requests from '../../requests';

function UserRow(props) {
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

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      userDetailsModal: false,
      currentUser: {}
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  toggleUserDetailsModal = user => {
    const newUser = this.state.user ? {} : user;
    this.setState({
      userDetailsModal: !this.state.userDetailsModal,
      currentUser: newUser
    });
  }

  updateUser = e => {
    Requests.put(`/users/${this.state.currentUser._id}`, this.props.token, this.state.currentUser)
      .then(res => {
        this.setState({ userDetailsModal: false });
        console.log('MANIYA');
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteUser = e => {
    Requests.delete(`/users/${this.state.currentUser._id}`, this.props.token)
      .then(res => {
        this.setState({ userDetailsModal: false });
        this.getUsers();
      })
      .catch(err => {
        console.error(err);
      });
  }

  newData = data => {
    const updatedCurrentUser = Object.assign(this.state.currentUser, data);
    this.setState({ currentUser: updatedCurrentUser });
  }

  getUsers() {
    Requests.get('/users/all', this.props.token)
      .then(res => {
        this.setState({
          usersData: res.data.items
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
                      <UserRow key={index} user={user} onClick={this.toggleUserDetailsModal} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.userDetailsModal && <TeacherModal open={this.state.userDetailsModal} toggle={this.toggleUserDetailsModal} user={this.state.currentUser} updateUser={this.updateUser} newData={this.newData} deleteUser={this.deleteUser} />}
      </div>
    )
  }
}

export default Users;
