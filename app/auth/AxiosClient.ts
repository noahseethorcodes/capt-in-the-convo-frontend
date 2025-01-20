
import axios from "axios";
import { getServerSession } from "next-auth/next"
import { getRefreshToken, updateSessionTokens } from "./TokenHandling";
import { authConfig } from "./auth";

const BackendAPIClient = axios.create({
    baseURL: "http://localhost:8080", // Update to match your backend
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
                    const refreshResponse = await axios.post("http://localhost:8080/auth/refresh", {
                        refreshToken: await getRefreshToken(),
                    });

                    console.log(refreshResponse.data);
                    const { accessToken, refreshToken } = refreshResponse.data;

                    // Update session with new tokens
                    await updateSessionTokens(accessToken, refreshToken);
                    console.log("New Access Token:", accessToken);

                    // Clone the original config object
                    const originalRequest = { ...error.config };
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    console.log("Original Request Headers:", originalRequest.headers);

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