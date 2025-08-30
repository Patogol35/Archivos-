import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Avatar } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" align="center" gutterBottom>Iniciar sesión</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Contraseña" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
