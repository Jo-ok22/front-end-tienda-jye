import { useState } from "react";
//import { api } from "../api/api";

export default function FormProducto() {
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "", imagen: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.createProducto(form);
    alert("Producto creado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Producto</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="precio" placeholder="Precio" onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input name="imagen" placeholder="Nombre archivo imagen" onChange={handleChange} />
      <button type="submit">Crear</button>
    </form>
  );
}
