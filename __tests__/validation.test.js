import { participantSchema } from "../lib/validation";


describe("participantSchema", () => {
it("valida dados corretos", () => {
const data = {
firstName: "Ana",
lastName: "Lima",
participation: 12,
};
expect(() => participantSchema.parse(data)).not.toThrow();
});


it("reprova participation > 100", () => {
const data = { firstName: "Ana", lastName: "Lima", participation: 101 };
expect(() => participantSchema.parse(data)).toThrow();
});
});