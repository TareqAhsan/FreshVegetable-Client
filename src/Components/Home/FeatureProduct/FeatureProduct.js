import React, { useEffect } from "react";
import styles from './FeatureProduct.module.css'
import { Container, Row } from "react-bootstrap";
import Product from "../../Product/Product";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../Redux/slices/productSlice";
import { useSelector } from "react-redux";
const Products = [
  {
    name: "Ful Kopi",
    image: "https://i.ibb.co/6w9G2FR/ful-kopi-min.jpg",
    category: "vegetable",
    quantity: 1,
    key: 1,
    price: 20,
  },
  {
    name: "Tomattos",
    image: "https://i.ibb.co/X2ptbgp/tomattos-min.jpg",
    category: "vegetable",
    quantity: 1,
    key: 2,
    price: 30,
  },
  {
    name: "Lady finger",
    image: "https://i.ibb.co/JRBX8Cj/ladies-finger-min.jpg",
    category: "vegetable",
    quantity: 1,
    key: 3,
    price: 25,
  },
  {
    name: "Carrot",
    image: "https://i.ibb.co/zfq4kjv/carrot-min.png",
    category: "vegetable",
    quantity: 1,
    key: 4,
    price: 20,
  },
];
const FeatureProduct = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);
  const products = useSelector(state=>state.products.discover)
  return (
    <div>
      <Container className="my-4">
        <h3 className="my-5">Seasonal Trending Product</h3>
        <div   className={styles.custom}>
          {products.slice(0,10).map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeatureProduct;
