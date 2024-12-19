import { ObjectId } from 'mongodb'

interface BrandType {
  _id?: ObjectId //option
  name: string
  hotline: string
  address: string
}

export default class Brand {
  _id?: ObjectId
  name: string
  hotline: string
  address: string
  constructor(brand: BrandType) {
    this._id = brand._id || new ObjectId()
    this.name = brand.name
    this.hotline = brand.hotline
    this.address = brand.address
  }
}
