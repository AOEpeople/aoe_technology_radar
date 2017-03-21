import React from 'react';

class SetTitle extends React.Component {
  constructor(props) {
    super(props);
    if (typeof props.onSetTitle === 'function' && props.title) {
      props.onSetTitle(props.title);
    }
  }

  render() {
    return null;
  }
}

export default SetTitle;
