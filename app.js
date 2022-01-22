require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000

app.use(cors());
app.use(express.json());
app.use(bodyParser.json(), cors())
app.options('*', cors());

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.get('/', (req, res) => {
  res.send('🟢 Stripe working good bro.')
})

app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create(req.body);
  res.send(paymentIntent)
})

app.listen(PORT, () => console.log('Launched on port ' + PORT))