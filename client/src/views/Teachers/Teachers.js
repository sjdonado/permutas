import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import TeacherModal from './TeacherModal';
import Requests from '../../requests';
import XLSX from 'xlsx';

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
      csvData: null
    }
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

  downloadExcel = e => {
    const csvData = [];
    csvData.push(Object.keys(this.state.usersData[0]).filter(key => key !== "contacted" && key !== "_id" && key !== "__v"));
    this.state.usersData.forEach((item) => csvData.push(Object.values(item).filter((value, key) => key !== 3 && key !== 4 && key !== 18)));
    console.log(csvData);
    const ws = XLSX.utils.aoa_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "teachers.xlsx");
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Button color="primary" className="new-message" onClick={this.downloadExcel}>Descargar excel</Button>
          </Col>
        </Row>
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
