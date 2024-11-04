import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const userRouter = express.Router()

userRouter.post('/register', registerValidator, wrapAsync(registerController))
/*
desc: login
path: /login
method: POST
body: {
  email : string,
  password: string,
}
*/
userRouter.post('/login', loginValidator, wrapAsync(loginController))

export default userRouter
// hàm next nếu không có nội dung thì sẽ đi đến hàm tiếp theo
// còn nếu có nội dung thì sẽ bay thẳng xuống errorHandler
//  next() xịn vì nó có thể chạy được trong cả đồng bộ và bất đồng bộ
// nhưng tay vẫn dùng throw vì server chỉ throw thôi server nó đéo next
// lỗi do mình tạo ra thì mới next được
