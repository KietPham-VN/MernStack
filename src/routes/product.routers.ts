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

productsRouter.get('/', wrapAsync(getAllProductController))
productsRouter.get('/:id', getProductByIdValidator, wrapAsync(getProductByIdController))
productsRouter.post('/create', accessTokenValidator, createProductValidator, wrapAsync(createProductController))

export default productsRouter
