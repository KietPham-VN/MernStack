import { checkSchema, ParamSchema } from 'express-validator'
import { BRANDS_MESSAGES } from '~/constants/messages'
import { REGEX_PHONE_NUMBER } from '~/constants/regex'
import { validate } from '~/utils/validation'

const nameBrandSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGES.BRAND_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGES.BRAND_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: BRANDS_MESSAGES.BRAND_NAME_LENGTH_MUST_BE_FROM_1_TO_100
  }
}
export const numberPhoneSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGES.HOTLINE_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGES.HOTLINE_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 1,
      max: 12
    },
    errorMessage: BRANDS_MESSAGES.HOTLINE_LENGTH_MUST_BE_FROM_1_TO_12
  },
  trim: true,
  custom: {
    options: (value: string) => {
      return REGEX_PHONE_NUMBER.test(value)
    },
    errorMessage: BRANDS_MESSAGES.HOTLINE_IS_INVALID
  }
}

export const addressSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGES.ADDRESS_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGES.ADDRESS_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: BRANDS_MESSAGES.ADDRESS_LENGTH_MUST_BE_LESS_THAN_200
  },
  trim: true
}

export const createBrandValidator = validate(
  checkSchema({
    name: nameBrandSchema,
    hotline: numberPhoneSchema,
    address: addressSchema
  })
)
