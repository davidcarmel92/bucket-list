import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/pinActions';
import EditComment from './EditComment'

class PinComment extends Component {


  render() {

    const { comment, pin, auth } = this.props;

    return (
      <div className="card mb-3">
        <div className="card-header bg-info text-white d-flex">
          <span>Posted by: {comment.name}</span>
          <span className="ml-auto"><Moment fromNow>{comment.date}</Moment></span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <p className="lead">
                {comment.text}
              </p>
              {comment.user === auth.user.id ? (
                <EditComment pinId={pin._id} commentId={comment._id} comment={comment} />
                ) : null}
            </div>
          </div>
        </div>
      </div>


    )
  }
}

PinComment.defaultProps = {
  showActions: true
}

PinComment.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  pin: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(PinComment)
