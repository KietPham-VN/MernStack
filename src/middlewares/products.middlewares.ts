import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { MEDIA_TYPE } from '~/constants/enums'
import { PRODUCT_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const createProductValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      quantity: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_QUANTITY_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_QUANTITY_MUST_BE_A_NUMBER
        },

        custom: {
          options: (value: string) => {
            return Number(value) >= 0
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_QUANTITY_MUST_BE_A_POSITIVE_NUMBER
        }
      },
      price: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_PRICE_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_PRICE_MUST_BE_A_NUMBER
        },

        custom: {
          options: (value: string) => {
            return Number(value) >= 0
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_PRICE_MUST_BE_A_POSITIVE_NUMBER
        }
      },
      description: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_DESCRIPTION_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_DESCRIPTION_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 1000
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_DESCRIPTION_LENGTH_MUST_BE_FROM_1_TO_1000
        }
      },
      brand_id: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.BRAND_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.BRAND_ID_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(PRODUCT_MESSAGES.BRAND_ID_MUST_BE_A_VALID_OBJECT_ID)
            }
            return true
          }
        }
      },
      origin: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.ORIGIN_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.ORIGIN_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: PRODUCT_MESSAGES.ORIGIN_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      volume: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_VOLUME_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_VOLUME_MUST_BE_A_NUMBER
        },

        custom: {
          options: (value: string) => {
            return Number(value) >= 1
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_VOLUME_MUST_BE_A_POSITIVE_NUMBER
        }
      },
      weight: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_WEIGHT_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_WEIGHT_MUST_BE_A_NUMBER
        },

        custom: {
          options: (value: string) => {
            return Number(value) >= 1
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_WEIGHT_MUST_BE_A_POSITIVE_NUMBER
        }
      },
      width: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_WIDTH_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_WIDTH_MUST_BE_A_NUMBER
        },

        custom: {
          options: (value: string) => {
            return Number(value) >= 1
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_WIDTH_MUST_BE_A_POSITIVE_NUMBER
        }
      },
      height: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_HEIGHT_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_HEIGHT_MUST_BE_A_NUMBER
        },

        custom: {
          options: (value: string) => {
            return Number(value) >= 1
          },
          errorMessage: PRODUCT_MESSAGES.PRODUCT_HEIGHT_MUST_BE_A_POSITIVE_NUMBER
        }
      },
      category_id: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.CATEGORY_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.CATEGORY_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(PRODUCT_MESSAGES.CATEGORY_MUST_BE_A_VALID_OBJECT_ID)
            }
            return true
          }
        }
      },
      ship_category_id: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.SHIP_CATEGORY_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.SHIP_CATEGORY_ID_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(PRODUCT_MESSAGES.SHIP_CATEGORY_ID_MUST_BE_A_VALID_OBJECT_ID)
            }
            return true
          }
        }
      },
      medias: {
        isArray: {
          errorMessage: PRODUCT_MESSAGES.MEDIAS_MUST_BE_AN_ARRAY
        },
        custom: {
          options: (value) => {
            const MediaTypeArray = Object.keys(MEDIA_TYPE).filter((key) => !isNaN(Number(key)))
            if (
              value.some((item: any) => {
                return typeof item.url !== 'string' || !MediaTypeArray.includes(String(item.type))
              })
            ) {
              throw new Error(PRODUCT_MESSAGES.MEDIAS_IS_INVALID)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const getProductByIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGES.PRODUCT_ID_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(PRODUCT_MESSAGES.PRODUCT_ID_MUST_BE_A_VALID_OBJECT_ID)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
