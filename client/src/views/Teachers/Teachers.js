import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import TeacherModal from './TeacherModal';
import Requests from '../../requests';
import { TRANSLATIONS } from '../../config';
import XLSX from 'xlsx';

function TeacherRow(props) {
  return (
    <tr key={props.user._id}>
      <th scope="row"><a onClick={e => props.onClick(props.user)}>{props.user.fullname}</a></th>
      <td>{props.user.dni}</td>
      <td>{props.user.email}</td>
      <td>{props.user.role === 'teacher' ? 'Profesor' : 'Administrador'}</td>
      <td>{props.user.active ? <Badge color="success">Activa</Badge> : <Badge color="danger">Desactivada</Badge>}</td>
    </tr>
  )
}

class Teachers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      teacherModal: false,
      meta: {}
    }
  }

  componentDidMount() {
    this.props.deleteCurrentUser();
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
        console.log(res);
        this.setState({
          usersData: res.items,
          meta: res.meta
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  downloadExcel = e => {
    const document = [];
    document.push(Object.keys(this.state.usersData[0]).filter(key => key !== "contacted" && key !== "_id" && key !== "__v")
      .map(item => TRANSLATIONS[item].spanish));
    this.state.usersData.forEach((item) => document.push(Object.values(item).filter((value, key) => key !== 3 && key !== 4 && key !== 18)));
    console.log(document);
    const ws = XLSX.utils.aoa_to_sheet(document);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "teachers.xlsx");
  }

  downloadPdf = e => {

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Button color="primary" className="new-message" onClick={this.downloadPdf}>Descargar pdf</Button>
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
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Número de identificación</th>
                      <th scope="col">Correo electrónico</th>
                      <th scope="col">Tipo de cuenta</th>
                      <th scope="col">Estado de la cuenta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersData.map((user, index) =>
                      <TeacherRow key={index} user={user} onClick={this.toggleTeacherModal} />
                    )}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  {[...Array(this.state.meta.pages)].map((x, i) => {
                    console.log(x, i, this.state.meta.page)
                    if (i + 1 === this.state.meta.page) {
                      return (<PaginationItem active key={i}>
                        <PaginationLink tag="button">{this.state.meta.page}</PaginationLink>
                      </PaginationItem>)
                    } else {
                      return (<PaginationItem key={i}><PaginationLink tag="button">{i + 1}</PaginationLink></PaginationItem>)
                    }
                  }
                  )}
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
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
