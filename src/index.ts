import express from 'express'
import userRouter from './routes/users.routers'
import databaseService from './services/database.services'

const app = express()
const port = 3000

databaseService.connect()

app.use(express.json())
app.use('/users', userRouter)
app.listen(port, () => {
  console.log(`server backend listening at port ${port}`)
})
