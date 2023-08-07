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
server.use(express.static(Path.join(__dirname, 'public')))

server.get('/', async (req, res) => {
  // const ticketNo = Math.floor(Math.random() * 1000000000)
  // const response = await fetch(
  //   `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketNo}`
  // )
  //
  // // convert image to base64
  // const buffer = await response.arrayBuffer()
  // const base64Data = `data:image/png;base64,${Buffer.from(buffer).toString(
  //   'base64'
  // )}`

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
    img: '',
  }

  res.render('ticket', viewData)
})
