import React from 'react';
import classNames from 'classnames';


export default function Badge({ onClick, big, type, children }) {
  const Comp = typeof onClick === 'function' ? 'a' : 'span';
  return (
    <Comp
      className={classNames(
        'badge',
        `badge--${type}`,
        {
          'badge--big': big === true,
        }
      )}
      onClick={onClick}
      href={Comp === 'a' ? '#' : undefined}
    >
      {children}
    </Comp>
  );
}
