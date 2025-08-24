import Head from 'next/head'
import dynamic from 'next/dynamic'
import Form from '../components/Form'
import Table from '../components/Table'
import ChartComponent from '../components/ChartComponent'
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

  return (
    <>
      <Head>
        <title>Cotabox Challenge</title>
      </Head>
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cotabox Challenge</h1>
        <Form onCreated={add} />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Table participants={participants} onRemove={remove} />
          <ChartComponent participants={participants} />
        </div>
      </main>
    </>
  )
}
