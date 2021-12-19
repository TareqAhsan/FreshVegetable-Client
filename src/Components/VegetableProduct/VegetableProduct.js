import React, { useEffect } from "react";
import styles from '../Home/FeatureProduct/FeatureProduct.module.css'
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchVegetable } from "../../Redux/slices/productSlice";
import Product from "../Product/Product";
const VegetableProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVegetable());
  }, [dispatch]);
  const vegetable = useSelector((state) => state.products.discover);
  return (
    <div>
      <Container className="my-4">
        {!vegetable.length && (
          <Spinner animation="border" variant="success"></Spinner>
        )}
        <h3 className="my-5">Seasonal Vegetables</h3>
        <div className={styles.custom}>
          {vegetable.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VegetableProduct;
