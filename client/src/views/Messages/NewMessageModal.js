import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Input, Row, Col, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Requests from '../../requests';

class NewMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: ''
    };
  }
  sendMessage = e => {
    const data = {
      title: this.state.title,
      text: this.state.text
    };

    Requests.post('/messages/global', this.props.token, data)
      .then(res => {
        console.log(res);
        this.props.addNewMessage(res);
        this.props.toggle();
      })
      .catch(err => console.error(err))
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle} size="lg" >
        <div className="modal-header"><h5 className="modal-title">{this.state.title}</h5><button type="button" className="close" aria-label="Close" onClick={this.props.toggle} ><span aria-hidden="true">×</span></button></div>
        <ModalBody>
          <Row>
            <Col md="12">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-pencil"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Título"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <InputGroup className="mb-3">
                <Input
                  type="textarea"
                  placeholder="Mensaje"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange} />
              </InputGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.sendMessage}>Enviar</Button>
          <Button color="secundary" onClick={this.props.toggle}>Salir</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default NewMessageModal;