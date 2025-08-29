import { useState } from "react";
import { register as apiRegister } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para determinar fortaleza de la contraseña
  const passwordStrength = (pwd) => {
    if (pwd.length < 6) return { label: "Muy corta", color: "red" };
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(pwd))
      return { label: "Fuerte", color: "green" };
    if (/^(?=.*[a-z])(?=.*\d).{6,}$/.test(pwd)) return { label: "Media", color: "orange" };
    return { label: "Débil", color: "red" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("El usuario es obligatorio");
      return;
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("El correo no es válido");
      return;
    }

    if (form.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const data = await apiRegister({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (data?.id) {
        toast.success("✅ Usuario registrado correctamente");
        navigate("/login");
      } else {
        toast.error("❌ No se pudo registrar");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength(form.password);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Registro</h2>
      <input
        placeholder="Usuario"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Correo (opcional)"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      {form.password && (
        <p style={{ color: strength.color }}>
          Fortaleza: {strength.label}
        </p>
      )}
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creando cuenta..." : "Registrarse"}
      </button>
    </form>
  );
}
