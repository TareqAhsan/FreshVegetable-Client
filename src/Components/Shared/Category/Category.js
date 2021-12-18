import React, { useState } from "react";
import { Badge } from "react-bootstrap";

const Category = () => {
  const [state, setState] = useState("all");
  return (
    <div>
        <Badge
        pill
        bg="info"
        className="btn m-1"
        onClick={() => setState("all")}
      ></Badge>
      <Badge
        pill
        bg="info"
        className="btn m-1"
        onClick={() => setState("vegetable")}
      >
        vegetable
      </Badge>
      <Badge
        pill
        bg="primary"
        className="btn"
        onClick={() => setState("fruit")}
      >
        Fruit
      </Badge>
      {state === 'vegetable' && <}
    </div>
  );
};

export default Category;
