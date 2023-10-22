import bcrypt from "bcrypt";

const saltRound = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRound);
}

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashPassword);
}