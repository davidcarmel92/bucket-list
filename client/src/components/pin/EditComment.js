import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { editComment, deleteComment } from '../../actions/pinActions';

class EditComment extends Component {

  state = {
    editComment: false,
    text: '',
    errors: {}
  }

  componentDidMount(){
    this.setState({text: this.props.comment.text })
  }

  onDeleteClick = (id) => {
    this.props.deleteComment(id, this.props.pinId);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { commentId } = this.props;

    const commentData = {
      text: this.state.text,
      name: user.name
    }

    this.props.editComment(commentId, commentData)
    this.setState({editComment: false})
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    const { editComment, errors } = this.state;
    const { commentId } = this.props;

    let editButtons;

    if(editComment) {
      editButtons = (
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                 placeholder="Edit post"
                 name="text"
                 value={this.state.text}
                 onChange={this.onChange}
                 error={errors.text}
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

        </div>
      )
    }
    else {
      editButtons = (
        <div className="d-flex">
          <button
            onClick={() => this.setState({editComment: true})}
            type="button"
            className="btn btn-secondary">
            <i className="fas fa-edit" />
          </button>
          <button
            onClick={() => this.onDeleteClick(commentId)}
            type="button"
            className="btn btn-danger mr-1 ml-auto">
            <i className="fas fa-times" />
          </button>
        </div>
      )
    }
    return (
      <div>{editButtons}</div>
    )
  }
}

EditComment.propTypes = {
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
  pinId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { editComment, deleteComment })(EditComment)
