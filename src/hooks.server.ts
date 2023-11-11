import { SECRET_KEY } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import type { UserFields } from "./core/user/get-user-by-email.use-case";

const unProtectedPaths = ["/", "/auth/login", "/auth/logout"];

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get("token");

    if(!session && !unProtectedPaths.includes(event.url.pathname)) {
        throw redirect(303, "/");
    }

    try {
        const token = jwt.verify(session as string, SECRET_KEY) as UserFields;
        if (token) {
            event.locals.user = {
                id: token.id,
                firstName: token.firstName,
                lastName: token.lastName,
                email: token.email
            };
        }
    } catch {
        if (!unProtectedPaths.includes(event.url.pathname)) {
            throw redirect(303, "/");
        }
    }

    return resolve(event);
}