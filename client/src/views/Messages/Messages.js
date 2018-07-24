import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../Requests';

const MESSAGES_ENDPOINT = "/messages";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.fetchMessages();
  }


  componentDidMount() {
    console.log('h');
    //this.fetchMessages();
  }

  fetchMessages = () => {
    Requests.get(MESSAGES_ENDPOINT)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.error(err))
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
                  <tbody>
                    {
                      this.state.messages.map(([key, value]) => {
                        return (
                          <tr>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      })
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
