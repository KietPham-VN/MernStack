import { Request, Response } from 'express'
import usersServices from '~/services/users.services'
// controllers là handler có nhiệm vụ tập kết dữ liệu từ người dùng
// và phân phát vào các service đúng chỗ để xử lý

// controllers là nơi tập kết và xử lý logic cho các dữ liệu nhận được
// trong controllers các dữ liệu phải clean
// chỉ có service mới có thể giao tiếp với database

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  // lên database để xác thực email và password
  // xà lơ
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
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  // gọi service, tạo user từ email và password, lưu user đó vào users collection của mongo
  try {
    const result = await usersServices.register({
      email,
      password
    })
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
