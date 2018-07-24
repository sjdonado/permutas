import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
  }
  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>{this.props.user.fullname}</ModalHeader>
        <ModalBody>
          <Table responsive striped hover>
            <tbody>
              {
                Object.keys(this.props.user).map((key, index) => {
                  return (
                    <tr key={index}>
                      <td>{`${key}:`}</td>
                      <td><strong>{this.props.user[key]}</strong></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>Editar</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default UserModal;