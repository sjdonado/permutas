import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../Requests';

const MESSAGES_ENDPOINT = "/messages";
const DATE_FORMAT_CONFIG = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    Requests.get(MESSAGES_ENDPOINT)
      .then( res => {
        let items = res.data.items;
        let {messages} = this.state;
        if(items.length > 0){
          messages.push(...items);
          this.setState({messages});          
        }
      })
      .catch(err => console.error(err))
  }

  formatDate = date => {
    return new Date(date).toLocaleDateString("es-US",DATE_FORMAT_CONFIG);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-speech pr-1"></i>Mensajes</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <theader>
                    <tr>
                      <td>Mensaje</td>
                      <td style={{width:"25%"}}>Emitido</td>
                    </tr>
                  </theader>
                  <tbody>
                    {
                      this.state.messages.map( message =>                         
                          <tr key={message._id}>
                            <td style={{whiteSpace:"pre-line"}} >{message.text}</td>
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
      </div>
    )
  }
}

export default Messages;
