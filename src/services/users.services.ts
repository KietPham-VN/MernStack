import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypto'
import { TOKEN_TYPE } from '~/constants/enums'
import { signToken } from '~/utils/jwt'
import dotenv from 'dotenv'

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

    return { accessToken, refreshToken }
  }
}

const usersServices = new UsersServices()
export default usersServices
