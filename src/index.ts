import express from 'express'
import userRouter from './users.routers'
// dùng express tạo server (app)
const app = express()
const port = 3000 // 3000 cho backend 4000 cho frontend
//app dùng userRouter
app.use('/users', userRouter)
// server mở ở port: 3000
// http://localhost:3000
app.listen(port, () => {
  console.log(`server backend listening at port ${port}`)
})
