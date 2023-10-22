import BaseRepository from "../base/base.repository";
import User from "./user";

export default interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
}
