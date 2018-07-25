import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import Requests from '../../requests';
import NewMessageModal from './NewMessageModal';

const MESSAGES_ENDPOINT = "/messages";
const DATE_FORMAT_CONFIG = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messageModal: false
    };
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    Requests.get(MESSAGES_ENDPOINT, this.props.token)
      .then(res => {
        let items = res.items;
        let { messages } = this.state;
        if (items.length > 0) {
          messages.push(...items);
          this.setState({ messages });
        }
      })
      .catch(err => console.error(err))
  }

  toggleMessageModal = e => {
    if (this.state.messageModal) {
      this.setState({ messages: [] });
      this.fetchMessages();
    }
  }

  addNewMessage = newMessage => {
    this.setState(prevState => ({
      messages: [...prevState.messages, newMessage]
    }));
  }

  formatDate = date => {
    return new Date(date).toLocaleDateString("es-US", DATE_FORMAT_CONFIG);
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.props.user.role === "admin" && (<Row>
          <Col lg={12}>
            <Button color="primary" className="new-message" onClick={this.toggleMessageModal}>Nuevo Mensaje</Button>
          </Col>
        </Row>)}
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-speech pr-1"></i>Mensajes</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <td>Mensaje</td>
                      <td style={{ width: "25%" }}>Emitido</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.messages.map(message =>
                        <tr key={message._id}>
                          <td style={{ whiteSpace: "pre-line" }} >{message.title} <br /> {message.text}</td>
                          <td>{this.formatDate(message.createdAt)}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.messageModal && <NewMessageModal open={this.state.messageModal} toggle={this.toggleMessageModal} addNewMessage={this.addNewMessage} {...this.props} />}
      </div>
    )
  }
}

export default Messages;
