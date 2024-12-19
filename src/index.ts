import express from 'express'
import userRouter from './routes/users.routers'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/medias.routers'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.routers'
import brandsRouter from './routes/brand.routers'
import categoriesRouter from './routes/category.routers'

const app = express()
const PORT = 3000

databaseService.connect()
initFolder()
app.use(express.json())
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use('/static', staticRouter)
app.use('/brands', brandsRouter)
app.use('/categories', categoriesRouter)
app.use(defaultErrorHandler)
app.listen(PORT, () => {
  console.log(`server backend is currently listening at PORT ${PORT}`)
})
