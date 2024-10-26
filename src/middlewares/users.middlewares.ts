// import các interfaces của express giúp em mô tả request và response
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'

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

export const registerValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'Name is required'
    },
    isString: {
      errorMessage: 'Name must be a string'
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 500
      },
      errorMessage: 'Name must be between 1 and 500 characters'
    }
  },
  email: {
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: true,
    trim: true
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isString: {
      errorMessage: 'Password must be a string'
    },
    isLength: {
      options: {
        min: 8,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 1,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
        // returnScore: true
      },
      errorMessage:
        'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    }
  },
  confirm_password: {
    notEmpty: {
      errorMessage: 'confirm password is required'
    },
    isString: {
      errorMessage: 'confirm password must be a string'
    },
    isLength: {
      options: {
        min: 8,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 1,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
        // returnScore: true
      },
      errorMessage:
        'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm password does not match password')
        } else {
          return true
        }
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
