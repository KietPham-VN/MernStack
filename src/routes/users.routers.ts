import { UpdateMeReqBody } from './../models/requests/users.requests'
import {
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyEmailTokenController,
  VerifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import express from 'express'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
import { filterMiddleware } from '~/middlewares/common.middlewares'

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

// hàm next nếu không có nội dung thì sẽ đi đến hàm tiếp theo
// còn nếu có nội dung thì sẽ bay thẳng xuống errorHandler
//  next() xịn vì nó có thể chạy được trong cả đồng bộ và bất đồng bộ
// nhưng tay vẫn dùng throw vì server chỉ throw thôi server nó đéo next
// lỗi do mình tạo ra thì mới next được
/*
des: verify forgot password token
kiểm tra token có còn hiệu lực không
path: 'users/verify-forgot-password'
method: POST
body: {
  forgot_password_token: string
}
*/
userRouter.post(
  '/verify-forgot-password',
  forgotPasswordTokenValidator, // kiểm tra token
  wrapAsync(VerifyForgotPasswordTokenController) // xử lý logic
)
/*
  rest password
  path: 'users/reset-password'
  method: POST
  body: {
    forgot_password_token: string
    password: string
    confirm_password: string
  }
*/
userRouter.post(
  '/reset-password',
  forgotPasswordTokenValidator, // kiểm tra token
  resetPasswordValidator, // kiểm tra password, confirm_password
  wrapAsync(resetPasswordController) // xử lý logic cập nhật reset
)

//! làm thêm 1 route /me
/*
des: get profile của user
path: '/me'
method: post
Header: {
  Authorization: Bearer<access_token>
}

*/
userRouter.post(
  '/me',
  accessTokenValidator, //
  wrapAsync(getMeController)
)

/*
des: update profile của user
path: '/me'
method: patch
Header: {Authorization: Bearer <access_token>}
body: {
  name?: string
  date_of_birth?: Date
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional}
  */
userRouter.patch(
  '/me',
  // cần 1 cái hàm để sàn lọc req.body
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'username',
    'cover_photo'
  ]),
  accessTokenValidator, // kiểm tra access_token và biết ai muốn cập nhật
  updateMeValidator, // kiểm tra các trường dữ liệu mà người dùng muốn cập nhật có hợp lệ không?
  wrapAsync(updateMeController) // tiến hành cập nhật
)

/*
  làm thêm tính năng update bình thường thôi nhé không chơi với password
  */

export default userRouter
