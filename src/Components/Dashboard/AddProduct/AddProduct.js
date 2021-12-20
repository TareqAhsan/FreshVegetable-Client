import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../Redux/slices/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { name, image, category, price } = data;
    if (!image) {
      return;
    }
    console.log(image[0]);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image[0]);

    fetch("https://morning-oasis-89625.herokuapp.com/addproduct", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        if (result.insertedId) {
          toast.success("Product Added Successfully");
          dispatch(fetchProducts());
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Container className="py-4">
        <Toaster position="top-center" reverseOrder={true} />
        <h1 className="display-6">Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4">
          <input
            {...register("name")}
            className="form-control mb-2"
            placeholder="product name"
            required
          />
          <input
            placeholder="category"
            {...register("category", { required: true })}
            className="form-control mb-2"
          />
          {errors.expertise && <span>This field is required</span>}
          <input
            placeholder="price"
            {...register("price", { required: true })}
            className="form-control mb-2"
          />
          <input
            accept="image/*"
            {...register("image")}
            className="form-control mb-2"
            type="file"
            onChange={(e) => console.log(e.target.files[0])}
          />
          <input type="submit" className="form-control btn btn-warning" />
        </form>
      </Container>
    </div>
  );
};

export default AddProduct;
