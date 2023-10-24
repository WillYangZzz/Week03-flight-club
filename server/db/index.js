import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
}

export async function countMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count({ count: 'tickets.id' })
    .first()
}

export async function countMyLostLuggage(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'tickets.id', 'luggage.ticket_id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .count({ count: 'tickets.id' })
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'tickets.id', 'luggage.ticket_id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .sum({ sum: 'luggage.weight' })
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'tickets.id', 'luggage.ticket_id')
    .join('airports', 'airports.id', 'luggage.located_airport_id')
    .select('airports.phone', 'airports.email')
    .where('is_lost', true)
    .where('passengers.dob', dob)
    .first()
}
