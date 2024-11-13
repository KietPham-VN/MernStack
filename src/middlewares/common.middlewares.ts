import { pick } from 'lodash'
import { NextFunction, Request, Response } from 'express'

// hàm mode lại req.body theo mảng các key mà mình muốn lấy
export const filterMiddleware = <T>(filterKeys: Array<keyof T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
}
