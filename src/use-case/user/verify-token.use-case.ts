import jwt from "jsonwebtoken";

export default class VerifyTokenUseCase {
    public async execute(token: string): Promise<boolean> {
        try {
            const secretKey = process.env.SECRET_KEY as string;
            jwt.verify(token, secretKey);
            return true
        } catch (error) {
            return false;
        }
    }
}