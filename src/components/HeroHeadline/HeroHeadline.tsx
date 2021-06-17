import React from "react";
import "./hero-headline.scss";

interface Props {
  alt?: string;
}

const HeroHeadline: React.FC<Props> = ({ children, alt }) => (
  <div className="hero-headline">
    {children}
    <span className="hero-headline__alt">{alt}</span>
  </div>
);

export default HeroHeadline;
