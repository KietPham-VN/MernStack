import express from 'express'
import { createCategoryController, getAllCategoryController } from '~/controllers/categories.controllers'
import { createCategoryValidator } from '~/middlewares/categories.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const categoriesRouter = express.Router()

categoriesRouter.post('/create', accessTokenValidator, createCategoryValidator, wrapAsync(createCategoryController))
categoriesRouter.get('/', wrapAsync(getAllCategoryController))

export default categoriesRouter
