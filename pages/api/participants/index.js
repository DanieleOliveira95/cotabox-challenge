import { safeParseParticipant } from "../../../lib/validation";


// Armazena em memória durante o processo do servidor
let participants = [
{ id: "1", firstName: "Carlos", lastName: "Moura", participation: 5 },
{ id: "2", firstName: "Fernanda", lastName: "Oliveira", participation: 15 },
{ id: "3", firstName: "Hugo", lastName: "Silva", participation: 20 },
{ id: "4", firstName: "Eliza", lastName: "Souza", participation: 20 },
{ id: "5", firstName: "Anderson", lastName: "Santos", participation: 40 },
];


export default function handler(req, res) {
const { method } = req;


if (method === "GET") {
return res.status(200).json({ data: participants });
}


if (method === "POST") {
	const result = safeParseParticipant(req.body ?? {});
	if (!result.success) {
		const msg = result.error.issues.map((i) => i.message).join('; ');
		return res.status(400).json({ error: msg });
	}

	const payload = result.data;

	const currentTotal = participants.reduce((s, p) => s + Number(p.participation || 0), 0);
	if (currentTotal + Number(payload.participation) > 100) {
		return res.status(400).json({ error: 'A soma das participações não pode ultrapassar 100%.' });
	}

	const id = String(Date.now());
	const created = { id, ...payload };
	participants = [...participants, created];
	return res.status(201).json({ data: created });
}


res.setHeader("Allow", ["GET", "POST"]);
return res.status(405).json({ error: `Method ${method} Not Allowed` });
}