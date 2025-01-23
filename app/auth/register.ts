'use server';

import BackendAPIClient from "@/app/auth/AxiosClient";
import axios from "axios";
import { redirect } from "next/navigation";
import { AuthFormState } from "../lib/form-validation";

export async function register(prevState: AuthFormState, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const data = {
        "username": username,
        "password": password,
    }

    if (username === "" || password === "") {
        return { message: "Both username and password required", data: data };
    }

    if (password.length < 6) {
        console.log(password);
        console.log(password.length);
        return { message: "Password must be at least 6 characters long", data: data };
    }

    let redirectPath: string | null = null
    try {
        const response = await BackendAPIClient.post(`/auth/register`, data);
        redirectPath = `/login`;
        return { message: "Success", data: data };
    } catch (error) {
        console.error('Backend Error:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.response.data.error);
            return { message: error.response.data.error, data: data };
        } else {
            console.error(error);
            throw error;
        }
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}