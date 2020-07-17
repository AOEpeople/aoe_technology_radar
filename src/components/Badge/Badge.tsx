import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import './badge.scss';
import {Ring} from "../../config";
type BadgeProps = {
  onClick?: MouseEventHandler;
  big?: boolean;
  type: 'big' | 'all' | 'empty' | Ring;
};

export default function Badge({ onClick, big, type, children }: React.PropsWithChildren<BadgeProps>) {
  const Comp = onClick ? 'a' : 'span';

  return (
    <Comp
      className={classNames('badge', `badge--${type}`, {
        'badge--big': big === true,
      })}
      onClick={onClick}
      href={Comp === 'a' ? '#' : undefined}
    >
      {children}
    </Comp>
  );
}
