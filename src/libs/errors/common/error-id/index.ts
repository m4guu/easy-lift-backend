enum ERROR_ID {
  // SERVER
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  // AUTH
  EMAIL_ALREADY_ASSIGNED = 'EMAIL_ALREADY_ASSIGNED',
  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  MISSING_TOKEN = 'MISSING_TOKEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
}

export default ERROR_ID;
