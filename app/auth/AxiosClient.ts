'use server'

import axios from "axios";
import { getServerSession } from "next-auth/next"
import { getRefreshToken, updateSessionTokens } from "./TokenHandling";
import { authConfig } from "./auth";

const BackendAPIClient = axios.create({
    baseURL: process.env.BACKEND_URL, // Update to match your backend
});

BackendAPIClient.interceptors.request.use(async (config) => {
    const session = await getServerSession(authConfig);

    if (session && session.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    } else {
        console.error("MISSING ACCESS TOKEN")
        console.log(session)
    }

    return config;
});

BackendAPIClient.interceptors.response.use(
    (response) => response, // Pass successful responses
    async (error) => {
        // Check if the error is due to an HTTP response
        if (axios.isAxiosError(error) && error.response) {
            // If access token has expired (401 Unauthorized)
            if (error.response.status === 401 && error.config) {
                try {
                    // Refresh the token
                    const refreshResponse = await axios.post(`${process.env.BACKEND_URL}/auth/refresh`, {
                        refreshToken: await getRefreshToken(),
                    });

                    console.log(refreshResponse.data);
                    const { accessToken, refreshToken } = refreshResponse.data;

                    // Update session with new tokens
                    await updateSessionTokens(accessToken, refreshToken);

                    // Clone the original config object
                    const originalRequest = { ...error.config };
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    // Retry the original request with the new access token
                    return axios.request(originalRequest);
                } catch (refreshError) {
                    console.error("Failed to refresh access token:", refreshError);
                    throw refreshError; // Let the frontend handle logout if refresh fails
                }
            }
        }

        // Handle other errors or network issues
        console.error("Unhandled Axios error:", error.message || error);
        return Promise.reject(error);
    }
);

export default BackendAPIClient;