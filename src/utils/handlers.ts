// file này lưu hàm wrapAsync nhận vào những cái nào cần try catch next

import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wrapAsync = <P, T>(func: RequestHandler<P, any, any, T>) => {
  return async (req: Request<P, any, any, T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
