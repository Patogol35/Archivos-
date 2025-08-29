import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

// MUI
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

export default function ProductoCard({ producto }) {
  const { isAuthenticated } = useAuth();
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const onAdd = async () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: "Debes iniciar sesión para agregar productos 🛒",
        severity: "warning",
      });
      navigate("/login");
      return;
    }

    try {
      await agregarAlCarrito(producto.id, 1);
      setSnackbar({
        open: true,
        message: `"${producto.nombre}" agregado al carrito ✅`,
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: e.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
        {producto.imagen_url && (
          <Box
            component="img"
            src={producto.imagen_url}
            alt={producto.nombre}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}
        <CardContent>
          <Typography variant="h6">{producto.nombre}</Typography>
          <Typography variant="body2" color="text.secondary">
            {producto.descripcion}
          </Typography>
          <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
            ${producto.precio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth onClick={onAdd}>
            Agregar al carrito
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
