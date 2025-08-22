import { z } from "zod";


export const participantSchema = z.object({
firstName: z.string().trim().min(1, "First name é obrigatório"),
lastName: z.string().trim().min(1, "Last name é obrigatório"),
participation: z
.number({ invalid_type_error: "Participation deve ser um número" })
.int("Participation deve ser inteiro")
.min(0, "Mínimo 0")
.max(100, "Máximo 100"),
});


export function safeParseParticipant(body) {
// Converte participation de string para número se vier como texto
const normalized = {
...body,
participation:
typeof body.participation === "string"
? Number(body.participation)
: body.participation,
};
return participantSchema.safeParse(normalized);
}