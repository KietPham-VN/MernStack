export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  //name
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',

  //email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',

  //password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',

  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',

  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',

  //user
  USERNAME_IS_INVALID:
    'Username must be a string and length must be 4 - 15, and contain only letters, numbers, and underscores, not only numbers',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login successfully',
  REGISTER_SUCCESS: 'Register successfully',
  ACCESS_TOKEN_IS_REQUIRED: 'Access Token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh Token is required',
  LOGOUT_SUCCESS: 'Logout successfully',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_VERIFY_TOKEN_IS_INVALID: 'Email verify token is invalid',
  VERIFY_EMAIL_SUCCESS: 'Email verify successfully',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token successfully',
  EMAIL_HAS_BEEN_VERIFIED: 'Email has been verified',
  EMAIL_HAS_BEEN_BANNED: 'Email has been banned',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password token is invalid',
  FORGOT_PASSWORD_TOKEN_NOT_MATCH: 'Forgot password token not match',
  RESEND_EMAIL_VERIFY_TOKEN_SUCCESS: 'Resend email verify token successfully',
  USER_NOT_FOUND: 'User not found',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully',
  GET_ME_SUCCESS: 'Get me successfully',
  IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string',
  IMAGE_URL_LENGTH_MUST_BE_LESS_THAN_400: 'Image url length must be less than 400',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 200',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50',
  EMAIL_HAS_BEEN_UNVERIFYED: 'Email has been unverified',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  UPDATE_PROFILE_SUCCESS: 'Profile updating successfully',
  USER_NOT_VERIFIED: 'User not verified',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  USER_IS_NOT_ADMIN: 'User is not admin'
} as const

export const BRANDS_MESSAGES = {
  BRAND_NAME_IS_REQUIRED: 'Brand name is required',
  BRAND_NAME_MUST_BE_A_STRING: 'Brand name must be a string',
  CREATE_BRAND_SUCCESS: 'Create brand success',
  BRAND_NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Brand name length must be from 1 to 100',
  GET_BRANDS_SUCCESS: 'Get brands success',
  GET_BRAND_SUCCESS: 'Get brand success',
  UPDATE_BRAND_SUCCESS: 'Update brand success',
  DELETE_BRAND_SUCCESS: 'Delete brand success',
  HOTLINE_IS_REQUIRED: 'Hotline is required',
  HOTLINE_MUST_BE_A_STRING: 'Hotline must be a string',
  HOTLINE_LENGTH_MUST_BE_FROM_1_TO_12: 'Hotline length must  be from 1 to 12',
  HOTLINE_IS_INVALID: 'Hotline is invalid',
  ADDRESS_IS_REQUIRED: 'Address is required',
  ADDRESS_MUST_BE_A_STRING: 'Address must be a string',
  ADDRESS_LENGTH_MUST_BE_LESS_THAN_200: 'Address length must be less than 200',
  BRAND_NOT_FOUND: 'Brand not found'
} as const

export const CATEGORY_MESSAGES = {
  CATEGORY_NAME_IS_REQUIRED: 'Category name is required',
  CATEGORY_NAME_MUST_BE_A_STRING: 'Category name must be a string',
  CREATE_CATEGORY_SUCCESS: 'Create category success',
  CATEGORY_NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Category name length must be from 1 to 100',
  GET_CATEGORIES_SUCCESS: 'Get categories success',
  GET_CATEGORY_SUCCESS: 'Get category success',
  UPDATE_CATEGORY_SUCCESS: 'Update category success',
  DELETE_CATEGORY_SUCCESS: 'Delete category success',
  CATEGORY_DESC_IS_REQUIRED: 'Category description is required',
  CATEGORY_DESC_MUST_BE_A_STRING: 'Category description must be a string',
  CATEGORY_DESC_LENGTH_MUST_BE_FROM_1_TO_300: 'Category description length must be from 1 to 300',
  CATEGORY_NOT_FOUND: 'Category not found'
} as const

