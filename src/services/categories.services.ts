import { CreateCategoryReqBody } from '~/models/requests/category.request'
import databaseService from './database.services'
import Category from '~/models/schemas/Category.schema'

class CategoryService {
  async createCategory(category: CreateCategoryReqBody) {
    const result = await databaseService.Category.insertOne(new Category(category))
    return result
  }
  async getAllCategory() {
    const result = await databaseService.Category.find().toArray()
    return result
  }
}

const categoryService = new CategoryService()

export default categoryService
