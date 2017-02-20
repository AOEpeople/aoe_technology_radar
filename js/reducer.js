import { NAVIGATE } from './actions';

const initialState = {
  pageName: 'index',
  items: [],
  releases: [],
};

const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        pageName: action.pageName,
      }
      break;
    default:
      return state;
  }
}

export default appReducer;
