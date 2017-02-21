export const NAVIGATE = 'navigate';

const actions = {
  navigate: (pageName, pushToHistory = true) => {
    return {
      type: NAVIGATE,
      pageName,
      pushToHistory,
    };
  },
};

export default actions;
