import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { BRANDS_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import brandsService from '~/services/brand.services'
import { TokenPayload } from '~/models/requests/users.requests'
import { CreateBrandReqBody, GetBrandReqParams } from '~/models/requests/brand.request'

export const createBrandController = async (req: Request<ParamsDictionary, any, CreateBrandReqBody>, res: Response) => {
  const { user_id } = req.decode_authorization as TokenPayload

  const isAdmin = await usersService.isAdmin(user_id)
  if (!isAdmin) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_IS_NOT_ADMIN,
      status: HTTP_STATUS.FORBIDDEN
    })
  }
  // tạo brand
  const brand = await brandsService.createBrand(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: BRANDS_MESSAGES.CREATE_BRAND_SUCCESS,
    result: brand
  })
}

export const getBrandController = async (req: Request<GetBrandReqParams>, res: Response) => {
  const brand = await brandsService.getBrandById(req.params.id)
  res.status(HTTP_STATUS.OK).json({
    result: brand
  })
}

export const getAllBrandController = async (req: Request, res: Response) => {
  const brands = await brandsService.getAllBrand()
  res.status(HTTP_STATUS.OK).json({
    result: brands
  })
}
