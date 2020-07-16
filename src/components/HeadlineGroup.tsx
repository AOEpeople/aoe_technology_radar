import React from 'react';
import classNames from 'classnames';

export default function({ children, secondary = false }: React.PropsWithChildren<{secondary?: boolean}>) {
  return (
    <div
      className={classNames('headline-group', {'headline-group--secondary': secondary})}>
      {children}
    </div>
  );
}
