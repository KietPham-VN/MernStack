import { checkSchema, ParamSchema } from 'express-validator'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

const nameCategorySchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_LENGTH_MUST_BE_FROM_1_TO_100
  }
}

export const createCategoryValidator = validate(
  checkSchema({
    name: nameCategorySchema,
    desc: {
      notEmpty: {
        errorMessage: CATEGORY_MESSAGES.CATEGORY_DESC_IS_REQUIRED
      },
      isString: {
        errorMessage: CATEGORY_MESSAGES.CATEGORY_DESC_MUST_BE_A_STRING
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 300
        },
        errorMessage: CATEGORY_MESSAGES.CATEGORY_DESC_LENGTH_MUST_BE_FROM_1_TO_300
      }
    }
  })
)
