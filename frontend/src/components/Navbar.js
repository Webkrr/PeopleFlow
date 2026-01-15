import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const isMobile = useMediaQuery("(max-width:1000px)");

  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  // ✅ Handle Login state reactively when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("EMSusername");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const menuLinks = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Employees", to: "/employees" },
    { label: "Departments", to: "/departments" },
    { label: "Profile", to: "/profile" },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#3f51b5",
        height: "100%",
        color: "white",
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <List>
        {menuLinks.map((link) => (
          <ListItem
            button
            key={link.to}
            component={Link}
            to={link.to}
            selected={isActive(link.to)}
          >
            <ListItemText
              primary={link.label}
              sx={{
                color: isActive(link.to) ? "#ff9800" : "white",
              }}
            />
          </ListItem>
        ))}
        <ListItem button onClick={isLoggedIn ? handleLogout : undefined}>
          <ListItemText
            primary={isLoggedIn ? "Logout" : "Login"}
            sx={{
              color: isLoggedIn
                ? "red"
                : isActive("/login")
                ? "#ff9800"
                : "white",
            }}
            component={Link}
            to={isLoggedIn ? "/" : "/login"}
          />
        </ListItem>
        {!isLoggedIn && (
          <ListItem button component={Link} to="/register">
            <ListItemText
              primary="Register"
              sx={{
                color: isActive("/register") ? "#ff9800" : "white",
              }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3f51b5", padding: "0.5rem 0" }}
      >
        <Toolbar>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            Employee Management System
          </Typography>

          {/* Mobile Drawer Button */}
          {isMobile ? (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            // Desktop Navigation
            <Box sx={{ display: "flex", gap: "1rem" }}>
              {menuLinks.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: isActive(link.to) ? "#ff9800" : "inherit",
                  }}
                >
                  {link.label}
                </Button>
              ))}
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  sx={{ fontSize: "1rem", fontWeight: 500, color: "red" }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: isActive("/login") ? "#ff9800" : "inherit",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: isActive("/register") ? "#ff9800" : "inherit",
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
