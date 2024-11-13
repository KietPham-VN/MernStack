import { JwtPayload } from 'jsonwebtoken'
import { TOKEN_TYPE } from '~/constants/enums'
import { ParsedQs } from 'qs'

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TOKEN_TYPE
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface VerifyEmailReqQuery extends ParsedQs {
  email_verify_token: string
}

export interface VerifyForgotPasswordTokenReqBody {
  forgot_password_token: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional}
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}