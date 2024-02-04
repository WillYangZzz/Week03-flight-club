import express from 'express'
import { engine } from 'express-handlebars'

import * as Path from 'node:path/posix'
import * as URL from 'node:url'

import { getTicket } from './db/index'

const server = express()
export default server

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.engine('hbs', engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.join(__dirname, 'views'))
server.use(express.static(Path.join(__dirname, '..', 'public')))

server.get('/:ticket', async (req, res) => {
  // TODO: call db function to get ticket data

  const ticketNo = req.params.ticket || '1234567890'
  const ticketData = await getTicket(ticketNo)

  res.render('ticket', ticketData)
})
