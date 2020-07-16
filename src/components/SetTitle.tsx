// import React from 'react';

// todo fix this mess

// const _callSetTitle = (props) => {
//   if (typeof props.onSetTitle === 'function' && props.title) {
//     props.onSetTitle(props.title);
//   }
// };

// class _SetTitle extends React.Component {
//   constructor(props) {
//     super(props);
//     _callSetTitle(props);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.title !== this.props.title) {
//       _callSetTitle(nextProps);
//     }
//   }

//   render() {
//     return null;
//   }
// }


type SetTitleProps = {
  title: string
  onSetTitle?: (title: string) => void
}

export default function SetTitle({title, onSetTitle}: SetTitleProps) {
  if (onSetTitle) {
    onSetTitle(title)
  } 

  return null;
}
