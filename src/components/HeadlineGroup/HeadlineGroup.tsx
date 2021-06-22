import React from "react";
import classNames from "classnames";
import "./headline-group.scss";

interface Props {
  secondary?: boolean;
}

const HeadlineGroup: React.FC<Props> = ({ children, secondary = false }) => (
  <div
    className={classNames("headline-group", {
      "headline-group--secondary": secondary,
    })}
  >
    {children}
  </div>
);

export default HeadlineGroup;
