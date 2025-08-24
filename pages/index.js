import Head from 'next/head'
import HeaderBar from '../components/HeaderBar'
import Table from '../components/Table'
import DonutChart from '../components/DonutChart'
import { useState, useEffect } from 'react'

export default function Home() {
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    fetch('/api/participants')
      .then((r) => r.json())
      .then((data) => setParticipants(data.data ?? data))
      .catch((e) => console.error(e))
  }, [])

  const add = (p) => setParticipants((s) => [...s, p])
  const remove = (id) => setParticipants((s) => s.filter((i) => i.id !== id))

  async function handleHeaderSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      firstName: form.get('firstName')?.trim(),
      lastName: form.get('lastName')?.trim(),
      participation: Number(form.get('participation')),
    }

    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json()
      if (!res.ok) return alert(body.error || 'Erro')
      add(body.data ?? body)
      e.target.reset()
    } catch (err) {
      console.error(err)
      alert('Erro de rede')
    }
  }

  return (
    <>
      <Head>
        <title>Cotabox Challenge</title>
      </Head>

      <HeaderBar onSubmit={handleHeaderSubmit} />

      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">DATA</h2>
          <p className="text-center text-gray-500 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="card mb-6">
                <div className="flex justify-between gap-6">
                  <div>
                    <div className="stat-title">Total participants</div>
                    <div className="stat-value">{participants.length}</div>
                  </div>
                  <div>
                    <div className="stat-title">Remaining %</div>
                    <div className="stat-value">{Math.max(0, 100 - participants.reduce((s,p)=>s+Number(p.participation||0),0))}%</div>
                  </div>
                </div>
              </div>

              <Table participants={participants} onRemove={remove} />
            </div>
            <div className="flex items-center justify-center">
              <DonutChart rows={participants} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
