export default function Table({ participants = [], onRemove }) {
  const total = participants.reduce((s, p) => s + Number(p.participation || 0), 0)

  async function handleRemove(id) {
    // rota de remoção não implementada no PRD — apenas remove localmente se onRemove fornecido
    if (onRemove) onRemove(id)
  }

  return (
    <div className="card max-w-2xl">
      <h2 className="font-semibold mb-4 text-lg text-center">Participants ({participants.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 border-r">#</th>
              <th className="text-left px-4 py-3 border-r">First name</th>
              <th className="text-left px-4 py-3 border-r">Last name</th>
              <th className="text-right px-4 py-3">Participation</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {participants.map((p, idx) => (
              <tr key={p.id} className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-4 py-2 border-r">{idx + 1}</td>
                <td className="px-4 py-2 border-r">{p.firstName}</td>
                <td className="px-4 py-2 border-r">{p.lastName}</td>
                <td className="px-4 py-2 text-right">{p.participation}%</td>
                <td className="px-4 py-2 text-right"><button onClick={() => handleRemove(p.id)} className="text-red-600">Remove</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t font-semibold bg-gray-50">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-right" colSpan={3}>{total}%</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
