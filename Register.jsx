const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.username.trim()) {
    toast.error("El usuario es obligatorio");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(form.email) && form.email !== "") {
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
