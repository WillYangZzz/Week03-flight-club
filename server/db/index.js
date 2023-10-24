import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where('passenger_id', passengerId).select()
}

export async function getMyTicketsByDob(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .select()
}

export async function countMyTicketsByDob(dob) {}

export async function countMyLostLuggage(dob) {}

export async function sumMyLostLuggageWeight(dob) {}

export async function getMyLostLuggageLocation(dob) {}
