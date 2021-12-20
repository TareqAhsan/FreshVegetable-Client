import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Redux/slices/productSlice";
const ManageProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleDelete = (id) => {
    axios
      .delete(
        `https://morning-oasis-89625.herokuapp.com/products/managedelete/${id}`
      )
      .then((result) => {
        if (result.data.deletedCount) {
          dispatch(fetchProducts());
          toast.success("product deleted Successfully");
        }
      });
  };
  const allproduct = useSelector((state) => state.products.discover);
  return (
    <div>
      <h1>This is Manage Product Page</h1>
      <Container className="py-4">
        {/* {allproduct.length} */}
        <Toaster position="top-center" reverseOrder={true} />
        <Row xs={1} md={2} lg={2} className="g-4">
          {allproduct?.map((product) => (
            <Col key={product._id}>
              <div
                className="card mb-3 h-100 border-0 shadow"
                style={{ maxwidth: "540px", borderRadius: "15px" }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`data:image/jpeg;base64,${product?.image}`}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-danger">
                        {product?.name}
                      </h5>
                      <p className="card-text fs-5 fw-bold text-danger">
                        {product?.price}Taka
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          <Button
                            onClick={() => handleDelete(product._id)}
                            variant="danger"
                          >
                            Delete This product
                          </Button>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ManageProduct;
