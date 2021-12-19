import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FruitProduct from "../../FruitProduct/FruitProduct";
import Products from "../../Products/Products";
import VegetableProduct from "../../VegetableProduct/VegetableProduct";
import Navigation from "../Navigation/Navigation";

const Category = () => {
  const [state, setState] = useState("all");
  return (
    <>
      <Navigation />
      <div className="my-3">
        <Button
          variant="secondary"
          size="sm"
          className="m-1"
          onClick={() => setState("all")}
        >
          All
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className=" m-1"
          onClick={() => setState("vegetable")}
        >
          vegetable
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className=" m-1"
          onClick={() => setState("fruit")}
        >
          Fruit
        </Button>
        {state === "all" && <Products />}
        {state === "vegetable" && <VegetableProduct />}
        {state === "fruit" && <FruitProduct />}
      </div>
    </>
  );
};

export default Category;
