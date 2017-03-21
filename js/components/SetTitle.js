import React from 'react';


const callSetTitle = (props) => {
  if (typeof props.onSetTitle === 'function' && props.title) {
    props.onSetTitle(props.title);
  }
};

class SetTitle extends React.Component {
  constructor(props) {
    super(props);
    callSetTitle(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      callSetTitle(nextProps);
    }
  }

  render() {
    return null;
  }
}

export default SetTitle;
