import React from 'react';
import classNames from 'classnames';

class Fadeable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faded: props.leaving,
    };
  }

  componentWillReceiveProps({ leaving }) {
    if (!this.props.leaving && leaving) {
      this.setState({
        ...this.state,
        faded: true,
      });
    }
    if (this.props.leaving && !leaving) {
      this.setState({
        ...this.state,
        faded: false,
      });
    }
  }

  handleTransitionEnd = () => {
    if (this.state.faded) {
      this.props.onLeave();
    }
  };

  render() {
    return (
      <div
        className={classNames('fadable', { 'is-faded': this.state.faded })}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Fadeable;
