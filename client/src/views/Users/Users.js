import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import UserModal from './UserModal';
import Requests from '../../Requests';

function UserRow(props) {
  const user = props.user
  const userLink = `#/users/${user._id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user._id}>
      <th scope="row"><a onClick={e => props.onClick(user)}>{user.fullname}</a></th>
      <td>{user.dni}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.mobilePhone}</td>
      {/* <td><Badge href={userLink} color={getBadge(user.status)}>{user.status}</Badge></td> */}
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

  componentWillMount() {
    Requests.get('/users/all')
      .then(res => {
        this.setState({
          usersData: res.data.items
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  toggleUserDetailsModal = user => {
    const newUser = this.state.user ? {} : user;
    this.setState({
      userDetailsModal: !this.state.userDetailsModal,
      currentUser: newUser
    });
    console.log(this.state.currentUser);
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
        {this.state.userDetailsModal && <UserModal open={this.state.userDetailsModal} toggle={this.toggleUserDetailsModal} user={this.state.currentUser} />}
      </div>
    )
  }
}

export default Users;
