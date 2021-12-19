import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../img/img/Product/logo.png'
import useAuth from "../../../hooks/useAuth.js";
import {fetchProducts} from "../../../Redux/slices/productSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import useFirebase from "../../../hooks/useFirebase";

const Navigation = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const navigate = useNavigate();
  const { allContext } = useAuth();
  const { logout, user } = allContext;
  const products = useSelector((state) => state.products.discover);
  const handleLogout = () => {
    logout(navigate);
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        sticky="top"
      >
        <Container>
          <Navbar.Brand as ={Link} to="/home">
            {/* React-Bootstrap {products?.length} */}
            <img src={logo} alt="" style={{width:'55px'}}/><span className="text-success fw-bold" style={{color:'',fontStyle:'italic'}}>Green Vegetable</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/category">Products</Nav.Link>
              {user?.email && (
                <Nav.Link as={Link} to="/dashboard">
                  <Button
                    style={{ borderRadius: "15px" }}
                    className="btn btn-success px-3 me-2 w-100"
                  >
                    Dashboard
                  </Button>
                </Nav.Link>
              )}
            </Nav>
            <Nav className="d-flex align-items-center">
              {!user?.email ? (
                <Nav.Link as={Link} to="/login">
                  <Button
                    style={{ borderRadius: "15px" }}
                    className="btn btn-success px-2 me-2 w-100"
                  >
                    Login
                  </Button>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <Button
                    style={{ borderRadius: "15px" }}
                    onClick={handleLogout}
                    className="btn btn-success px-2 me-2 w-100"
                  >
                    Logout
                  </Button>
                </Nav.Link>
              )}
              <Nav.Link eventKey={2} href="#memes">
                {user?.displayName}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
