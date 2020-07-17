import React from 'react';
import { Link as RLink } from 'react-router-dom';
import './link.scss';
type LinkProps = {
  pageName: string;
  style?: React.CSSProperties;
  className?: string;
};

function Link({ pageName, children, className, style = {} }: React.PropsWithChildren<LinkProps>) {
  return (
    <RLink to={`/techradar/${pageName}.html`} style={style} {...{ className }}>
      {children}
    </RLink>
  );
}

export default Link;
