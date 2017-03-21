export const NAVIGATE = 'navigate';

const actions = {
  navigate: (pageName, pushToHistory = true, pageState = {}) => {
    return {
      type: NAVIGATE,
      pageName,
      pageState,
      pushToHistory,
    };
  },
};

export default actions;
