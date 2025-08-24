import { useState } from 'react'

export default function Form({ onCreated }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', participation: '' })
  const [loading, setLoading] = useState(false)

  function change(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const body = await res.json()
      if (!res.ok) {
        alert(body.error || 'Erro ao criar participante')
        return
      }

      onCreated(body.data ?? body)
      setForm({ firstName: '', lastName: '', participation: '' })
    } catch (err) {
      console.error(err)
      alert('Erro de rede')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input name="firstName" value={form.firstName} onChange={change} placeholder="First Name" className="border p-2 rounded w-full" required />
        <input name="lastName" value={form.lastName} onChange={change} placeholder="Last Name" className="border p-2 rounded w-full" required />
        <input name="participation" type="number" value={form.participation} onChange={change} placeholder="Participation (%)" className="border p-2 rounded w-full" required min="1" max="100" />
      </div>
      <div>
        <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Add Participant'}</button>
      </div>
    </form>
  )
}
