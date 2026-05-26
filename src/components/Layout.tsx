import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const drawer = (
    <Box sx={{ bgcolor: "#0f172a", height: "100%", color: "#fff" }}>
      <Toolbar />
      <Divider />

      <List>
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/skills")}>
          <ListItemText primary="Skills" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/projects")}>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/trainings")}>
          <ListItemText primary="Training" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/certifications")}>
          <ListItemText primary="Certifications" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/education")}>
          <ListItemText primary="Education" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/work-experience")}>
          <ListItemText primary="Experience" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/resume")}>
          <ListItemText primary="Resume" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/personal-details")}>
          <ListItemText primary="Personal Details" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #0f172a, #1e3c72)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Animika Build Studio
          </Typography>

          <Button
            onClick={handleLogout}
            sx={{ color: "#fff", border: "1px solid #fff" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR (desktop) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0f172a",
            color: "#fff",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* SIDEBAR (mobile) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#0f172a",
            color: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
