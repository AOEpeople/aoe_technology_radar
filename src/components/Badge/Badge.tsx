import classNames from "classnames";
import React, { MouseEventHandler } from "react";

import { ConfigData } from "../../config";
import "./badge.scss";

type BadgeProps = {
  onClick?: MouseEventHandler;
  big?: boolean;
  type: "big" | "all" | "empty" | string;
  config: ConfigData;
};

const defaultRingClasses = ["first", "second", "third", "fourth"];

const badgeClass = (type: string, config: ConfigData) => {
  const ringIndex = config.rings.indexOf(type);
  if (ringIndex < 0 || ringIndex >= defaultRingClasses.length) {
    return type;
  }
  return defaultRingClasses[config.rings.indexOf(type)];
};

export default function Badge({
  onClick,
  big,
  type,
  config,
  children,
}: React.PropsWithChildren<BadgeProps>) {
  const Comp = onClick ? "a" : "span";

  return (
    <Comp
      className={classNames("badge", `badge--${badgeClass(type, config)}`, {
        "badge--big": big === true,
      })}
      onClick={onClick}
      href={Comp === "a" ? "#" : undefined}
    >
      {children}
    </Comp>
  );
}
