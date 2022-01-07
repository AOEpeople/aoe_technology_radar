import { FlagType } from "../../model";
import "./flag.scss";

interface ItemFlag {
  flag: FlagType;
}

export default function Flag({
  item,
  short = false,
}: {
  item: ItemFlag;
  short?: boolean;
}) {
  const ucFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (item.flag !== FlagType.default) {
    let name = item.flag.toUpperCase();
    let title = ucFirst(item.flag);
    if (short === true) {
      name = title[0];
    }
    return (
      <span className={`flag flag--${item.flag}`} title={title}>
        {name}
      </span>
    );
  }

  return null;
}
