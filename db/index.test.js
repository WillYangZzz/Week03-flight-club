import { expect, test, beforeAll, beforeEach } from 'vitest'
import knex from 'knex'
import knexfile from './knexfile.js'
import * as flightDb from './index.js'

const db = knex(knexfile.testing)

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

test('1. List all my tickets by `id` ', async () => {
  const myTickets = await flightDb.getMyTickets(1)
  expect(myTickets).toHaveLength(5)
  expect(myTickets[0]).toHaveProperty('passenger_id')
})

test('2. List all my tickets by `dob`', async () => {
  const myTickets = await flightDb.getMyTicketsByDob('2512')
  expect(myTickets).toHaveLength(5)
  expect(myTickets[0]).toHaveProperty('passenger_id')
})

test('3. Count all my tickets given `passenger.dob', async () => {
  const actual = await flightDb.countMyTicketsByDob('2512')
  expect(actual.count).toBe(5)
})
