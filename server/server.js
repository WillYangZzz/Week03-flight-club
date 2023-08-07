import express from 'express'
import { engine } from 'express-handlebars'

import * as Path from 'node:path/posix'
import * as URL from 'node:url'

const server = express()
export default server

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.engine('hbs', engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.join(__dirname, 'views'))
server.use(express.static(Path.join(__dirname, '..', 'public')))

async function getQrImage(ticketNo) {
  const response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketNo}`
  )

  // convert image to base64
  const buffer = await response.arrayBuffer()
  return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
}

server.get('/:ticket', async (req, res) => {
  // TODO: call db function to get ticket data

  const ticketNo = req.params.ticket || '1234567890'
  const base64Data = await getQrImage(ticketNo)

  const viewData = {
    name: 'Jenny Rosen',
    from: 'SYD',
    to: 'LAX',
    flight: '34',
    date: '05 Aug 2020',
    seat: '14B',
    class: 'Business',
    ticketNo: '10',
    gate: '22',
    departure: '09 Aug 2020 10:00',
    arrival: '10 Aug 2020 17:00',
    img: base64Data,
  }

  res.render('ticket', viewData)
})
