import * as Path from 'node:path/posix'
import * as Url from 'node:url'
import express from 'express'
import engine from 'express-handlebars'

const __filename = Url.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()
export default server

const publicFolder = Path.join(__dirname, 'public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))
server.engine('hbs', engine({ extname: 'hbs' }))

server.set('view engine', 'hbs')
server.set('views', './views')

server.get('/', async (req, res) => {})
