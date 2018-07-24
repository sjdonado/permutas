import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
    this.state = {
      ...this.props.user,
      edit: false,
      editMessage: 'Editar',
    }
    console.log(this.state);
  }
  handleEdit = e => {
    if (this.state.edit) {
      this.setState({ edit: !this.state.edit, editMessage: 'Editar' });
      this.props.updateUserInfo(this.state);
    } else {
      this.setState({ edit: !this.state.edit, editMessage: 'Guardar' });
    }
  }

  editUserInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle} size="lg" >
        <ModalHeader toggle={this.toggle}>{this.props.user.fullname}</ModalHeader>
        <ModalBody>
          <Table responsive striped hover>
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
              <tr>
                <td>{this.state.edit ? <input type="text" name="fullname" value={this.state.fullname} onChange={this.editUserInfo}></input> : this.state.fullname}</td>
                <td>{this.state.dni}</td>
                <td>{this.state.email}</td>
                <td>{this.state.mobilePhone}</td>
                <td>{this.state.phone}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleEdit}>{this.state.editMessage}</Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default UserModal;