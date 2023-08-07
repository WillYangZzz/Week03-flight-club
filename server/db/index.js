import knex from 'knex'
import knexfile from './knexfile.js'

const db = knex(knexfile.development)

export async function getMyTickets(passengerId) {
  // TODO: use where to filter tickets by passengerId
  return await db('tickets').select().where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
}

export async function countMyTicketsByDob(dob) {
}

export async function countMyLostLuggage(dob) {
}

export async function sumMyLostLuggageWeight(dob) {
}

export async function getMyLostLuggageLocation(dob) {
}
