import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Requests from './../../requests';
import TeacherModal from './../../views/Teachers/TeacherModal';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.sate = {
      userDetailsModal: false,
      currentUser: {}
    }
  }
  updateUser = e => {
    Requests.put(`/users/${this.state.currentUser._id}`, this.props.token, this.state.currentUser)
      .then(res => {
        this.setState({ userDetailsModal: false });
        console.log('MANIYA');
      })
      .catch(err => {
        console.error(err);
      });
  }

  toggleUserDetailsModal = user => {
    const newUser = this.state.user ? {} : user;
    this.setState({
      userDetailsModal: !this.state.userDetailsModal,
      currentUser: newUser
    });
  }

  newData = data => {
    const updatedCurrentUser = Object.assign(this.state.currentUser, data);
    this.setState({ currentUser: updatedCurrentUser });
  }

  logout = () => {
    this.props.deleteToken();
    this.props.deleteUser();
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    if (!this.props.token) return <Redirect to="/login" />

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{this.props.user.fullname}</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Perfil</DropdownItem>
              <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Cerrar sesión</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {this.state.userDetailsModal && <TeacherModal open={this.state.userDetailsModal} toggle={this.toggleUserDetailsModal} user={this.state.currentUser} updateUser={this.updateUser} newData={this.newData} />}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
