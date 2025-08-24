"use client";
import { useState } from "react";

export default function Form({ onAdd }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    participation: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newParticipant = await res.json();
      onAdd(newParticipant); // avisa o componente pai
      setForm({ firstName: "", lastName: "", participation: "" }); // limpa form
    } else {
      alert("Erro ao adicionar participante.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="border p-2 rounded w-full"
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="border p-2 rounded w-full"
      />
      <input
        name="participation"
        type="number"
        value={form.participation}
        onChange={handleChange}
        placeholder="Participation (%)"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
