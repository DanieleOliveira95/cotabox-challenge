import { createMocks } from 'node-mocks-http'
import handler from '../pages/api/participants/index'
import { clearAll, seedIfEmpty } from '../lib/sqlite'

const initial = [
  { id: '1', firstName: 'Carlos', lastName: 'Moura', participation: 5 },
  { id: '2', firstName: 'Fernanda', lastName: 'Oliveira', participation: 15 },
]

describe('API /api/participants', () => {
  beforeEach(async () => {
    await clearAll()
    await seedIfEmpty(initial)
  })

  it('GET retorna lista inicial', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    const json = JSON.parse(res._getData())
    expect(Array.isArray(json.data)).toBe(true)
    expect(json.data.length).toBeGreaterThan(0)
  })

  it('POST cria participante válido', async () => {
    const payload = { firstName: 'Test', lastName: 'User', participation: 1 }
    const { req, res } = createMocks({ method: 'POST', body: payload })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
    const json = JSON.parse(res._getData())
    expect(json.data).toMatchObject({ firstName: 'Test', lastName: 'User' })
  })

  it('POST valida soma > 100', async () => {
    // first, get current participants
    const { req: req1, res: res1 } = createMocks({ method: 'GET' })
    await handler(req1, res1)
    const current = JSON.parse(res1._getData()).data
    const total = current.reduce((s, p) => s + Number(p.participation || 0), 0)

    const payload = { firstName: 'Overflow', lastName: 'User', participation: 100 - total + 1 }
    const { req, res } = createMocks({ method: 'POST', body: payload })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    const json = JSON.parse(res._getData())
    expect(json.error).toMatch(/soma das participa/i)
  })

  it('POST valida campos obrigatórios', async () => {
    const { req, res } = createMocks({ method: 'POST', body: { firstName: '', lastName: '', participation: '' } })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    const json = JSON.parse(res._getData())
    expect(json.error).toBeTruthy()
  })
})
