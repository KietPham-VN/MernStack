// import các interfaces của express giúp em mô tả request và response
import { Request, Response, NextFunction } from 'express'

// middleware là handler có nhiệm vụ kiểm trá các dữ liệu mà người dùng
// gởi lên thông qua request và nó đảm nhận vai trò kiểm tra dữ liệu đủ và đúng kiểu

// bây h mình sẽ mô phỏng chức năng đăng nhập
// nếu 1 người dùng muốn đăng nhập thì họ sẽ gữi lên email và password
// thông qua request.body
// middleware không được đụng vô database
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  // lấy email và password từ request.body
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422).json({
      message: 'missing email or password'
    })
  } else {
    next()
  }
}
