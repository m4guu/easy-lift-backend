import { CookieOptions } from 'express';

export const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

export const tokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  expires: new Date(Date.now() + DAY_IN_MILISECONDS),
};
