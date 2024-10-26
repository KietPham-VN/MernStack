// viết hàm validate nhận vào checkSchema
// hàm sẽ trả ra middleware xử lý lỗi
// ai gọi hàm validate đưa vào checkSchema thì nhận được middleware
// và trở thành middleware

import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { Request, Response, NextFunction } from 'express'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // ghi lỗi và request
    const errors = validationResult(req) // lấy lỗi trong request ra
    if (errors.isEmpty()) {
      return next()
    } else {
      res.status(422).json({
        message: 'Invalid value',
        errors: errors.mapped()
      })
    }
  }
}
