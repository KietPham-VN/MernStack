import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ParamsDictionary } from 'express-serve-static-core'
import { PRODUCT_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import usersService from '~/services/users.services'
import { ErrorWithStatus } from '~/models/Errors'
import { CreateProductReqBody, GetAllProductReqQuery, GetProductByIdReqParams } from '~/models/requests/product.request'
import productService from '~/services/products.services'

export const createProductController = async (
  req: Request<ParamsDictionary, any, CreateProductReqBody>,
  res: Response
) => {
  const productInfor = req.body
  const { user_id } = req.decode_authorization
  const isUserAdmin = await usersService.isAdmin(user_id)
  if (isUserAdmin) {
    const result = await productService.createProduct(productInfor)
    res.status(HTTP_STATUS.CREATED).json({
      message: PRODUCT_MESSAGES.CREATE_PRODUCT_SUCCESS,
      data: result
    })
  } else {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_IS_NOT_ADMIN,
      status: HTTP_STATUS.FORBIDDEN
    })
  }
}

export const getProductByIdController = async (req: Request<GetProductByIdReqParams>, res: Response) => {
  const { id } = req.params
  const product = await productService.getProductById(id)
  res.status(HTTP_STATUS.OK).json({
    message: PRODUCT_MESSAGES.GET_PRODUCT_SUCCESS,
    data: product
  })
}

export const getAllProductController = async (
  req: Request<ParamsDictionary, any, any, GetAllProductReqQuery>,
  res: Response
) => {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const products = await productService.getAllProduct({ page, limit }) //chưa làm
  res.status(HTTP_STATUS.OK).json({
    message: PRODUCT_MESSAGES.GET_PRODUCTS_SUCCESS,
    data: products
  })
}
