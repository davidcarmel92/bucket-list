import { GET_PINS, UPDATE_PIN, DELETE_PIN, PIN_LOADING, GET_PIN, EDIT_COMMENT, EDIT_PIN_TEXT } from '../actions/types';

const initialState = {
  pins: [],
  pin: {},
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case PIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PINS:
      return {
        ...state,
        pins: action.payload,
        loading: false
      };
    case GET_PIN:
      return {
        ...state,
        pin: action.payload,
        loading: false
      };
    case UPDATE_PIN:
      const filterPins = state.pins.filter(pin => action.payload.data._id !== pin._id);

      return {
        ...state,
        pins: [action.payload.data, ...filterPins],
        pin: action.payload.data,
        loading: false
      };
    case DELETE_PIN:
      return {
        ...state,
        pins: state.pins.filter(pin => action.payload._id !== pin._id),
        loading: false
      };
    case EDIT_PIN_TEXT:
      return {
        ...state,
        loading: false
      }
    case EDIT_COMMENT:
      return {
        ...state,
        pin: {
          ...state.pin,
          comments: state.pin.comments.map((comment) => {
            if(comment._id !== action.payload.comment_id){
              return comment
            }
            return {
              ...comment,
              text: action.payload.text
            }
          })
        }
      }
    default:
      return state
  }
}
