import { Router } from 'express'
import {
  createProductController,
  getAllProductController,
  getProductByIdController
} from '~/controllers/products.controllers'
import { createProductValidator, getProductByIdValidator } from '~/middlewares/products.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const productsRouter = Router()
/*
Description: get all products with pagination
    path: /products/?page&limit
    method: GET
    
*/
productsRouter.get('/', wrapAsync(getAllProductController))
/*
Description: get a product by id
    path: /products/:id
    method: GET
*/
productsRouter.get('/:id', getProductByIdValidator, wrapAsync(getProductByIdController))
/*
    Description: Create a new product
    path: /products/create
    method: POST
    Header: {Authorization: Bearer <access_token>
    body: {
        name: string
        quantity: number
        price: number
        description: string
        brand_id: ObjectId
        origin: string //xuất xứ
        volume: number // dung tích
        weight: number // khối lượng
        width: number
        height: number
        category_id: string //mã chủng loại
        ship_category_id: string //chủng loại để đặt đơn bên ghn
        media: string[]
    }
*/
productsRouter.post('/create', accessTokenValidator, createProductValidator, wrapAsync(createProductController))

export default productsRouter
