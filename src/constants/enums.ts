export enum USER_VERIFY_STATUS {
  Unverified,
  Verified,
  Banned
}

export enum USER_ROLE {
  Admin,
  Staff,
  User
}

export enum TOKEN_TYPE {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerificationToken
}
