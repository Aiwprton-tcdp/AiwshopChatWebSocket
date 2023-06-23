import { createServer } from 'http'
import { Server } from 'socket.io'
import Redis from 'ioredis'

const port = 3000
const redis = new Redis()
const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

redis.psubscribe(['*'], function(err, count) {})

redis.on('pmessage', function(subscribe, channel, message) {
  let data = JSON.parse(message)
  console.log(data)
  console.log(`message received. aiwprton_shop:${data.event}`)
  io.emit(`aiwprton_shop:${data.event}`, data.data)
})

httpServer.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
