import { omit } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  // lỗi của toàn bộ hệ thống sẽ đổ về đây
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, 'status'))
  } else {
    // lỗi bình thường không có status
    // nó có tum lum thứ trong đó
    // lỗi từ server rớt mạng, ...
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
