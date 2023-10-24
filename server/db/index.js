import db from './connection.js'

export async function getMyTickets(passengerId) {
  return await db('tickets').where({ passenger_id: passengerId })
}

export async function getMyTicketsByDob(dob) {}

export async function countMyTicketsByDob(dob) {}

export async function countMyLostLuggage(dob) {}

export async function sumMyLostLuggageWeight(dob) {}

export async function getMyLostLuggageLocation(dob) {}
