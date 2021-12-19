import React, { useState } from "react";
import { Alert, Container, Spinner, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import Navigation from "../../Shared/Navigation/Navigation.js";
// import useAuth from "../../../hooks/useAuth";
// import useFirebase from "../../../hooks/useFirebase";
const Login = () => {
  const [loadedinfo, setLoadedinfo] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  //   const { allContext } = useAuth();

  //   const { login, error, user, loading,googleSignin } = allContext;
  const { allContext } = useAuth();
  const { login, error, user, loading, googleSignin } = allContext;
  const handleonBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newVal = { ...loadedinfo };
    newVal[field] = value;
    setLoadedinfo(newVal);
  };
  const handleSubmit = (e) => {
    console.log(loadedinfo);
    login(loadedinfo.email, loadedinfo.password, navigate, location);
    e.preventDefault();
  };

  const handleGoogle = () => {
    googleSignin(navigate, location);
  };
  return (
    <div>
      <Navigation />
      <Container className="my-4">
        <h1 className="display-6">Please Login</h1>
        <form
          onSubmit={handleSubmit}
          className="shadow p-4"
          style={{ borderRadius: "12px" }}
        >
          <div className="form-floating mb-3">
            <input
              type="email"
              onBlur={handleonBlur}
              name="email"
              className="form-control"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              onBlur={handleonBlur}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="form-control my-3 btn btn-primary"
            />
          </div>
          <Link to="/register">
            <>New User ? please Register</>
          </Link>
          <br />
          <Button onClick={handleGoogle} className="mt-2">
            SignInWithGoogle
          </Button>
        </form>
        {loading && (
          <Spinner
            animation="grow"
            variant="info"
            style={{ marginTop: "3px", width: "2rem", height: "2rem" }}
          ></Spinner>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    </div>
  );
};

export default Login;
