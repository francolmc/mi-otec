import { UserRepository } from "@/core/user";
import { UserPrismaRepository } from "@/infraestructure/database";
import { container } from "tsyringe";

container.register<UserRepository>("UserRepository", {
    useClass: UserPrismaRepository
});