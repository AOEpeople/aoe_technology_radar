import {useState} from "react";

type SetTitleProps = {
  title: string
  onSetTitle?: (title: string) => void
}

export default function SetTitle({title, onSetTitle}: SetTitleProps) {
  const [onSetTitleState, setOnSetTitleState] = useState(() => onSetTitle)

  if (onSetTitle) {
    setOnSetTitleState(onSetTitle)
  }

  if (onSetTitleState) {
    onSetTitleState(title)
  }

  return null;
}
