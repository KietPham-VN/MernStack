import { Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/users.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'

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
  try {
    // kiểm ra email có bị trùng không
    const isDup = await usersServices.checkEmailexists(email)
    if (isDup) {
      const customError = new Error('Email has already been used')
      //! đoạn này senior chết ngợp =))
      Object.defineProperty(customError, 'message', {
        enumerable: true
      })
      throw customError
    }
    const result = await usersServices.register(req.body)
    res.status(201).json({
      message: 'Register successfully',
      data: result
    })
  } catch (error) {
    res.status(422).json({
      message: 'Register failed',
      error
    })
  }
}
