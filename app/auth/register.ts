'use server';

import BackendAPIClient from "@/app/auth/AxiosClient";
import axios from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function register(prevState: string, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (username === "" || password === "") {
        return ("Both username and password required");
    }

    if (password.length < 6) {
        console.log(password);
        console.log(password.length);
        return ("Password must be at least 6 characters long");
    }

    let redirectPath: string | null = null
    const data = {
        "username": username,
        "password": password,
    }
    console.log(data);
    try {
        const response = await BackendAPIClient.post(`/auth/register`, data);
        redirectPath = `/login`;
        return response.data.message;
    } catch (error) {
        console.error('Backend Error:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.response.data.error);
            return (error.response.data.error);
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