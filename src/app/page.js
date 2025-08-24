import Form from "../components/Form";
import Table from "../components/Table";
import ChartComponent from "../components/ChartComponent"; // novo import
import { useState, useEffect } from "react";

export default function HomePage() {
  const [items, setItems] = useState([]);

  // Carregar dados do backend (exemplo)
  useEffect(() => {
    fetch("/api/participants")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddItem = async (newItem) => {
  // validação no front
  if (!newItem || newItem.trim() === "") {
    alert("Digite um item válido.");
    return;
  }

  const res = await fetch("/api/participants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item: newItem }),
  });

  if (res.ok) {
    setItems((prev) => [...prev, newItem]);
  } else {
    const error = await res.json();
    alert(error.error || "Erro ao salvar item.");
  }
};

    // atualiza a lista local
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Itens</h1>
      <Form onAddItem={handleAddItem} />
      <Table items={items} />
      <ChartComponent items={items} /> {/* aqui entra o gráfico */}
    </main>
  );
}
