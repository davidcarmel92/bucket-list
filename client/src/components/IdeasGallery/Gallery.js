import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pinData from '../../data/data.json';
import GalleryItem from './GalleryItem';

class Gallery extends Component {

  state = {
    pins: []
  }

  componentDidMount() {
    this.setState({pins: pinData.pins})
  }

  randomize = (array) => {
    var input = array;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
  }

  render() {

   const list = this.state.pins.map((pin,i) => <GalleryItem key={i} data={pin} />)

   const shuffledList = this.randomize(list);


    return (
      <div className="container">
        <div className="row">
          <span className="col-md-6">
            <Link to={'/dashboard'} className="btn btn-primary">
              Back To Profile
            </Link>
          </span>
          <h1 className="col-md-6 text-right">Pin Gallery</h1>
        </div>
        <hr />
        <div className="row gallery-container col-sm-12">
          <div>
            <ul className="list-inline" style={{width: '100%'}}>
              {shuffledList}
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default Gallery
