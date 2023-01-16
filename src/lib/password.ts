import bcrypt from 'bcrypt';

export const hashPwd = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
};

export const comparePwd = async (plaintextPassword: string, hash: string) => {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
};
