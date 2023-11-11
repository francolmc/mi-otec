import { fail, type Action, redirect, type Actions } from "@sveltejs/kit";
import type UserRepository from "../../../core/user/user.repository";
import UserTypeOrmRepository from "../../../infraestructure/adapters/user.typeorm-repository";
import AuthUserUseCase from "../../../core/user/auth-user.use-case";
import type { PageServerLoad } from "../../$types";
import { SECRET_KEY } from "$env/static/private";
import jwt from "jsonwebtoken";
import GetUserByEmailUseCase, { type UserFields } from "../../../core/user/get-user-by-email.use-case";

export const load: PageServerLoad = async () => {
    // todo
  }

const userRepository: UserRepository = new UserTypeOrmRepository();
const authUser = new AuthUserUseCase(userRepository);
const getUser = new GetUserByEmailUseCase(userRepository);

const login: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email ||
        !password
    ) {
        return fail(400, { invalid: true })
    }
    
    const isValid = await authUser.execute(email, password);

    if (!isValid) {
        return fail(400, { credentials: true })
    }

    const user = await getUser.execute(email);
    const payload = user as UserFields;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    cookies.set("token", token, {
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
    });

    throw redirect(302, "/");
};

export const actions: Actions = { login };