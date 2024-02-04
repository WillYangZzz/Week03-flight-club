import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where({ passenger_id: passengerId })
}

export async function getMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'passenger_id', 'passenger.id')
    .where({ dob: dob })
}

export async function countMyTicketsByDob(dob) {}

export async function countMyLostLuggage(dob) {}

export async function sumMyLostLuggageWeight(dob) {}

export async function getMyLostLuggageLocation(dob) {}

export async function getTicket(passengerId) {}
