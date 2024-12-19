import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { BRANDS_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { TokenPayload } from '~/models/requests/users.requests'
import { CreateCategoryReqBody } from '~/models/requests/category.request'
import categoryService from '~/services/categories.services'

export const createCategoryController = async (
  req: Request<ParamsDictionary, any, CreateCategoryReqBody>,
  res: Response
) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const isAdmin = await usersService.isAdmin(user_id)
  if (!isAdmin) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_IS_NOT_ADMIN,
      status: HTTP_STATUS.FORBIDDEN
    })
  }
  //tạo category
  const category = await categoryService.createCategory(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: BRANDS_MESSAGES.CREATE_BRAND_SUCCESS,
    result: category
  })
}

export const getAllCategoryController = async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategory()
  res.status(HTTP_STATUS.OK).json({
    result: categories
  })
}
