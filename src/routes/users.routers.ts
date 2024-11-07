import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  verifyEmailTokenController
} from '~/controllers/users.controllers'
import express from 'express'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
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

userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
/*
  desc: email
  khi người dùng nhấn vào link trong email của họ thì evt sẽ được gởi lên server be
  thông qua req.query
  path: users/verify-email/?email_verify_token=string
  method: GET
*/
userRouter.get(
  '/verify-email/', //
  emailVerifyTokenValidator,
  wrapAsync(verifyEmailTokenController)
)
/* desc: resend email
người dùng sẽ dùng chức năng này khi học làm mất email
hoặc không nhận được mail của mình
path: users/resend-email
phải đăng nhập thì mới cho verify
header: {
  Authorization: 'Bearer<access_token>'
}
method: POST
*/
userRouter.post(
  '/resend-verify-email',
  accessTokenValidator, //
  wrapAsync(resendVerifyEmailController)
)

/*
  desc: forgot password
  khi quên mật khẩu thì dùng chức năng này
  path: users/forgot-password
  method: POST
  body:{
    email: string
  }
*/

userRouter.post(
  '/forgot-password',
  forgotPasswordValidator, //
  wrapAsync(forgotPasswordController)
)
export default userRouter

// hàm next nếu không có nội dung thì sẽ đi đến hàm tiếp theo
// còn nếu có nội dung thì sẽ bay thẳng xuống errorHandler
//  next() xịn vì nó có thể chạy được trong cả đồng bộ và bất đồng bộ
// nhưng tay vẫn dùng throw vì server chỉ throw thôi server nó đéo next
// lỗi do mình tạo ra thì mới next được

//! làm thêm 1 route /mes
/*
  path: users/me
  method: POST
  header: {
    Authorization: 'Bearer<access_token>'
  }
  lấy về tất cả thông tin người dùng mà không đưa password, role
 */

/*
  làm thêm tính năng update bình thường thôi nhé không chơi với password
*/
