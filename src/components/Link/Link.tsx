import React from "react";
import { Link as RLink } from "react-router-dom";

import { useSearchParamState } from "../../hooks/use-search-param-state";
import "./link.scss";

type LinkProps = {
  pageName: string;
  style?: React.CSSProperties;
  className?: string;
};

function Link({
  pageName,
  children,
  className,
  style = {},
}: React.PropsWithChildren<LinkProps>) {
  const [searchParamState] = useSearchParamState(undefined, {
    parseOptions: { decode: false },
  });
  const { tags } = searchParamState;

  return (
    <RLink
      to={tags ? `/${pageName}.html?tags=${tags}` : `/${pageName}.html`}
      style={style}
      {...{ className }}
    >
      {children}
    </RLink>
  );
}

export default Link;
