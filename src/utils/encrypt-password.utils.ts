import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error: any) {
        throw new Error('Error al encriptar la contraseña: ' + error.message);
    }
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error: any) {
        throw new Error('Error al comparar contraseñas: ' + error.message);
    }
}