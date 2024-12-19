import { UpdateMeReqBody } from './../models/requests/users.requests'
import {
  changePasswordController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
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
  changePasswordValidator,
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
userRouter.post('/login', loginValidator, wrapAsync(loginController))
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
userRouter.get(
  '/verify-email/', //
  emailVerifyTokenValidator,
  wrapAsync(verifyEmailTokenController)
)
userRouter.post(
  '/resend-verify-email',
  accessTokenValidator, //
  wrapAsync(resendVerifyEmailController)
)
userRouter.post(
  '/forgot-password',
  forgotPasswordValidator, //
  wrapAsync(forgotPasswordController)
)

userRouter.post('/verify-forgot-password', forgotPasswordTokenValidator, wrapAsync(VerifyForgotPasswordTokenController))

userRouter.post(
  '/reset-password',
  forgotPasswordTokenValidator,
  resetPasswordValidator,
  wrapAsync(resetPasswordController)
)

userRouter.post(
  '/me',
  accessTokenValidator, //
  wrapAsync(getMeController)
)

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
  accessTokenValidator,
  updateMeValidator,
  wrapAsync(updateMeController)
)

userRouter.put('/change-password', accessTokenValidator, changePasswordValidator, wrapAsync(changePasswordController))
userRouter.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))

export default userRouter
