import {useEffect} from "react";
import {radarName} from "../config";

type SetTitleProps = {
  title: string
}

export default function SetTitle({title}: SetTitleProps) {
  useEffect(() => {
    document.title = `${title} | ${radarName}`
  }, [title])

  return null;
}
