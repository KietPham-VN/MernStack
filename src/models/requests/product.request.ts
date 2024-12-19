import { Media } from '../Other'
import { ParamsDictionary } from 'express-serve-static-core'

export interface CreateProductReqBody {
  name: string
  quantity: number
  price: number
  description: string
  brand_id: string
  origin: string 
  volume: number 
  weight: number 
  width: number
  height: number
  category_id: string 
  ship_category_id: string 
  medias: Media[]
}

export interface GetProductByIdReqParams extends ParamsDictionary {
  id: string
}

export interface GetAllProductReqQuery {
  page: string 
  limit: string
}
