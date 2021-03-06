import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import RegisterForm from './../Pages/Register/RegisterForm';
import Requests from '../../requests';

class TeacherModal extends React.Component {
  updateUser = e => {
    Requests.put(`/users/${this.props.currentUser._id}`, this.props.token, this.props.currentUser)
      .then(res => {
        this.props.toggle();
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteUser = e => {
    Requests.delete(`/users/${this.props.currentUser._id}`, this.props.token)
      .then(res => {
        this.props.toggle();
        if (this.props.getUsers) this.props.getUsers();
      })
      .catch(err => {
        console.error(err);
      });
  }

  deactivate = e => {
    this.props.saveCurrentUser(Object.assign(this.props.currentUser, { active: !this.props.currentUser.active }));
    this.updateUser();
  }

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle} size="lg" >
        <div className="modal-header"><h5 className="modal-title">{this.props.currentUser.fullname}</h5><button type="button" className="close" aria-label="Close" onClick={this.props.toggle} ><span aria-hidden="true">×</span></button></div>
        <ModalBody>
          <RegisterForm {...this.props} />
        </ModalBody>
        <ModalFooter>
          {this.props.user.role === "admin" && <Button color="danger" onClick={this.deleteUser}>Eliminar</Button>}
          <Button color="secundary" onClick={this.deactivate}>{this.props.currentUser.active ? 'Desactivar' : 'Activar'}</Button>
          <Button color="primary" onClick={this.updateUser}>Guardar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default TeacherModal;