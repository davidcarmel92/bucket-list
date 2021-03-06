import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import SearchBar from '../common/SearchBar';

class Navbar extends Component {


  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={`/dashboard`}>Home</Link>
        </li>
        <li className="nav-item">
          <a href="logout" onClick={this.onLogoutClick} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">BucketList</Link>
        {isAuthenticated ? <SearchBar />: null}
        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ml-auto">
          </ul>
          <span className="text-white mr-2">Welcome {user.name}</span>
          {isAuthenticated ? authLinks: guestLinks}
        </div>

      </nav>
    )
  }
}

//{isAuthenticated ? <SearchBar />: null}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
