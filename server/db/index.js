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
    .count('tickets.id as count')
    .first()
}

export async function countMyLostLuggage(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .count('tickets.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .sum('luggage.weight as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .join('airports', 'luggage.located_airport_id', 'airports.id')
    .where('luggage.is_lost', true)
    .where('passengers.dob', dob)
    .select('airports.email', 'airports.phone')
    .first()
}

export async function getTicket(id) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('airplanes', 'tickets.airplane_id', 'airplanes.id')
    .join('airports as departure', 'tickets.departure_airport_id', 'departure.id')
    .join('airports as arrival', 'tickets.arrival_airport_id', 'arrival.id')
    .where('tickets.id', id)
    .select('passengers.fullname as name', 'airplanes.model as carrier', 'departure.name as from',
     'arrival.name as to', 'tickets.flight_number as flight', 'tickets.id as ticketNo',
      'tickets.departure_time', 'tickets.arrival_time')
    .first()
}
