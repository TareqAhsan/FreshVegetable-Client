import axios from "axios";
import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const Review = () => {
  const { allContext } = useAuth();
  const { user } = allContext;
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch("https://morning-oasis-89625.herokuapp.com/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          setSuccess(true);
          toast.success("Thanks For your Review");
          reset();
        }
      });
  };
  return (
    <div>
      <div>
        <Container>
          <Toaster className="mt-3" position="top-center" reverseOrder={true} />
          {success && (
            <Alert className="success py-4">Thanks For Your Review</Alert>
          )}
          <h3 className="display-6 py-4">
            {user?.displayName} Please give a Review
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow p-4"
            style={{ borderRadius: "10px" }}
          >
            <input
              defaultValue={user?.displayName}
              {...register("name")}
              className="form-control m-2"
            />

            <input
              {...register("feedback", { required: true })}
              placeholder="Give Feedback"
              className="form-control m-2"
            />

            {errors.feedback && (
              <span className="text-danger">This field is required</span>
            )}
            <input
              {...register("rating", { required: true })}
              type="number"
              step="0.5"
              min="0"
              max="5"
              placeholder="rate us out of 5"
              className="form-control m-2"
            />
            {errors.rating && (
              <span className="text-danger">
                This field is required Must be Number Not More Than 5
              </span>
            )}
            <input type="submit" className="form-control m-2 btn btn-success" />
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Review;
