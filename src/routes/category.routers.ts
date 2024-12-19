import express from 'express'
import { createCategoryController, getAllCategoryController } from '~/controllers/categories.controllers'
import { createCategoryValidator } from '~/middlewares/categories.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const categoriesRouter = express.Router()

/*
    Description: Create a new category
    path: /categories/create
    method: POST
    Header: {Authorization: Bearer <access_token>}
    body: {
      name: string
      desc: string
    }
*/
categoriesRouter.post('/create', accessTokenValidator, createCategoryValidator, wrapAsync(createCategoryController))

/*
    Description: get all category
    path: /categories/
    method: get
*/
categoriesRouter.get('/', wrapAsync(getAllCategoryController))
export default categoriesRouter
