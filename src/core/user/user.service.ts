import User from "./user";
import UserRepository from "./user.repository";

export default class UserService {
    constructor(private readonly _userRepository: UserRepository) { }
    
    public async createUser(user: User): Promise<User> {
        const userCreated: User = await this._userRepository.create(user);

        return userCreated;
    }

    public async updateUser(id: number, user: User): Promise<User | null> {
        const userUpdated = await this._userRepository.update(id, user);

        return userUpdated;
    }

    public async deleteUser(id: number): Promise<User | null> {
        const user = await this._userRepository.delete(id);

        return user;
    }

    public async findUserById(id: number): Promise<User | null> {
        const user = await this._userRepository.findById(id);
        
        return user;
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const user = await this._userRepository.findByEmail(email);

        return user;
    }

    public async getAllUsers(): Promise<User[]> {
        const user = await this._userRepository.getAll();

        return user;
    }
}
