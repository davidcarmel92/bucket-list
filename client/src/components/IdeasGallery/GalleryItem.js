import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPinFromGallery, getPinsByUser } from '../../actions/pinActions';

class GalleryItem extends Component {

  state = {
    chosen: false,
    pins: []
  }

  componentDidMount() {
    this.props.getPinsByUser(this.props.auth.user.id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pin.pins !== this.state.pins) {
      this.setState({ pins: nextProps.pin.pins })
    }
  }

  onAdd = () => {
    this.setState({chosen: true})

    const pinData = {
      title: this.props.data.title,
      user_id: this.props.auth.user.id
    }

    this.props.addPinFromGallery(pinData)
  }

  render() {

    const { data } = this.props;

    const alreadyPicked = this.state.pins.filter(item => item.title === data.title).length

    let styles;

    if(this.state.chosen || alreadyPicked > 0) {
      styles = {
        opacity: .4
      }
    }

    return (
      <li className="list-inline-item mt-2 gallery-pin-card" style={styles}>
        <div className="card pin-card-styles">
          <div className="card-body link-card-styles" >
            <h3 className="card-title text-white font-weight-bold">{data.title}</h3>
          </div>
          <div className="card-footer bg-info pin-card-footer">
            {this.state.chosen || alreadyPicked > 0 ? (
              <span className="text-white">Added!</span>
            ): (
              <button className="btn btn-primary" onClick={() => this.onAdd()}>
                <span>Add pin</span>
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

GalleryItem.propTypes = {
  addPinFromGallery: PropTypes.func.isRequired,
  getPinsByUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  pin: state.pin
})

export default connect(mapStateToProps, { addPinFromGallery, getPinsByUser })(GalleryItem);
