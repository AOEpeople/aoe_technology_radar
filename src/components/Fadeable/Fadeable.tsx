import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './fadeable.scss';
type FadeableProps = {
  leaving: boolean;
  onLeave: () => void;
};

export default function Fadeable({ leaving, onLeave, children }: React.PropsWithChildren<FadeableProps>) {
  const [faded, setFaded] = useState(leaving);

  useEffect(() => {
    setFaded(leaving);
  }, [leaving]);

  const handleTransitionEnd = () => {
    if (faded) {
      onLeave();
    }
  };

  return (
    <div className={classNames('fadable', { 'is-faded': faded })} onTransitionEnd={handleTransitionEnd}>
      {children}
    </div>
  );
}
