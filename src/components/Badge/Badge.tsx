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

const badgeClass = (type: string, config: ConfigData) => {
  if (!config.rings.includes(type)) {
    return type;
  }
  return ["first", "second", "third", "fourth"][config.rings.indexOf(type)];
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
