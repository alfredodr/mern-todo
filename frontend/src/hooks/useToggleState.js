import { useState } from "react";

export default function useTodoState(initialVal = "false") {
  const [value, setValue] = useState(initialVal);

  const toggle = () => {
    setValue(!value);
  };

  return [value, toggle];
}
