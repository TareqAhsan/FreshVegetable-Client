import axios from "axios";
import React, { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { myOrder } from "../../../Redux/slices/productSlice";

const MyOrder = () => {
  const { allContext } = useAuth();

  const { user } = allContext;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrder(user?.email));
  }, [user?.email, dispatch]);
  const myorders = useSelector((state) => state.products.myOrder);
  
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/products/cancel/${id}`)
      .then((result) => {
        if (result.data.deletedCount) {
          toast.success("Booking Successfully canceled!");
          dispatch(myOrder(user?.email));
        }
      });
  };
  return (
    <div className="text-center">
      {/* <h1 className="text-center">This is my order</h1> */}
      <Container>
        <Toaster position="top-center" reverseOrder={true} />
        {myorders?.length > 0 ? (
          <>
            {" "}
            <h1 className="display-6 my-5">
              {user.displayName} You have Booked {myorders?.length} items
            </h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ProductName</th>
                  <th>Price</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>CancelOrder</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {myorders.map((mybook) => (
                  <tr key={mybook._id}>
                    <td>{mybook.name}</td>
                    <td>{mybook.price}</td>
                    <td>{mybook.phoneNo}</td>
                    <td>{mybook.status}</td>
                    <td>
                      <Button size="sm" onClick={() => handleDelete(mybook?._id)}>
                        cancel
                      </Button>
                    </td>
                    <td>
                      {mybook?.payment ? (
                        "paid"
                      ) : (
                        <Link to={`/dashboard/payment/${mybook?._id}`}>
                          <Button size="sm">Pay</Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <h2>You have no booking</h2>
        )}
      </Container>
    </div>
  );
};

export default MyOrder;
