import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BucketItem from './BucketItem'


class BucketGroup extends Component {

  state = {
    showAll: false
  }

  render() {

    const { pins, title, id, onChangePin, onDeletePin } = this.props;
    const { showAll } = this.state;

    const list = pins.map(pin =>
      <BucketItem
        key={pin._id}
        pin={pin}
        onDeletePin={onDeletePin}
        onChangePin={onChangePin}
        defaultValue={id}
      />
    )

    let viewList;

    if(!showAll){
      viewList = list.slice(0,2)
    }
    else {
      viewList = list
    }

    let showAllButton;

    if(list.length > 2){
      if(showAll){
        showAllButton = (
          <button onClick={() => this.setState({showAll: false})} className="btn btn-outline-secondary">See Less</button>
        )
      }
      else {
        showAllButton = (
          <button onClick={() => this.setState({showAll: true})} className="btn btn-outline-secondary">See More</button>
        )
      }
    }

    return (
      <div>
        <h1 className="bg-light p-2 mt-2 text-center">{title}</h1>
        <hr />
        <ul className="list-inline" style={{width: '100%'}}>
          {viewList}
        </ul>
        {showAllButton}
      </div>
    )
  }
}

BucketGroup.propTypes = {
  pins: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangePin: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {})(BucketGroup);
