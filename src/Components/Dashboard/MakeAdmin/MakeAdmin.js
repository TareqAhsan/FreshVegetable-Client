import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const MakeAdmin = () => {
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    const body = { email };
    e.preventDefault();
    axios
      .put("https://morning-oasis-89625.herokuapp.com/users/makeadmin", body)
      .then((result) => {
        if (result.data.modifiedCount) {
          toast.success("Admin Added Successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <h2 className="display-5">make An Admin</h2>
      <Toaster className="mt-3" position="top-center" reverseOrder={true} />
      <form onSubmit={handleSubmit} className="my-4">
        {/* <input type="email" onBlur={(e)=>setEmail(e.target.value)} className=''/> */}
        <TextField
          onBlur={(e) => setEmail(e.target.value)}
          id="standard-basic"
          sx={{ width: "50%" }}
          label="Email"
          variant="standard"
        />
        <Button type="submit" variant="contained" sx={{ marginLeft: "3px" }}>
          Make Admin
        </Button>
      </form>
    </div>
  );
};

export default MakeAdmin;
