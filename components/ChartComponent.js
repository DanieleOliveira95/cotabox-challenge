function getPercentSlices(items) {
  const total = items.reduce((s, p) => s + Number(p.participation || 0), 0)
  return items.map((p) => ({ label: `${p.firstName} ${p.lastName}`, value: Number(p.participation || 0), percent: total ? (Number(p.participation || 0) / total) * 100 : 0 }))
}

export default function ChartComponent({ participants = [] }) {
  const slices = getPercentSlices(participants)

  // Simple textual fallback plus a simple colored list
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-2">Distribution</h2>
      {participants.length === 0 ? (
        <p className="text-sm text-gray-500">No participants yet</p>
      ) : (
        <ul className="space-y-2">
          {slices.map((s, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 inline-block rounded-full`} style={{ background: [`#ef4444`, `#f97316`, `#f59e0b`, `#84cc16`, `#06b6d4`][i % 5] }} />
                <span>{s.label}</span>
              </div>
              <div className="text-right">
                <div className="text-sm">{s.value}%</div>
                <div className="text-xs text-gray-500">{s.percent.toFixed(1)}%</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
