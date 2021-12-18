import React, { useEffect, useState } from "react";
import styles from "../Home/FeatureProduct/FeatureProduct.module.css";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchSearch } from "../../Redux/slices/productSlice";
import Product from "../Product/Product";

const Products = () => {
  const [allProduct, setAllProduct] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const search = e.target.value;
    setAllProduct(true);
    dispatch(fetchSearch(search));
  };
  const products = useSelector((state) => state.products.discover);
  const search = useSelector((state) => state.products.search);
  return (
    <div>
      <Container>
        <input
          onChange={handleChange}
          type="text"
          name="service"
          className="form-control my-3"
          style={{ borderRadius: "8px" }}
          placeholder="search Any vegetables or Fruits By Name"
        />

        {allProduct ? (
            <><h5 className="display-6 text-success"> {search?.length} results found</h5>
          <div className={styles.custom}>
            {search?.map((product) => (
              <Product product={product} key={product._id}></Product>
            ))}
          </div></>
        ) : (
          <div className={styles.custom}>
            {products?.map((product) => (
              <Product product={product} key={product._id}></Product>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Products;
