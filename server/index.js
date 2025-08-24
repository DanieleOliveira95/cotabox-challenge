const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Simulando banco de dados com array
let participants = [
  { id: 1, firstName: "John", lastName: "Doe", participation: 30 },
  { id: 2, firstName: "Jane", lastName: "Smith", participation: 70 },
];

// GET - listar participantes
app.get("/participants", (req, res) => {
  res.json(participants);
});

// POST - adicionar participante
app.post("/participants", (req, res) => {
  const { firstName, lastName, participation } = req.body;

  if (!firstName || !lastName || !participation) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const newParticipant = {
    id: participants.length + 1,
    firstName,
    lastName,
    participation: Number(participation),
  };

  participants.push(newParticipant);
  res.status(201).json(newParticipant);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
