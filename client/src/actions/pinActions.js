import axios from 'axios';

import { GET_PINS, GET_ERRORS, CLEAR_ERRORS, PIN_LOADING, UPDATE_PIN , DELETE_PIN, GET_PIN, EDIT_COMMENT } from './types';

export const addPin = (pinData, history) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/pins/`, pinData)
    .then(res => history.push(`/dashboard`))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const addPinFromGallery = (pinData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/pins/`, pinData)
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const getPinsByProfile = (id) => dispatch => {
  dispatch(setPinLoading());
  axios.get(`/api/pins/profile/${id}`)
    .then(res => dispatch({
      type: GET_PINS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const getPinsByUser = (id) => dispatch => {
  dispatch(setPinLoading());
  axios.get(`/api/pins/user/${id}`)
    .then(res => dispatch({
      type: GET_PINS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const getPin = (id) => dispatch => {
  dispatch(setPinLoading());
  axios.get(`/api/pins/pin/${id}`)
    .then(res => dispatch({
      type: GET_PIN,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PIN,
      payload: null
    }));
}

export const updatePin = (pin_id, value) => dispatch => {
  dispatch(setPinLoading());
  axios.post(`/api/pins/update/${pin_id}`, value)
    .then(res => dispatch({
      type: UPDATE_PIN,
      payload: { data: res.data, update: value.edit }
    }))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const updatePinRating = (pin_id, value) => dispatch => {
  axios.post(`/api/pins/update/${pin_id}`, value)
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const deletePin = (pin_id) => dispatch => {
  dispatch(setPinLoading());
  axios.delete(`/api/pins/${pin_id}`)
    .then(res => dispatch({
      type: DELETE_PIN,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const deletePinInside = (pin_id, history, profile_id) => dispatch => {
  dispatch(setPinLoading());
  axios.delete(`/api/pins/${pin_id}`)
    .then(res => dispatch({
      type: DELETE_PIN,
      payload: res.data
    }))
    .then(res => history.push(`/dashboard/${profile_id}`))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const addLike = (pin_id) => dispatch => {
  axios.post(`/api/pins/like/${pin_id}`)
    .then(res => dispatch({
      type: GET_PIN,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const removeLike = (pin_id) => dispatch =>{
  axios.post(`/api/pins/unlike/${pin_id}`)
    .then(res => dispatch({
      type: GET_PIN,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PINS,
      payload: null
    }));
}

export const addComment = (pinId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/pins/comment/${pinId}`, commentData)
    .then(res => dispatch({
      type: GET_PIN,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const deleteComment = (comment_id, pinId) => dispatch => {
  dispatch(clearErrors());
  axios.delete(`/api/pins/comment/${pinId}/${comment_id}`)
    .then(res => dispatch({
      type: GET_PIN,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const editComment = (comment_id, commentData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/pins/edit-comment/${comment_id}`, commentData)
    .then(res => dispatch({
      type: EDIT_COMMENT,
      payload: { comment_id: comment_id, text: commentData.text}
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const setPinLoading = () => {
  return {
    type: PIN_LOADING
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
