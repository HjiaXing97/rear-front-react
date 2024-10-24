import { useEffect, useState } from "react";

const AAA = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log("count", count);

      setCount(count + 1);
    }, 2000);
  }, []);

  return <div>{count}</div>;
};

const Dict = () => {
  return (
    <div>
      <AAA></AAA>
    </div>
  );
};

export default Dict;
