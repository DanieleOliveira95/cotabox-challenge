export default function Table({ participants = [], onRemove }) {
  const total = participants.reduce((s, p) => s + Number(p.participation || 0), 0)

  async function handleRemove(id) {
    // rota de remoção não implementada no PRD — apenas remove localmente se onRemove fornecido
    if (onRemove) onRemove(id)
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-2">Participants ({participants.length})</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-right">Participation</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="py-2">{p.firstName} {p.lastName}</td>
              <td className="py-2 text-right">{p.participation}%</td>
              <td className="py-2 text-right"><button onClick={() => handleRemove(p.id)} className="text-red-600">Remove</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t font-semibold">
            <td className="py-2">Total</td>
            <td className="py-2 text-right">{total}%</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
