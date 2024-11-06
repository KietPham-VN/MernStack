import express from 'express'
import userRouter from './routes/users.routers'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const PORT = 3000

databaseService.connect()

app.use(express.json())
app.use('/users', userRouter)
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`server backend is currently listening at PORT ${PORT}`)
})
