export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserModel extends Partial<UserModel> {};

export interface UpdateUserModel extends Partial<UserModel> {};

export interface UserLoginModel extends Pick<UserModel, "email" | "password"> {};