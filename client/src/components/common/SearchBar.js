import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProfiles } from '../../actions/profileActions';


class SearchBar extends Component {

  state = {
    searchTerm: '',
    searchResults: []
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.profile.profiles){
      this.setState({searchResults: nextProps.profile.profiles});
    }
    else {
      this.setState({searchResults: []});
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => this.props.searchProfiles(this.state.searchTerm))

  }

  render() {

    const { searchResults } = this.state;
    const { auth } = this.props;

    let links;
    
    searchResults.length > 0 ?
      links = searchResults.map((result,index) => (
        <li className="list-group-item" key={index}>
          {result.user === auth.user.id ?
            <Link className="search-results-item-link" to={`/dashboard`}>
              {result.name}
            </Link>
           :
            <Link className="search-results-item-link" to={`/dashboard/${result._id}`}>
              <div className="d-flex">
                <span>{result.name}</span>
              </div>
            </Link>
          }
        </li>
      ))
    :  links = null;

    return (
      <span className="navbar-nav ml-auto">
        <input className="search-bar" name="searchTerm" type="text" onChange={this.onChange} value={this.state.searchTerm} placeholder="Search for Friends..." />
        <ul className="list-group search-results">
          {links}
        </ul>
      </span>

    )
  }
}

SearchBar.propTypes = {
  searchProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { searchProfiles })(SearchBar);
