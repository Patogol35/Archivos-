import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const { access } = useAuth();
  const navigate = useNavigate();

  const agregar = () => {
    if (!access) {
      toast.warn("Debes iniciar sesión para agregar productos 🛒");
      navigate("/login");
      return;
    }
    agregarAlCarrito(producto.id, 1);
    toast.success(`"${producto.nombre}" agregado al carrito ✅`);
  };

  return (
    <div className="producto-card">
      <img
        src={producto.imagen || "https://via.placeholder.com/150"}
        alt={producto.nombre}
      />
      <h4>{producto.nombre}</h4>
      <p>${Number(producto.precio).toFixed(2)}</p>
      <button onClick={agregar}>Agregar al carrito</button>
    </div>
  );
}
