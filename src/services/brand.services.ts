import databaseService from './database.services'
import { ErrorWithStatus } from '~/models/Errors'
import { ObjectId } from 'mongodb'
import { BRANDS_MESSAGES } from '~/constants/messages'
import { CreateBrandReqBody } from '~/models/requests/brand.request'

class BrandsService {
  async createBrand(brand: CreateBrandReqBody) {
    const result = await databaseService.Brands.insertOne(brand)
    return result
  }

  async getBrandById(id: string) {
    const result = await databaseService.Brands.findOne({ _id: new ObjectId(id) })
    if (!result) {
      throw new ErrorWithStatus({
        message: BRANDS_MESSAGES.BRAND_NOT_FOUND,
        status: 404
      })
    }
    return result
  }

  async getAllBrand() {
    const result = await databaseService.Brands.find().toArray()
    return result
  }
}
const brandsService = new BrandsService()
export default brandsService
