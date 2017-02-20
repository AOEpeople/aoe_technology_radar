import createHistory from 'history/createBrowserHistory';

export const NAVIGATE = 'navigate';

let history;
if (process.env.RENDER_MODE !== 'server') {
  history = createHistory();

  const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
  });
}

const actions = {
  navigate: (pageName) => {
    history.push(`${pageName}.html`);
    return {
      type: NAVIGATE,
      pageName,
    };
  },
};

export default actions;
