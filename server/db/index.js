import knex from 'knex'
import knexfile from './knexfile.js'

const db = knex(knexfile.development)

export async function getMyTickets(passengerId) {
  // TODO: use where to filter tickets by passengerId
  return await db('tickets').select().where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id') // OR this
    // .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .where('passengers.dob', dob)
}

export async function countMyTicketsByDob(dob) {
  const count = await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count('tickets.id as count')
    .first()

  return count

  // bad practice, don't do this
  // const tickets = await db('tickets')
  //   .join('passengers', 'tickets.passenger_id', 'passengers.id')
  //   .where('passengers.dob', dob)
  // return tickets.length
}

export async function countMyLostLuggage(dob) {}

export async function sumMyLostLuggageWeight(dob) {}

export async function getMyLostLuggageLocation(dob) {}

async function deleteAirplaneNo10() {
  return db('airplanes').where('id', 10).del()
}

deleteAirplaneNo10()
