import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const Dashboard = () => {
  const navigate = useNavigate();
  const { allContext } = useAuth();
  const { user, logout, admin } = allContext;
  const handleLogout = () => {
    logout(navigate);
  };
  return (
    <>
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar
          textColor="#fff"
          backgroundColor="#333"
          style={{ backgroundColor: "green" }}
        >
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <NavLink
              to=""
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              {user?.displayName}
            </NavLink>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/dashboard" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              {admin ? (
                <>
                  <NavLink
                    to="/dashboard/makeadmin"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="user">
                      MakeAdmin
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/addproduct"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="plus-circle">
                      Add Product
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manageproduct"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="chart-line">
                      Manage Product
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manageallorder"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="exclamation-circle">
                      Manage AllOrder
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manageallReview"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="trash-alt">
                      Manage Review
                    </CDBSidebarMenuItem>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard/myorder"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="book-reader">
                      My Order
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    to="/dashboard/review"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="sticky-note">
                      Review
                    </CDBSidebarMenuItem>
                  </NavLink>
                </>
              )}
              <NavLink to="" activeClassName="activeClicked">
                <CDBSidebarMenuItem onClick={handleLogout} icon="sign-out-alt">
                  Logout
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem onClick={handleLogout} icon="home">
                  Home
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
        </CDBSidebar>
      </div>
      <Outlet/>
    </>
  );
};

export default Dashboard;
