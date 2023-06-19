import { useEffect } from "react";

import { setTitle } from "../config";

type SetTitleProps = {
  title: string;
};

export default function SetTitle({ title }: SetTitleProps) {
  useEffect(() => {
    setTitle(document, title)
  }, [title]);

  return null;
}
