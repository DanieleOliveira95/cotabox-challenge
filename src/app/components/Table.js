"use client";
import { useEffect, useState } from "react";

export default function Table({ refresh }) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4000/participants");
      const data = await res.json();
      setParticipants(data);
    }
    fetchData();
  }, [refresh]); // recarrega sempre que alguém adiciona

  return (
    <table className="border w-full mt-4">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Participation</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((p) => (
          <tr key={p.id}>
            <td className="border p-2">{p.firstName} {p.lastName}</td>
            <td className="border p-2">{p.participation}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
