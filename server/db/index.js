import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return db('passengers')
    .join('tickets', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
}

export async function countMyTicketsByDob(dob) {
  return db('passengers')
    .join('tickets', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count('tickets.id as count')
    .first()
}

export async function countMyLostLuggage(dob) {
  return db('luggage')
    .join('tickets', 'ticket_id', 'tickets.id')
    .join('passengers', 'passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .count('luggage.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return db('luggage')
    .join('tickets', 'ticket_id', 'tickets.id')
    .join('passengers', 'passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .sum('weight as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return db('luggage')
    .join('tickets', 'ticket_id', 'tickets.id')
    .join('passengers', 'passenger_id', 'passengers.id')
    .join('airports', 'located_airport_id', 'airports.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .select('airports.phone', 'airports.email')
    .first()
}
export async function getTicket(ticketNumber) {
  return await db('luggage')
    .join('tickets', 'ticket_id', 'tickets.id')
    .join('passengers', 'passenger_id', 'passengers.id')
    .join('airports', 'located_airport_id', 'airports.id')
    .where('tickets.id', ticketNumber)
    .select(
      'tickets.id as ticketId',
      'tickets.flight_number as flightNumber',
      'passengers.fullname as fullName'
    )
    .first()
  // .join('passengers', 'passenger_id', 'passengers.id')
  // .join('airports', 'located_airport_id', 'airports.id')
}

// getTicket(43)
