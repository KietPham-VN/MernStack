import { omit } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  // lỗi của toàn bộ hệ thống sẽ hội tụ về nơi đây
  // cụ thể là lỗi có mã và lỗi không có mã
  if (error instanceof ErrorWithStatus) {
    // lỗi mà có status
    res.status(error.status).json(omit(error, 'status'))
  } else {
    // lỗi bình thường không có status
    // nó có tum lum thứ trong đó name, stack, ...
    // lỗi từ server rớt mạng, cúp điện, lỗi từ database, ...
    // đưa tất cả thuộc tính trong đó về enumberable true
    Object.getOwnPropertyNames(error).forEach((key) => {
      Object.defineProperty(error, key, {
        enumerable: true
      })
    })
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      errorInfor: omit(error, ['stack'])
    })
  }
}
