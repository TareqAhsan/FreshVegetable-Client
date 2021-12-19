import React, { useEffect, useState } from "react";
import styles from "../Home/FeatureProduct/FeatureProduct.module.css";
import { Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchSearch } from "../../Redux/slices/productSlice";
import Product from "../Product/Product";
import axios from "axios";

const Products = () => {
  const [allProduct, setAllProduct] = useState();
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.products.discover);

  const handleChange = async (e) => {
    const search = e.target.value;
    axios(`http://localhost:5000/products/search?val=${search}`).then(
      (result) => {
        if (result.data) {
          setAllProduct(result.data);
        }
      }
    );
    // dispatch(fetchSearch(search));
    // setAllProduct(true);
  };
  useEffect(() => {
    axios("http://localhost:5000/products").then((result) => {
      setAllProduct(result.data);
    });
  }, []);
  // const products = useSelector((state) => state.products.discover);
  // const search = useSelector((state) => state.products.search);
  return (
    <div className="my-3">
      {!allProduct?.length && (
        <Spinner
          animation="border"
          variant="success"
          style={{ height: "2.5rem", width: "2.5rem" }}
        ></Spinner>
      )}
      <Container>
        <input
          onChange={handleChange}
          type="text"
          name="service"
          className="form-control my-3"
          style={{ borderRadius: "8px" }}
          placeholder="search Any vegetables or Fruits By Name"
        />
        <div className={styles.custom}>
          {allProduct?.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Products;
