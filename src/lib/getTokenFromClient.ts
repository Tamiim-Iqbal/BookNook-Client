import { authClient } from './auth-client';

const getTokenFromClient = async () => {

    const { data, error } = await authClient.token();

    if (error) {
        throw new Error("Failed to retrieve JWT token");
    }

    const token = data?.token;
    return token;

}