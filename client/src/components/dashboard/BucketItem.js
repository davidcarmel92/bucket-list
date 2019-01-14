import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class BucketItem extends Component {

  state = {
    img: '',

  }

  componentDidMount(){
    if(this.props.pin.img.data){
      const base64Flag = `data:image/jpeg;base64,${this.props.pin.img.data.data}`;
      // const imageStr = this.arrayBufferToBase64(this.props.pin.img.data.data);
      this.setState({img: base64Flag});
    }
  }


  render() {

    const { pin, onDeletePin, onChangePin, defaultValue, auth, profile } = this.props;



    let disabled = false;

    if(profile.profile && auth.user.id !== profile.profile.user) {
      disabled = true;
    }

    return (
      <li className="list-inline-item mt-2 pin-card-link" key={pin._id}>
        <div className="card pin-card-styles">
          <Link to={`/pin/${pin._id}`} className="card-body link-card-styles" >
            <h3 className="card-title text-white font-weight-bold">{pin.title}</h3>
          </Link>
          <div className="card-footer bg-info pin-card-footer">
            <select disabled={disabled} onChange={(event) => onChangePin(pin._id, event.target.value)} defaultValue={defaultValue}>
              <option value="todo">To Do</option>
              <option value="doing">Currently Planned</option>
              <option value="done">Completetd</option>
            </select>
            {profile.profile && auth.user.id !== profile.profile.user ? (
              null
            ) : (
              <button type="button" className="close text-white" aria-label="Close" onClick={() => onDeletePin(pin._id)}>
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

BucketItem.propTypes = {
  pin: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onDeletePin: PropTypes.func,
  onChangePin: PropTypes.func
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(BucketItem);
