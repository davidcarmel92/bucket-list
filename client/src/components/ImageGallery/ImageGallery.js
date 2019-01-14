import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPin } from '../../actions/pinActions';

class ImageGallery extends Component {

  componentDidMount() {
    this.props.getPin(this.props.match.params.pin_id)
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link className="btn btn-light" to={`/pin/${this.props.match.params.pin_id}`}>Back to Pin</Link>
            Hello
          </div>
        </div>
      </div>
    )
  }
}

ImageGallery.propTypes = {
  pin: PropTypes.object.isRequired,
  getPin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  pin: state.pin
})

export default connect(mapStateToProps, { getPin })(ImageGallery)
