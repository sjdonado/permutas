import React, { Component } from 'react';
import { Col, Row, ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import Requests from '../../requests';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: '',
      usersData: [],
    };
    console.log('REDUX_STATE', this.props.user);
  }
  componentDidMount() {
    this.getUsers();
  }
  interaction = id => {
    Requests.post('/messages', this.props.token, { userId: id })
      .then(res => {
        this.props.user.contacted.push(id);
        this.getUsers();
      })
      .catch(err => {
        console.error(err);
      });
  }
  getUsers() {
    Requests.get(`/users/all${this.state.filters}`, this.props.token)
      .then(res => {
        this.setState({
          usersData: res.items
        })
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <ListGroup>
              {this.state.usersData.map((user, index) => {
                return (
                  <ListGroupItem key={index}>
                    <ListGroupItemHeading>{user.fullname}</ListGroupItemHeading>
                    {this.props.user.contacted.some(id => id === user._id) ?
                      <Button color="success" className="contact-btn" disabled >Contactado</Button> :
                      <Button color="primary" className="contact-btn" onClick={e => this.interaction(user._id)}>Contactar</Button>}
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
