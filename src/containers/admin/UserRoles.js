import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllUsers from './allUsers';
import {
  paginationAction, getRolesAction, newRoleInput, assignRole,
} from '../../redux/actions/admin/adminAction';

import getAllUsers from '../../redux/actions/getAllUsersActions';

export class UserRoles extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
    this.props.getRolesAction();
  }

  componentDidUpdate() {
    this.props.adminState.admin.payload && this.props.getAllUsers();
    this.props.adminState.admin.payload = undefined;
  }

  render() {
    const data = this.props.adminState.allUsers.users
      && this.props.adminState.allUsers.users.data;
    const options = this.props.adminState.admin.allRoles
      && this.props.adminState.admin.allRoles.data;

    return (
      <AllUsers
        paginatedRequest={this.props.adminState.allUsers.paginatedRequest}
        paginationAction={this.props.paginationAction}
        paginationEnd={this.props.adminState.allUsers.paginationEnd}
        paginationStart={this.props.adminState.allUsers.paginationStart}
        data-test="userRoles-test"
        handleChange={this.props.assignRole}
        data={data}
        options={options}
      />
    );
  }
}
export const mapStateToProps = (state) => ({
  adminState: state,
});
export default connect(mapStateToProps, {
  getAllUsers,
  getRolesAction,
  newRoleInput,
  assignRole,
  paginationAction,

})(UserRoles);
