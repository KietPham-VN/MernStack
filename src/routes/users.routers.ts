import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
// dựng route
// userRouter
const userRouter = express.Router()

// những cái hàm nhận vào url rồi xử lý request và response được gọi là handler
// handler nằm ở giữa gọi là middleware có next
// còn ở cuối thì được gọi là controller không có next

// setup middleware cho userRouter
// khi có use là mình đang có 1 middleware toàn cục

// do next() không làm dừng chương trình nên ta nên có thói quen dùng return next()
userRouter.post('/login', loginValidator, loginController)
/*
  desc: Register a new user
  path: /register
  method: POST
  body: {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    date_of_birth: string, // có cấu trúc là ISO 8601

  }
 */
userRouter.post('/register', registerValidator, registerController)
export default userRouter
