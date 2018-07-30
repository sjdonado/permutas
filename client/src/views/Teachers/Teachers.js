import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import TeacherModal from './TeacherModal';
import Requests from '../../requests';
import { TRANSLATIONS } from '../../config';
import XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function TeacherRow(props) {
  return (
    <tr key={props.user._id}>
      <th scope="row"><a onClick={e => props.onClick(props.user)}>{props.user.fullname}</a></th>
      <td>{props.user.dni}</td>
      <td>{props.user.email}</td>
      <td>{props.user.role === 'teacher' ? 'Profesor' : 'Admin'}</td>
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
    this.state.usersData.forEach(object => {
      document.push(Object.keys(object).filter(key => key !== "contacted" && key !== "_id" && key !== "__v").map(item => (item === 'active' ? object[item] ? 'Activa' : 'Desactivada' : item === 'role' ? object[item] ? 'Admin' : 'Docente' : object[item])));
    });
    const ws = XLSX.utils.aoa_to_sheet(document);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "teachers.xlsx");
  }

  downloadPdf = e => {
    const rows = Object.keys(this.state.usersData[0]).filter(key => key !== "contacted" && key !== "_id" && key !== "__v")
      .map(item => ({ title: TRANSLATIONS[item].spanish, dataKey: item }));
    let columns = this.state.usersData.map((object, index) => {
      const user = Object.assign(object, { active: object.active ? 'Activa' : 'Desactivada', role: object.role === 'admin' ? 'Admin' : 'Docente' });
      return { id: index, ...user };
    });
    columns.shift(0);
    console.log(rows, columns);
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'A1'
    });
    doc.autoTable(rows, columns);
    doc.save('teachers.pdf');
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Button color="primary" className="new-message" style={{ marginLeft: "20px" }} onClick={this.downloadExcel}>Descargar excel</Button>
            <Button color="primary" className="new-message" onClick={this.downloadPdf}>Descargar pdf</Button>
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
