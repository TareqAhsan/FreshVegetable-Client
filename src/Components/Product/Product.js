import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./product.module.css";
const Product = ({ product }) => {
  // const { image } = product;
  // console.log(image)
  return (
    <div
      className={`${styles.singlecard}`}
      className="shadow p-3"
      style={{ borderRadius: "12px" }}
    >
      <div className="img-top">
        <img
          className={styles.image}
          src={`data:image/jpeg;base64,${product?.image}`}
          alt=""
        />
      </div>
      <div>
        <h5>{product?.name}</h5>
        <span>{product?.category}</span>
        <p className="text-success fw-bold">Price {product?.price} per/kg</p>
        <Link to={`/purchase/${product?._id}`}>
          <Button variant="success">Purcase Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
