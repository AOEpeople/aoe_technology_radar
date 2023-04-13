import React, { useEffect } from "react";

import { Item } from "../../../model";
import "./filterRadar.scss";

type FilterProps = {
  items: Item[];
  onChange: (items: string[]) => void;
};

export default React.forwardRef((props: FilterProps, ref) => {
  return FilterRadar(props, ref);
});

function FilterRadar({ items, onChange }: FilterProps, ref: any) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  useEffect(() => {
    const getRings = selectedOptions.map(
      (elem) => (JSON.parse(elem) as Item).ring
    );
    const uniqueRings = Array.from(new Set(getRings));
    onChange(uniqueRings);
  }, [selectedOptions, onChange]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedOptions);
  };

  return (
    <select multiple value={selectedOptions} onChange={handleSelectChange}>
      {items.map((elem) => (
        <option value={JSON.stringify(elem)} key={elem.name}>
          {elem.title}
        </option>
      ))}
    </select>
  );
}
