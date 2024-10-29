import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypto'

class UsersServices {
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
    return result
  }
}
const usersServices = new UsersServices()
export default usersServices
