import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where({ passenger_id: passengerId })
}

export async function getMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'passenger_id', 'passengers.id')
    .where({ dob: dob })
}

export async function countMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count('tickets.id as count')
    .first()
}

export async function countMyLostLuggage(dob) {
  return db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .count('luggage.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .sum('luggage.id as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('airports', 'luggage.located_airport_id', 'airports.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .first()
}

export async function getTicket(ticketId) {
  return db('tickets')
    .where('tickets.id', ticketId)
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join(
      'airports as departureAirports',
      'departureAirports.id',
      'tickets.departure_airport_id'
    )
    .join(
      'airports as arrivalAirports',
      'arrivalAirports.id',
      'tickets.arrival_airport_id'
    )
    .select(
      'departureAirports.name as departureName',
      'arrivalAirports.name as arrivalName',
      'fullName',
      'flight_number',
      'departure_time',
      'arrival_time',
      'tickets.id'
    )
    .first()
}
