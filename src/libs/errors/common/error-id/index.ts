enum ERROR_ID {
  // SERVER
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  // AUTH
  EMAIL_ALREADY_ASSIGNED = 'EMAIL_ALREADY_ASSIGNED',
  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  MISSING_TOKEN = 'MISSING_TOKEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  // USERS
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  // WEIGHT-HISTORY
  WEIGHT_HISTORY_NOT_FOUND = 'WEIGHT_HISTORY_NOT_FOUND',
  // PROGRAMS
  PROGRAM_NOT_FOUND = 'PROGRAM_NOT_FOUND',
  // WORKOUTS
  WORKOUT_NOT_FOUND = 'WORKOUT_NOT_FOUND',
  // USER PROGRESS
  USER_PROGRESS_NOT_FOUND = 'USER_PROGRESS_NOT_FOUND',
  // MULTER
  UNSUPPORTED_FILE_TYPE = 'UNSUPPORTED_FILE_TYPE',
}

export default ERROR_ID;
