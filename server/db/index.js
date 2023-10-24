import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'passenger_id', 'passengers.id')
    .where('dob', dob)
}

export async function countMyTicketsByDob(dob) {
  const count = await db('tickets')
    .join('passengers', 'passenger_id', 'passengers.id')
    .count('dob as count')
    .first()
  return count
}

export async function countMyLostLuggage(dob) {}

export async function sumMyLostLuggageWeight(dob) {}

export async function getMyLostLuggageLocation(dob) {}
