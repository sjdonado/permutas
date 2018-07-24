import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
    this.state = {
      edit: false
    }
  }
  handleEdit = e => {
    this.setState(prevState => { edit: !prevState.edit });
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
                <td>{this.state.edit ? <input type="text" name="fullname" value={this.props.user.fullname}></input> : this.props.user.fullname}</td>
                <td>{this.props.user.dni}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.mobilePhone}</td>
                <td>{this.props.user.phone}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.handleEdit}>Editar</Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default UserModal;