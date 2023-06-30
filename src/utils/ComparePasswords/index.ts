import * as bcrypt from 'bcrypt';

const comparePasswords = async (
  password1: string,
  password2: string,
): Promise<boolean> => await bcrypt.compare(password1, password2);

export default comparePasswords;
