import bcrypt from 'bcrypt';

/**
 * Hashes a plaintext password.
 *
 * @param plaintextPassword
 * @returns Hash of the plaintext password
 */
export const hashPwd = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
};

/**
 * Hashes a plaintext password synchronously.
 *
 * @param plaintextPassword
 * @returns Hash of the plaintext password
 */
export const hashPwdSync = (plaintextPassword: string) => {
  const hash = bcrypt.hashSync(plaintextPassword, 10);
  return hash;
};

/**
 * Compares a plaintext password to a hash.
 *
 * @param plaintextPassword
 * @param hash
 * @returns Whether the plaintext password matches the hash
 */
export const comparePwd = async (plaintextPassword: string, hash: string) => {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
};
