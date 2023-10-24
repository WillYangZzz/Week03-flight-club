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
  return db('tickets')
    .join('passengers', 'passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count('passengers.dob as count', dob)
    .first()
}

export async function countMyLostLuggage(dob) {
  return db('luggage')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .count('luggage.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {}

export async function getMyLostLuggageLocation(dob) {}
