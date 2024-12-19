import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Brand from '~/models/schemas/Brand.schma'
import Category from '~/models/schemas/Category.schema'
import Product from '~/models/schemas/Product.schema'

dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppingcardprojectclus.u7dem.mongodb.net/?retryWrites=true&w=majority&appName=shoppingCardProjectCluster`

class DatabaseService {
  private readonly client: MongoClient
  private readonly db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  get Brands(): Collection<Brand> {
    return this.db.collection(process.env.DB_BRANDS_COLLECTION as string)
  }
  get Category(): Collection<Category> {
    return this.db.collection(process.env.DB_CATEGORY_COLLECTION as string)
  }
  get Products(): Collection<Product> {
    return this.db.collection(process.env.DB_PRODUCTS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
