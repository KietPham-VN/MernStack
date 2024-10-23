import express from 'express'
import userRouter from './routes/users.routers'
import databaseService from './services/database.services'

// dùng express tạo server (app)
const app = express()
const port = 3000 // 3000 cho backend 4000 cho frontend
databaseService.connect() // kết nối đến database
app.use(express.json()) // server dùng middleware biến đổi các chuỗi json được gởi lên thành object
//app dùng userRouter
app.use('/users', userRouter)
// server mở ở port: 3000
// http://localhost:3000
app.listen(port, () => {
  console.log(`server backend listening at port ${port}`)
})
