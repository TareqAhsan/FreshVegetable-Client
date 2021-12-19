import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const drawerWidth = 240;

function Dashboard(props) {
  const navigate = useNavigate();
  const { allContext } = useAuth();
  const { user, logout, admin } = allContext;
  const handleLogout = () => {
    logout(navigate);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <NavLink
          to="/dashboard"
          style={{
            display: "block",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "7px",
          }}
        >
          <Button variant="contained" sx={{ width: "80%" }}>
            Dashboard
          </Button>
        </NavLink>
        {admin ? (
          <>
            {" "}
            <NavLink
              to="/dashboard/makeadmin"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                Make Admin
              </Button>
            </NavLink>
            <NavLink
              to="/dashboard/addproduct"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                Add Product
              </Button>
            </NavLink>
            <NavLink
              to="/dashboard/manageproduct"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                Manage Product
              </Button>
            </NavLink>
            <NavLink
              to="/dashboard/manageallorder"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                Manage AllOrder
              </Button>
            </NavLink>
            <NavLink
              to="/dashboard/manageallReview"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                Manage Review
              </Button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard/myorder"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                My Order
              </Button>
            </NavLink>
            <NavLink
              to="/dashboard/review"
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button variant="contained" sx={{ width: "80%" }}>
                Review
              </Button>
            </NavLink>
            <NavLink
              to=""
              style={{
                display: "block",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{ width: "80%" }}
              >
                Logout
              </Button>
            </NavLink>{" "}
          </>
        )}
        <NavLink
          to="/"
          style={{
            display: "block",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "7px",
          }}
        >
          <Button variant="contained" sx={{ width: "80%" }}>
            Home
          </Button>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {user?.displayName}'s Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
