import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
}

export async function countMyTicketsByDob(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count('tickets.id as count')
    .first()
}

export async function countMyLostLuggage(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .count('luggage.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .sum('weight as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .join('airports', 'luggage.located_airport_id', 'airports.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    // .where('luggage.located_airport')
    .select('airports.phone', 'airports.email')
    .first()
}
