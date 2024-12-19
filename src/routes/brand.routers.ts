import express from 'express'
import { createBrandController, getAllBrandController, getBrandController } from '~/controllers/brands.controllers'
import { createBrandValidator } from '~/middlewares/brands.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const brandsRouter = express.Router()

brandsRouter.post('/create', accessTokenValidator, createBrandValidator, wrapAsync(createBrandController))
brandsRouter.get('/:id', wrapAsync(getBrandController))
brandsRouter.get('/', wrapAsync(getAllBrandController))

export default brandsRouter
