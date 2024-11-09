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
  ResetPasswordReqBody
} from '~/models/requests/users.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'

dotenv.config()

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response
) => {
  const { email } = req.body
  // gọi service, tạo user từ email và password, lưu user đó vào users collection của mongo

  //kiểm tra email có trùng ko | tồn tại chưa | email có dùng chưa
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

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response
) => {
  //cần lấy email cà password để tìm xem user nào đang sở hữu
  //nếu ko có thì user nào ngừng cuộc chơi
  //nếu có thì tạo at ref
  const { email, password } = req.body
  const result = await usersServices.login({ email, password })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result //ac rf
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response
) => {
  //xem thử user_id trong payload của refresh_token có giống không
  const { refresh_token } = req.body
  const { user_id: user_id_at } = req.decode_authorization as TokenPayload
  const { user_id: user_id_rf } = req.decode_refresh_token as TokenPayload
  if (user_id_at !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
    })
  }
  // nếu mà trùng rồi thì mình xem thử refresh_token có được quyền dùng dịch vụ không
  await usersServices.checkRefreshToken({
    user_id: user_id_at,
    refresh_token
  })
  //khi nào có mã đó trong database thì mình tiến hành logout (xóa rf khỏi hệ thống)
  await usersServices.logout(refresh_token)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}

export const verifyEmailTokenController = async (
  req: Request<ParamsDictionary, any, any, VerifyEmailReqQuery>,
  res: Response
) => {
  //khi họ ấn vào link, thì họ sẽ gửi email_verify_token lên thông qua
  //req.boby
  const email_verify_token = req.query.email_verify_token
  const { user_id } = req.decode_email_verify_token as TokenPayload

  //kiểm tra xem trong database có user nào có sở hữu user_id và email_verify_token
  const user = await usersServices.checkEmailVerifyToken({ user_id, email_verify_token })
  //kiểm tra xem user tìm được bị banned chưa, chưa thì verify
  if (user.verify == USER_VERIFY_STATUS.Banned) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.EMAIL_HAS_BEEN_BANNED
    })
  } else {
    //chưa verify thì verify
    const result = await usersServices.verifyEmail(user_id)
    //sau khi verify
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.VERIFY_EMAIL_SUCCESS,
      result //ac và rf
    })
  }
}

export const resendVerifyEmailController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response
) => {
  // dùng user_id để tìm user đó kiểm tra user đó có verify hay là bị banned không
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
      status: HTTP_STATUS.FORBBIDEN,
      message: USERS_MESSAGES.EMAIL_HAS_BEEN_BANNED
    })
  } else {
    await usersServices.resendEmailVerify(user_id)
    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESEND_EMAIL_VERIFY_TOKEN_SUCCESS
    })
  }
  // nếu không thì resend email
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response
) => {
  const { email } = req.body
  const hasUser = await usersServices.checkEmailExists(email)
  if (!hasUser) {
    // có thể đưa vào trong forgotPassword để tăng hiệu năng
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
  // vào được đây tức là toksen trong body là hợp lệ
  const { forgot_password_token } = req.body
  // lấy thêm users_id nữa
  const { user_id } = req.decode_forgot_password_token as TokenPayload
  await usersServices.checkForgotPasswordToken({ user_id, forgot_password_token })
  // nếu qua hàm trên êm xui thì có nghĩa là token hợp lệ
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  // vào được đây tức là toksen trong body là hợp lệ
  const { forgot_password_token } = req.body
  // lấy thêm users_id nữa
  const { user_id } = req.decode_forgot_password_token as TokenPayload
  await usersServices.checkForgotPasswordToken({ user_id, forgot_password_token })
  // nếu qua hàm trên êm xui thì có nghĩa là token hợp lệ và mình reset thôi
  await usersServices.resetPassword({ user_id, password: req.body.password })
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}

export const getMeController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response //
) => {
  //trong access_token mà ngừi dùng gửi lên thì chắc chắn mình decoe sẽ có
  //decode_authorization => tìm đc user_id => user
  const { user_id } = req.decode_authorization as TokenPayload
  //tìm user thông qua user_id này và trả về user đó
  //truy cập vào database nên ta sẽ code ở user.services
  const userInfor = await usersServices.getMe(user_id) // hàm này ta chưa code, nhưng nó dùng user_id tìm user và trả ra user đó
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    userInfor
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeReqBody>,
  res: Response
) => {
  // người dùng gửi access_token để mình biết họ là ai
  const { user_id } = req.decode_authorization as TokenPayload
  const payload = req.body
  // ta muốn account phải verify thì mới được cập nhật
  await usersServices.checkEmailVerified(user_id)
  // nếu hàm trên được gọi rồi mà không có gì xảy ra thì tức là user đã verify
  // thì mình tiến hành cập nhật
  const userInfor = await usersServices.updateMe({user_id, payload})
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS,
    userInfor
  })
}


