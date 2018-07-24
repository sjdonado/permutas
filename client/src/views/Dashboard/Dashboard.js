import React, { Component } from 'react';
import User from '../Users/User'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <User />
    );
  }
}

export default Dashboard;
