import React from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useFirebase from "../../../hooks/useFirebase";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import useAuth from "../../../hooks/useAuth";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //   const { allContext } = useAuth();
  //   const { registerUser ,error,loading} = allContext;
  // const users= useSelector(state=>state.products.users)
  const { registerUser, error, loading } = useFirebase();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== data.password2) {
      swal({
        title: "password did not match",
        icon: "error",
        timer: 3000,
      });
      return;
    }
    registerUser(data.email, data.password, data.name, navigate);
    reset();
  };
  return (
    <div>
      <h1 className="my-4 display-5">Please Register</h1>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow  p-3"
          style={{ borderRadius: "12px" }}
        >
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter Your Name"
            className="form-control mb-2"
          />

          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
            className="form-control mb-2"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter password"
            className="form-control mb-2"
          />
          <input
            type="password"
            {...register("password2", { required: true })}
            placeholder="Enter password"
            className="form-control mb-2"
          />

          <input type="submit" className="form-control mb-4 btn btn-primary" />
          <Link to="/login">
            <>Already register ? please Login</>
          </Link>
        </form>
        {loading && (
          <Spinner
            animation="grow"
            variant="primary"
            className="my-3"
            style={{ marginTop: "3px", width: "2rem", height: "2rem" }}
          ></Spinner>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    </div>
  );
};

export default Register;
