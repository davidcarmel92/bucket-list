import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS, GET_PROFILES } from './types';

export const getCurrentProfile = (history) => dispatch => {
  axios.get('/api/profile')
    .then(res => history.push(`/dashboard/${res.data._id}`))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
};

export const getProfileByUser = user_id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getProfileByPin = id => dispatch => {
  axios
    .get(`/api/profile/pin/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/profile', profileData)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This can not be undone!')) {
    axios.delete('/api/profile')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
  }
}

export const searchProfiles = (search_term) => dispatch => {
  axios
    .get(`/api/profile/search/${search_term}`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
}


export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
