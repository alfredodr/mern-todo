import { useState } from "react";

export default function useToggleState(initialVal = "false") {
  const [value, setValue] = useState(initialVal);

  const toggle = () => {
    setValue(!value);
  };

  return [value, toggle];
}
