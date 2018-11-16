import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';


class BucketItem extends Component {

  state = {
    img: ''
  }

  componentDidMount(){
    if(this.props.pin.img.data){
      const base64Flag = `data:image/jpeg;base64,${this.props.pin.img.data.data}`;
      // const imageStr = this.arrayBufferToBase64(this.props.pin.img.data.data);
      this.setState({img: base64Flag});
    }
  }

  arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };


  render() {

    const { pin, onDeletePin, onChangePin, defaultValue } = this.props;

    let backgroundStyles;

    if(pin.img.data) {
      backgroundStyles = {
        background: `url(${this.state.img}) no-repeat`,
        height: '100%',
        width: '100%'
      }
    }
    else {
      backgroundStyles = {};
    }


    return (
      <li className="list-inline-item mt-2" key={pin._id}>
        <div className="card pin-card-styles">
          <Link to={`/pin/${pin._id}`} className="card-body link-card-styles"  style={backgroundStyles} >
            <h3 className="card-title text-white font-weight-bold">{pin.title}</h3>
          </Link>
          <div className="card-footer bg-info">
            <select onChange={(event) => onChangePin(pin._id, event.target.value)} defaultValue={defaultValue}>
              <option value="todo">To Do</option>
              <option value="doing">Currently Planned</option>
              <option value="done">Completetd</option>
            </select>
            <button type="button" className="close text-white" aria-label="Close" onClick={() => onDeletePin(pin._id)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </li>
    )
  }
}

BucketItem.propTypes = {
  pin: PropTypes.object.isRequired,
  onDeletePin: PropTypes.func.isRequired,
  onChangePin: PropTypes.func.isRequired
}

export default BucketItem;