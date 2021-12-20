import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Alert, Spinner } from "react-bootstrap";

const ManageAllOrder = () => {
  const [manageorder, setManageorder] = useState();
  const [success, setSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  useEffect(() => {
    axios("https://morning-oasis-89625.herokuapp.com/manageallOrder").then(
      (result) => setManageorder(result.data)
    );
  }, [manageorder]);

  const handleUpdate = (id) => {
    const proceed = window.confirm("Do you want to confirm shipping?");
    if (proceed) {
      const data = { status: "shipped" };
      axios
        .put(
          `https://morning-oasis-89625.herokuapp.com/status/update/${id}`,
          data
        )
        .then((result) => {
          if (result.data.modifiedCount) {
            setSuccess(true);
            setCancel(false);
          }
        });
    }
  };
  const handleDelete = (id) => {
    axios
      .delete(
        `https://morning-oasis-89625.herokuapp.com/manageallorder/cancel/${id}`
      )
      .then((result) => {
        if (result.data.deletedCount) {
          setCancel(true);
          setSuccess(false);
        }
      });
  };
  return (
    <div>
      <Container>
        {!manageorder?.length ? (
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
        ) : (
          <>
            <h1 className="display-5 my-4 p-2">Manage All orders</h1>
            {success && (
              <Alert variant="success my-2">Status successfully updated</Alert>
            )}
            {cancel && (
              <Alert variant="danger my-2">booking canceled successfully</Alert>
            )}
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>product</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>cancelOrder</th>
                </tr>
              </thead>
              <tbody>
                {manageorder?.map((order) => (
                  <tr key={order._id}>
                    <td>{order.displayName}</td>
                    <td>{order.name}</td>
                    <td>{order.address}</td>
                    <td>{order.phoneNo}</td>
                    <td>
                      {order.status === "pending" ? (
                        <Button onClick={() => handleUpdate(order._id)}>
                          click for shipping
                        </Button>
                      ) : (
                        order.status
                      )}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(order._id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
};

export default ManageAllOrder;
<h1>This is Manage All order page</h1>;
