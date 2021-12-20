import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProducts } from "../../Redux/slices/productSlice";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "../Shared/Navigation/Navigation";

const PurchaseNow = () => {
  const { id } = useParams();
  const [exist, setExist] = useState(true);
  const { allContext } = useAuth();
  const { user } = allContext;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const singleProduct = useSelector((state) => state.products.singleProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProducts(id));
    if (singleProduct) {
      setExist(false);
    }
  }, [id, dispatch, singleProduct]);

  const onSubmit = (data) => {
    console.log(data);
    const confirm = window.confirm("Confirm Order");
    if (confirm) {
      data.image = singleProduct?.image;
      data.status = "pending";
      data.name = singleProduct?.name;
      data.price = singleProduct?.price;
      data.category = singleProduct?.category;
      axios
        .post(`https://morning-oasis-89625.herokuapp.com/addOrder`, data)
        .then((result) => {
          if (result.data.insertedId) {
            toast.success(
              `${user.displayName} You have Ordered successfully! `
            );
            reset();
          }
        });
    }
  };
  return (
    <div>
      <Navigation />
      <h1 className="display-6 my-4">Confirm Order for {singleProduct.name}</h1>
      <Container>
        <Toaster className="my-4" position="top-center" reverseOrder={true} />
        {exist ? (
          <Spinner
            className="my-5"
            animation="border"
            variant="success"
            style={{ width: "2.3rem", height: "2.3rem" }}
          ></Spinner>
        ) : (
          <Row xs={1} md={2} lg={2}>
            <Col>
              <div
                className="card mb-3 border-0 shadow p-2"
                style={{ maxWidth: "540px", borderRadius: "13px" }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`data:image/jpeg;base64,${singleProduct?.image}`}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-success">
                        {singleProduct?.name}
                      </h5>
                      <p className="card-text">{singleProduct?.category}</p>
                      <p className="card-text text-success fw-bold">
                        Price: {singleProduct?.price} taka/kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="shadow p-4"
                style={{ borderRadius: "12px" }}
              >
                <input
                  defaultValue={user?.displayName}
                  {...register("displayName")}
                  className="form-control  mb-3"
                  readOnly
                />

                <input
                  defaultValue={user?.email}
                  {...register("email")}
                  className="form-control mb-3"
                  readOnly
                />

                <input
                  {...register("address", { required: true })}
                  className="form-control mb-3"
                  placeholder="Enter address"
                />
                <input
                  {...register("phoneNo", { required: true })}
                  className="form-control mb-3"
                  placeholder="Enter Phone No"
                />

                <input
                  type="submit"
                  value="confirm booking"
                  className="form-control mb-3 btn btn-success"
                />
              </form>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PurchaseNow;
