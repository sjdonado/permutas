import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import RegisterForm from './../Pages/Register/RegisterForm';
import Requests from '../../requests';

class Account extends React.Component {

  updateUser = e => {
    Requests.put(`/users/${this.props.user._id}`, this.props.token, this.props.user)
      .then(res => {
        this.props.saveUser(res.item);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <h5 className="modal-title">{this.props.user.fullname}</h5>
          </CardHeader>
          <CardBody>
            <RegisterForm {...this.props} currentUser={this.props.user} />
          </CardBody>
          <CardFooter>
            <Button color="primary" className="filter-btn" onClick={this.updateUser}>Guardar</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Account;