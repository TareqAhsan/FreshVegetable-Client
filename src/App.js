import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Reading from "./Components/Reading";
// import Add from "./Components/Add";
import Register from "./Components/Login/Register/Register";
import Login from "./Components/Login/Login/Login";
import Navigation from "./Components/Shared/Navigation/Navigation";
import AuthProvider from "./Components/Context/AuthProvider";
import Home from "./Components/Home/Home/Home";
import AddProduct from "./Components/Dashboard/AddProduct/AddProduct";
import PrivateRoute from "./Components/Login/PrivateRoute/PrivateRoute";
import PurchaseNow from "./Components/PurchaseNow/PurchaseNow";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import Products from "./Components/Products/Products";
import Category from "./Components/Shared/Category/Category";
import MyOrder from "./Components/Dashboard/MyOrder/MyOrder";
import MakeAdmin from "./Components/Dashboard/MakeAdmin/MakeAdmin";
import ManageAllOrder from "./Components/Dashboard/ManageAllOrder/ManageAllOrder";
import ManageProduct from "./Components/Dashboard/ManageProduct/ManageProduct";
import ManageReview from "./Components/Dashboard/ManageReview/ManageReview";
import Review from "./Components/Dashboard/Review/Review";

function App() {
  // const discover = useSelector((state) => state.books.discover);
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/products" element={<Products />} /> */}
            <Route path="/category" element={<Category />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard/addproduct" element={<AddProduct />} />
              <Route path="/dashboard/myorder" element={<MyOrder />} />
              <Route path="/dashboard/makeadmin" element={<AddProduct />} />
              <Route path="/dashboard/makeadmin" element={<MakeAdmin/>} />
              <Route path="/dashboard/manageallorder"element={<ManageAllOrder/>} />
              <Route path="/dashboard/manageproduct"element={<ManageProduct/>} />
              <Route path="/dashboard/manageallReview" element={<ManageReview/>} />
              <Route path="/dashboard/review" element={<Review/>} />
            </Route>
            <Route
              path="/purchase/:id"
              element={
                <PrivateRoute>
                  <PurchaseNow />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
