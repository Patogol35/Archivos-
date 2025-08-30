import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

function ProductoCard({ producto, agregarAlCarrito }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={producto.imagen}
        alt={producto.nombre}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>{producto.nombre}</Typography>
        <Typography variant="body2" color="text.secondary">{producto.descripcion}</Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${producto.precio}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: "secondary.main", "&:hover": { bgcolor: "secondary.dark" } }}
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductoCard;
