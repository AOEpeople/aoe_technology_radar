import { Head, Html, Main, NextScript } from "next/document";
import { CSSProperties, useMemo } from "react";

import { getColors } from "@/lib/data";

export default function Document() {
  const style = useMemo(() => {
    const cssVariables: Record<string, any> = {};
    const colors = getColors();

    Object.entries(colors).forEach(([key, value]) => {
      cssVariables[`--${key}`] = value;
    });

    return cssVariables as CSSProperties;
  }, []);

  return (
    <Html lang="en" style={style}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
