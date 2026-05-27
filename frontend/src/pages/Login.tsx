import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login Failed!!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        px: 2,
      }}
    >
      {/* MAIN CARD */}
      <Card
        sx={{
          width: 420,
          borderRadius: 4,
          p: 2,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <CardContent>
          {/* HEADER */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Animika Das
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Portfolio Management System • React + Laravel
            </Typography>
          </Box>

          {/* EMAIL */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              color: "#fff",
              background: "linear-gradient(135deg, #0f172a, #334155)",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.35)",
              transition: "0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Sign In
          </Button>

          {/* DIVIDER TEXT */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
          >
            Don’t have an account?
          </Typography>

          {/* REGISTER */}
          <Button
            fullWidth
            component={Link}
            to="/register"
            sx={{
              mt: 1,
              textTransform: "none",
              fontWeight: 600,
              color: "#0f172a",
              "&:hover": {
                background: "#f1f5f9",
              },
            }}
          >
            Create Account
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
