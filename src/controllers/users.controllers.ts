import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { USER_VERIFY_STATUS } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import {
  RegisterReqBody,
  LoginReqBody,
  LogoutReqBody,
  TokenPayload,
  VerifyEmailReqQuery,
  UpdateMeReqBody,
  VerifyForgotPasswordTokenReqBody,
  ResetPasswordReqBody,
  ChangePasswordReqBody,
  RefreshTokenReqBody
} from '~/models/requests/users.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'

dotenv.config()

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email } = req.body

  const isDup = await usersServices.checkEmailExists(email)
  if (isDup) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
    })
  }
  const result = await usersServices.register(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const { email, password } = req.body
  const result = await usersServices.login({ email, password })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const { user_id: user_id_at } = req.decode_authorization as TokenPayload
  const { user_id: user_id_rf } = req.decode_refresh_token as TokenPayload
  if (user_id_at !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
    })
  }
  await usersServices.checkRefreshToken({
    user_id: user_id_at,
    refresh_token
  })
  await usersServices.logout(refresh_token)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}

export const verifyEmailTokenController = async (
  req: Request<ParamsDictionary, any, any, VerifyEmailReqQuery>,
  res: Response
) => {
  const email_verify_token = req.query.email_verify_token
  const { user_id } = req.decode_email_verify_token as TokenPayload

  const user = await usersServices.checkEmailVerifyToken({ user_id, email_verify_token })
  if (user.verify == USER_VERIFY_STATUS.Banned) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.EMAIL_HAS_BEEN_BANNED
    })
  } else {
    const result = await usersServices.verifyEmail(user_id)
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.VERIFY_EMAIL_SUCCESS,
      result
    })
  }
}

export const resendVerifyEmailController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const user = await usersServices.findUserById(user_id)
  if (!user) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.NOT_FOUND,
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.verify == USER_VERIFY_STATUS.Verified) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.OK,
      message: USERS_MESSAGES.EMAIL_HAS_BEEN_VERIFIED
    })
  } else if (user.verify == USER_VERIFY_STATUS.Banned) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.FORBIDDEN,
      message: USERS_MESSAGES.EMAIL_HAS_BEEN_BANNED
    })
  } else {
    await usersServices.resendEmailVerify(user_id)
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESEND_EMAIL_VERIFY_TOKEN_SUCCESS
    })
  }
}

export const forgotPasswordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { email } = req.body
  const hasUser = await usersServices.checkEmailExists(email)
  if (!hasUser) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.NOT_FOUND,
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  } else {
    await usersServices.forgotPassword(email)
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    })
  }
}

export const VerifyForgotPasswordTokenController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordTokenReqBody>,
  res: Response
) => {
  const { forgot_password_token } = req.body
  const { user_id } = req.decode_forgot_password_token as TokenPayload
  await usersServices.checkForgotPasswordToken({ user_id, forgot_password_token })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  const { forgot_password_token } = req.body
  const { user_id } = req.decode_forgot_password_token as TokenPayload
  await usersServices.checkForgotPasswordToken({ user_id, forgot_password_token })
  await usersServices.resetPassword({ user_id, password: req.body.password })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}

export const getMeController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response //
) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const userInfor = await usersServices.getMe(user_id)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    userInfor
  })
}

export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeReqBody>, res: Response) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const payload = req.body
  await usersServices.checkEmailVerified(user_id)
  const userInfor = await usersServices.updateMe({ user_id, payload })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS,
    userInfor
  })
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const { old_password, password } = req.body
  await usersServices.changePassword({
    user_id,
    old_password,
    password
  })
  // nếu đổi thành công thì
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHANGE_PASSWORD_SUCCESS
  })
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id } = req.decode_refresh_token as TokenPayload
  await usersServices.checkRefreshToken({ user_id, refresh_token })
  await usersServices.refreshToken({ user_id, refresh_token })
  const result = await usersServices.refreshToken({ user_id, refresh_token })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}
