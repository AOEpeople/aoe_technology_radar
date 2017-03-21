import { NAVIGATE } from './actions';

const initialState = {
  pageName: 'index',
  pageState: {},
  items: [],
  releases: [],
};

const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        pageName: action.pageName,
        pageState: action.pageState,
      }
      break;
    default:
      return state;
  }
}

export default appReducer;
