import { Request } from 'express'
// đây là file định nghĩa lại các thư viện trong dự án nếu cần
declare module 'express' {
  export interface Request {
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
    decode_email_verify_token?: TokenPayload
    decode_forgot_password_token?: TokenPayload
  }
}
