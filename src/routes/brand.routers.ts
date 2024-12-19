import express from 'express'
import { createBrandController, getAllBrandController, getBrandController } from '~/controllers/brands.controllers'
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
/*
    Description: Get Brand by ID
    path: /brands/:id
    method: get
*/
brandsRouter.get('/:id', wrapAsync(getBrandController))

/*
    Description: Get All Brands
    path: /brands/
    method: get
*/
brandsRouter.get("/", wrapAsync(getAllBrandController));
export default brandsRouter
