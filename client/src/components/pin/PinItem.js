import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditPin from './EditPin'

class PinItem extends Component {

  state = {
    description: '',
    editText: false
  }

  componentDidMount() {
    this.setState({ description: this.props.pin.description })
  }


  render() {

    const { pin } = this.props;
    const { description } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-12">
            <p className="lead">
              {description}
            </p>
            <EditPin pin={pin} />
          </div>
        </div>
      </div>
    )
  }
}


export default connect(null, { })(withRouter(PinItem))
