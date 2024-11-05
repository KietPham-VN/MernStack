import express, { Request, Response } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const userRouter = express.Router()

userRouter.post('/register', registerValidator, wrapAsync(registerController))
/*
desc: login
path: users/login
method: POST
body: {
  email : string,
  password: string,
}
*/
userRouter.post('/login', loginValidator, wrapAsync(loginController))

/*
  desc: logout
  path: users/logout
  method: POST
  header: {
    Authorization: 'Bearer<access_token>'
  }
  bodfy: {
    refresh_token: string
  }
  */

userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, (req: Request, res: Response) => {
  res.json('success')
})
export default userRouter

// hàm next nếu không có nội dung thì sẽ đi đến hàm tiếp theo
// còn nếu có nội dung thì sẽ bay thẳng xuống errorHandler
//  next() xịn vì nó có thể chạy được trong cả đồng bộ và bất đồng bộ
// nhưng tay vẫn dùng throw vì server chỉ throw thôi server nó đéo next
// lỗi do mình tạo ra thì mới next được
