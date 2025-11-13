import * as bcrypt from 'bcrypt';

export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function validatePassword(
  password: string,
  passwordHashed: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHashed);
}
