import express from 'express'
import {json} from 'body-parser'

const app = express()
app.use(json())

const authPort = 3000

app.get('api/users/currentuser', (req, res) => {
  res.send('hi there!')
})

app.listen(authPort, () => {
  console.log(`Listening on port ${authPort}!!`)
})