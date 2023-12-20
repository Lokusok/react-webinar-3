import { useState } from "react";

function useTest() {
  const [count, setCount] = useState(0);

  return {
    count, setCount
  };
}

export default useTest;
