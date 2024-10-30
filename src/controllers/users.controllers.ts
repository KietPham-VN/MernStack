import { NextFunction, Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/users.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'anhkietz2005@gmail.com' && password === '123456') {
    res.status(200).json({
      message: 'Login successfully',
      data: {
        name: 'Kiệt',
        yob: 2005
      }
    })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email } = req.body
  const isDup = await usersServices.checkEmailexists(email)
  if (isDup) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, // 422
      message: 'Email has already been used'
    })
  }
  const result = await usersServices.register(req.body)
  res.status(201).json({
    message: 'Register successfully',
    data: result
  })
}
