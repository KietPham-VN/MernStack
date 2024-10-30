import express from 'express'
import userRouter from './routes/users.routers'
import databaseService from './services/database.services'

const app = express()
const port = 3000

databaseService.connect()

app.use(express.json())
app.use('/users', userRouter)
app.use((error, req, res, next) => {
  res.status(error.status).json(error)
})
app.listen(port, () => {
  console.log(`server backend is currently listening at port ${port}`)
})
