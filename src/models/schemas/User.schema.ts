import { ObjectId } from 'mongodb'
import { USER_VERIFY_STATUS, USER_ROLE } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: USER_VERIFY_STATUS

  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
  role?: USER_ROLE
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: USER_VERIFY_STATUS
  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string
  role: USER_ROLE
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name ?? ''
    this.email = user.email
    this.date_of_birth = user.date_of_birth || date
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token ?? ''
    this.forgot_password_token = user.forgot_password_token ?? ''
    this.verify = user.verify ?? USER_VERIFY_STATUS.Unverified

    this.bio = user.bio ?? ''
    this.location = user.location ?? ''
    this.website = user.website ?? ''
    this.username = user.username ?? ''
    this.avatar = user.avatar ?? ''
    this.cover_photo = user.cover_photo ?? ''
    this.role = user.role ?? USER_ROLE.User
  }
}
