import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422).json({
      message: 'missing email or password'
    })
  } else {
    next()
  }
}

export const registerValidator = validate(
  checkSchema({
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
          max: 100
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
        },
        errorMessage: 'Password must be between 8 and 50 characters'
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
        errorMessage: 'Confirm password is required'
      },
      isString: {
        errorMessage: 'Confirm password must be a string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: 'Confirm password must be between 8 and 50 characters'
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
)
