import { createError } from "#imports";
import { useAuthHandler } from "../../util/authHandler";
import { defineEventHandler, getRouterParam, readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id, credentials } = body;

    if (!id || !credentials || !credentials.username || !credentials.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request data',
        });
    }

    const authHandler = useAuthHandler();
    const { user, token } = await authHandler.createUserSession(id, credentials);

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
        });
    }

    // set cookie with the token
    setCookie(event, 'auth_token', token.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 1 day
    });

    return {
        user: user,
        token: token,
    };
});
