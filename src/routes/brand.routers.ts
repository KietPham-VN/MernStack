import express from 'express'
import { createBrandController } from '~/controllers/brands.controllers'
import { createBrandValidator } from '~/middlewares/brands.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const brandsRouter = express.Router()

/*
  Description: Create a new brand
  path: /brands/create
  method: POST
  Header: {Authorization: Bearer <access_token>}
  body: {
    name: string;
    hotline: string;
    address: string;    
  }
  */
brandsRouter.post('/create', accessTokenValidator, createBrandValidator, wrapAsync(createBrandController))

export default brandsRouter
