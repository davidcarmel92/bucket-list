import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import StarRatings from 'react-star-ratings';
import { withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addLike, removeLike,  deletePinInside, updatePin, updatePinRating  } from '../../actions/pinActions';

class EditPin extends Component {

  state = {
    editComment: false,
    description: '',
    rating: 1,
    errors: {}
  }

  componentDidMount() {
    this.setState({rating: this.props.pin.rating, description: this.props.pin.description})
  }

  onDeleteClick = (id) => {
    this.props.deletePinInside(id, this.props.history, this.props.profile.profile._id);
  }

  onLikeClick = (id) => {

    this.props.addLike(id)
  }

  onUnlikeClick = (id) => {
    this.props.removeLike(id)
  }

  findUserLike = (likes) => {
    const { auth } = this.props;

    if(likes.filter(like => like.user === auth.user.id).length > 0) {
      return true
    }
    else {
      return false
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { pin } = this.props;

    const data = {
      edit: 'description',
      value: this.state.description
    }

    this.props.updatePin(pin._id, data)
    this.setState({description: '', editComment: false})
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onStarClick = (nextValue, name) => {

    const { pin } = this.props;

    if(this.props.auth.user.id === pin.user){
      this.setState({rating: nextValue}, () => {


        const data = {
          edit: 'rating',
          value: this.state.rating
        }

        this.props.updatePinRating(pin._id, data)
      });
    }
  }

  render() {

    const { editComment, errors, rating } = this.state;
    const { pin, auth } = this.props;

    let editPin;

    if(editComment) {
      editPin = (
        <span>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                 placeholder="Edit post"
                 name="description"
                 value={this.state.description}
                 onChange={this.onChange}
                 error={errors.description}
              />
            </div>
              <button type="submit" className="btn btn-success">Submit</button>
              <button
                onClick={() => this.setState({editComment: false})}
                type="button"
                className="btn btn-secondary ml-1">
                Cancel
              </button>
          </form>

        </span>
      )
    }
    else {
      editPin = (
        <span>
          <button
            onClick={() => this.setState({editComment: true})}
            type="button"
            className="btn btn-secondary">
            <i className="fas fa-edit" />
          </button>
        </span>
      )
    }
    return (
      <div>
        {pin.user === auth.user.id ? (
          <span className="mr-2">{editPin}</span>
        ) : null}
        <span>
          <StarRatings
            name="rate1"
            numberOfStars={5}
            rating={rating}
            starRatedColor="gold"
            starDimension="22px"
            starSpacing="0px"
            changeRating={this.onStarClick}
          />
        </span>
        <span className="float-right"><button onClick={() => this.onLikeClick(pin._id)} type="button" className="btn btn-light mr-1">
            <i className={classnames('fas fa-thumbs-up', {
              'text-info': this.findUserLike(pin.likes)
            })}></i>
            <span className="badge badge-light">{pin.likes.length}</span>
          </button>
          <button onClick={() => this.onUnlikeClick(pin._id)} type="button" className="btn btn-light mr-1">
            <i className="text-secondary fas fa-thumbs-down"></i>
          </button>
          {pin.user === auth.user.id ? (
            <button onClick={() => this.onDeleteClick(pin._id)} type="button" className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </span>
      </div>
    )
  }
}

EditPin.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePinInside: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired,
  updatePinRating: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pin: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { addLike, removeLike,  deletePinInside, updatePin, updatePinRating  })(withRouter(EditPin))
