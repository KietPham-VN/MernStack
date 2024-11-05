// file này lưu hàm dùng để tạo ra token
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenPayload } from '~/models/requests/users.requests'

dotenv.config()

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      } else {
        return resolve(token as string)
      }
    })
  })
}

// làm hàm kiểm tra 1 token có đúng với chữ ký hay không
// đúng thì trả ra payload trong token đó
export const verifyToken = async ({
  token,
  privateKey = process.env.JWT_SECRET as string
}: {
  token: string
  privateKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decode) => {
      if (error) {
        throw reject(error)
      } else {
        return resolve(decode as TokenPayload)
      }
    })
  })
}
