import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

// file lưu các định nghĩa của các loại lỗi
export class ErrorWithStatus {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    this.status = status
    this.message = message
  }
}

type ErrorsType = Record<
  string,
  | {
      msg: string
      [key: string]: any
    }
  | string
>

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType

  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
