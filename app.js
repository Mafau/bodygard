import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import routes from './src/routes'
import errorHandler from './src/helpers/errorHandler'

const PORT = process.env.PORT || '8080'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database')
  })

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  console.log('Auth server run')
})