export const PRODUCT_MESSAGES = {
  PRODUCT_NAME_IS_REQUIRED: 'Product name is required',
  PRODUCT_NAME_MUST_BE_A_STRING: 'Product name must be a string',
  PRODUCT_NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Product name length must be from 1 to 100',
  PRODUCT_QUANTITY_IS_REQUIRED: 'Product quantity is required',
  PRODUCT_QUANTITY_MUST_BE_A_NUMBER: 'Product quantity must be a number',
  PRODUCT_QUANTITY_MUST_BE_A_POSITIVE_NUMBER: 'Product quantity must be a positive number',
  BRAND_ID_IS_REQUIRED: 'Brand id is required',
  BRAND_ID_MUST_BE_A_STRING: 'Brand id must be a string',
  BRAND_ID_MUST_BE_A_VALID_OBJECT_ID: 'Brand id must be a valid object id',
  ORIGIN_IS_REQUIRED: 'Origin is required',
  ORIGIN_MUST_BE_A_STRING: 'Origin must be a string',
  ORIGIN_LENGTH_MUST_BE_FROM_1_TO_100: 'Origin length must be less than 100',
  PRODUCT_VOLUME_IS_REQUIRED: 'Product volume is required',
  PRODUCT_VOLUME_MUST_BE_A_NUMBER: 'Product volume must be a number',
  PRODUCT_VOLUME_MUST_BE_A_POSITIVE_NUMBER: 'Product volume must be a positive number',
  PRODUCT_WEIGHT_IS_REQUIRED: 'Product weight is required',
  PRODUCT_WEIGHT_MUST_BE_A_NUMBER: 'Product weight must be a number',
  PRODUCT_WEIGHT_MUST_BE_A_POSITIVE_NUMBER: 'Product weight must be a positive number',
  PRODUCT_WIDTH_IS_REQUIRED: 'Product width is required',
  PRODUCT_WIDTH_MUST_BE_A_NUMBER: 'Product width must be a number',
  PRODUCT_WIDTH_MUST_BE_A_POSITIVE_NUMBER: 'Product width must be a positive number',
  PRODUCT_HEIGHT_IS_REQUIRED: 'Product height is required',
  PRODUCT_HEIGHT_MUST_BE_A_NUMBER: 'Product height must be a number',
  PRODUCT_HEIGHT_MUST_BE_A_POSITIVE_NUMBER: 'Product height must be a positive number',
  CATEGORY_IS_REQUIRED: 'Category is required',
  CATEGORY_MUST_BE_A_STRING: 'Category must be a string',
  CATEGORY_MUST_BE_A_VALID_OBJECT_ID: 'Category must be a valid object id',
  SHIP_CATEGORY_ID_IS_REQUIRED: 'Ship category id is required',
  SHIP_CATEGORY_ID_MUST_BE_A_STRING: 'Ship category id must be a string',
  SHIP_CATEGORY_ID_MUST_BE_A_VALID_OBJECT_ID: 'Ship category id must be a valid object id',
  MEDIAS_MUST_BE_AN_ARRAY: 'Medias must be an array',
  MEDIAS_LENGTH_MUST_BE_GREATER_THAN_0: 'Medias length must be greater than 0',
  CREATE_PRODUCT_SUCCESS: 'Create product success',
  MEDIAS_IS_INVALID: 'Medias is invalid',
  PRODUCT_PRICE_IS_REQUIRED: 'Product price is required',
  PRODUCT_PRICE_MUST_BE_A_NUMBER: 'Product price must be a number',
  PRODUCT_PRICE_MUST_BE_A_POSITIVE_NUMBER: 'Product price must be a positive number',
  PRODUCT_DESCRIPTION_IS_REQUIRED: 'Product description is required',
  PRODUCT_DESCRIPTION_MUST_BE_A_STRING: 'Product description must be a string',
  PRODUCT_DESCRIPTION_LENGTH_MUST_BE_FROM_1_TO_1000: 'Product description length must be from 1 to 1000',
  PRODUCT_ID_IS_REQUIRED: 'Product id is required',
  PRODUCT_NOT_FOUND: 'Product not found',
  GET_PRODUCTS_SUCCESS: 'Get products success',
  PRODUCT_ID_MUST_BE_A_STRING: 'Product id must be a string',
  PRODUCT_ID_MUST_BE_A_VALID_OBJECT_ID: 'Product id must be a valid object id',
  GET_PRODUCT_SUCCESS: 'Get product success'
} as const
