import { toast } from "react-toastify";

// ...
try {
  const data = await apiLogin(form);
  if (data?.access && data?.refresh) {
    login(data.access, data.refresh);
    toast.success("Bienvenido 👋");
    navigate("/");
  } else {
    toast.error("Credenciales inválidas");
  }
} catch (e) {
  toast.error(e.message);
} finally {
  setLoading(false);
}
