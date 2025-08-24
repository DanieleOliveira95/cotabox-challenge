"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrando os módulos que vamos usar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartComponent({ items }) {
  // Preparar os dados para o gráfico
  const data = {
    labels: items.map((_, i) => `Item ${i + 1}`), // ex.: Item 1, Item 2...
    datasets: [
      {
        label: "Quantidade de caracteres",
        data: items.map((item) => item.length), // pega o tamanho do texto de cada item
        backgroundColor: "rgba(59, 130, 246, 0.6)", // azul Tailwind
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Dados dos Itens (exemplo)" },
    },
  };

  return (
    <div className="mt-6">
      <Bar data={data} options={options} />
    </div>
  );
}
