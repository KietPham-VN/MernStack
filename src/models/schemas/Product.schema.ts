import { ObjectId } from 'mongodb'
import { PRODUCT_STATUS } from '~/constants/enums'

interface ProductType {
  _id?: ObjectId
  name: string
  quantity: number
  price: number
  description: string
  rating_number?: number
  brand_id: ObjectId
  origin: string //xuất xứ
  volume: number // dung tích
  weight: number // khối lượng
  width: number
  height: number
  sold?: number //số lượng đã bán
  status?: PRODUCT_STATUS //còn hàng hay hết rồi
  category_id: ObjectId //mã chủng loại
  ship_category_id: ObjectId //chủng loại để đặt đơn bên ghn
}
export default class Product {
  _id: ObjectId
  name: string
  quantity: number
  price: number
  description: string
  rating_number: number
  brand_id: ObjectId
  origin: string
  volume: number
  weight: number
  width: number
  height: number
  sold: number
  status: PRODUCT_STATUS
  category_id: ObjectId
  ship_category_id: ObjectId

  constructor(product: ProductType) {
    this._id = product._id || new ObjectId()
    this.name = product.name
    this.quantity = product.quantity
    this.price = product.price
    this.description = product.description
    this.rating_number = product.rating_number || 5
    this.brand_id = product.brand_id
    this.origin = product.origin
    this.volume = product.volume
    this.weight = product.weight
    this.width = product.width
    this.height = product.height
    this.sold = product.sold || 0
    this.status = product.status || PRODUCT_STATUS.Active
    this.category_id = product.category_id
    this.ship_category_id = product.ship_category_id
  }
}
