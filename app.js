require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4000
let wherebyUrl = 'https://api.whereby.dev/v1'

app.use(cors());
app.use(express.json());
app.use(bodyParser.json(), cors())
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/createRoom', async (req, res) => {
  await axios.post(`${wherebyUrl}/meetings`, JSON.stringify(req.body), {
    headers: {
      Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      res.send({
        status: 200,
        meeting: response.data
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        status: 400,
        message: 'Cannot create your whereby meeting',
        error: err
      })
    })
})

app.listen(PORT)