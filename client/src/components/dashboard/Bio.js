import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, createProfile } from '../../actions/profileActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Favorites from './Favorites';

class Bio extends Component {

  state = {
    bio: '',
    editProfile: false
  }

  componentDidMount(){
    if(this.props.profile && this.props.profile.profile) {
      if(this.state.bio !== this.props.profile.profile.bio){
        this.setState({bio: this.props.profile.profile.bio})
      }
    }
  }

  onCreateProfile = () => {

    const data = {
      bio: this.state.bio
    }

    this.props.createProfile(data)

    this.setState({editProfile: false})
  }

  onCancelProfile = () => {
    this.setState({editProfile: false})
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { profile } = this.props.profile;
    const { user } = this.props.auth;

    return (
      <div>
        <div className="lead text-muted">
          <div className="d-flex">
            <div>{profile ? profile.name : null }</div>
            {profile && user.id === profile.user ? (
              <div className="ml-auto">
                <Link to="/add-pin"><button type="button" className="btn btn-primary">Add Pin</button></Link>
                <p><small>Make a new pin</small></p>
              </div>
            ) : null}
          </div>
        </div>
        {profile && profile.bio && this.state.editProfile === false ? (
          <div>
            <div>
              <label className="font-weight-bold">My Bio:</label>
              <div className="card">
                <span className="card-body">{profile.bio}</span>
              </div>
            </div>
            {user.id === profile.user ? (
              <button className='btn btn-secondary mt-2' onClick={() => this.setState({editProfile: true})}><i className="fas fa-edit" /><span>Edit</span></button>
            ) : null}
            <div className="font-weight-bold mt-2">My favorite places:</div>
            <Favorites />
          </div>
        ) : (
          <span>
            <p>Share about yourself!</p>
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              info="Tell us a little about yourself"
             />
            <button onClick={this.onCreateProfile} className="btn btn-primary">Save</button>
            {this.state.editProfile ? (
              <button onClick={this.onCancelProfile} className="btn btn-secondary ml-1">Cancel</button>
            ) : null}
            <div className="font-weight-bold mt-2">My favorite places:</div>
            <Favorites />
          </span>
        )}

      </div>
    )
  }
}

Bio.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, createProfile })(Bio)
