import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import RegisterForm from './../Pages/Register/RegisterForm';

class UserModal extends React.Component {

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle} size="lg" >
        <div class="modal-header"><h5 class="modal-title">{this.props.user.fullname}</h5><button type="button" class="close" aria-label="Close" onClick={this.props.toggle} ><span aria-hidden="true">×</span></button></div>
        <ModalBody>
          <RegisterForm user={this.props.user} newData={this.props.newData} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.updateUSe}>Guardar</Button>
          <Button color="danger" onClick={this.props.deleteUser}>Eliminar</Button>
          <Button color="secundary" onClick={this.props.toggle}>Salir</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default UserModal;