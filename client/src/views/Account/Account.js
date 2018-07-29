import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import RegisterForm from './../Pages/Register/RegisterForm';
import Requests from '../../requests';

class Account extends React.Component {

  updateUser = e => {
    Requests.put(`/users/${this.props.currentUser._id}`, this.props.token, this.props.currentUser)
      .then(res => {
        console.log(res);
        // this.props.saveUser(this.props.user);
        // this.props.saveCurrentUser(this.props.user);
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
            <h5 className="modal-title">{this.props.currentUser.fullname}</h5>
          </CardHeader>
          <CardBody>
            <RegisterForm {...this.props} />
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.updateUser}>Guardar</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Account;