import User from '~/models/schemas/User.schema'
import databaseService from './database.services'

class UsersServices {
  async register(payLoad: { email: string; password: string }) {
    const { email, password } = payLoad
    const result = await databaseService.users.insertOne(
      new User({
        email,
        password
      })
    )
    return result
  }
}
const usersServices = new UsersServices()
export default usersServices
