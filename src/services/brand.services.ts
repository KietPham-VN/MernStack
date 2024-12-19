import { CreateBrandReqBody } from '~/models/requests/Brand.request'
import databaseService from './database.services'

class BrandsService {
  async createBrand(brand: CreateBrandReqBody) {
    // tạo brand
    const result = await databaseService.Brands.insertOne(brand)
    return result
  }
}
const brandsService = new BrandsService()
export default brandsService
