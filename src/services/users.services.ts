import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypto'
import { TOKEN_TYPE } from '~/constants/enums'
import { signToken } from '~/utils/jwt'
import dotenv from 'dotenv'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'

dotenv.config()

class UsersServices {
  private sginAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TOKEN_TYPE.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    })
  }

  private sginRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TOKEN_TYPE.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    })
  }

  async checkEmailexists(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async register(payLoad: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payLoad,
        password: hashPassword(payLoad.password),
        date_of_birth: new Date(payLoad.date_of_birth)
      })
    )
    const user_id = result.insertedId.toString()
    // tạo ac và rf thui
    const [accessToken, refreshToken] = await Promise.all([
      this.sginAccessToken(user_id),
      this.sginRefreshToken(user_id)
    ])
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken
      })
    )
    return {
      accessToken,
      refreshToken
    }
  }

  async login({ email, password }: LoginReqBody) {
    // dung email và pass để tìm user
    const user = await databaseService.users.findOne({
      email,
      password: hashPassword(password)
    })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }

    // nếu có thì tạo ac và rf cho nó
    const user_id = user._id.toString()
    const [accessToken, refreshToken] = await Promise.all([
      this.sginAccessToken(user_id),
      this.sginRefreshToken(user_id)
    ])
    // lưu rf vào database
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken
      })
    )
    return {
      accessToken,
      refreshToken
    }
  }
}

const usersServices = new UsersServices()
export default usersServices
