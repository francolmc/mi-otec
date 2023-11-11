import bcrypt from "bcryptjs";

const ROUND_SALT = 10;

export default class PasswordHash {
    public static async encrypt(password: string): Promise<string> {
        return bcrypt.hash(password, ROUND_SALT);
    }

    public static async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}