'use server';
import { Comment, Tag, Thread } from "./definitions";
import BackendAPIClient from "../auth/AxiosClient";
import { redirect } from "next/navigation";
import { getUserID } from "../auth/TokenHandling";
import { CreateConvoFormState } from "./form-validation";

export async function fetchThreads(tags: string[], searchQuery: string) {
    try {
        let query = ''
        console.log(typeof (tags))
        tags.forEach((tag: string) => query += `tag=${tag}&`)
        if (searchQuery) {
            query += `search=${searchQuery}`
        }
        console.log(`Fetching threads via /threads${query}...`);
        const response = await BackendAPIClient.get<Thread[]>(`/threads?${query}`);
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to fetch threads.');
    }
}

export async function fetchThreadByID(threadID: string) {
    try {
        console.log(`Fetching thread ${threadID}...`);
        const response = await BackendAPIClient.get<Thread>(`/threads/${threadID}`);
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error(`Failed to fetch thread ${threadID}.`);
    }
}

export async function fetchTags() {
    try {
        console.log('Fetching tags...');
        const response = await BackendAPIClient.get<Tag[]>("/tags?is_active=true");
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to fetch tags.');
    }
}

export async function fetchCommentsByThreadID(threadID: string) {
    try {
        console.log(`Fetching comments for thread ${threadID}...`);
        const response = await BackendAPIClient.get<Comment[]>(`/comments/${threadID}`);
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to fetch comments.');
    }
}

export async function postComment(prevState: string, formData: FormData) {
    const content = formData.get("content");
    const thread_id = Number(formData.get("threadID"));

    if (content === "") {
        return "Comment cannot be empty!"
    }

    let redirectPath: string | null = null
    const data = {
        "content": content,
        "user_id": await getUserID(),
        "thread_id": thread_id
    }
    console.log(data);
    try {
        const response = await BackendAPIClient.post(`/comments`, data);
        redirectPath = `/convos/${formData.get("threadID")}`;
        return response.data.message;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to post comment.');
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

export async function postThread(prevState: CreateConvoFormState, formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");
    const tags = formData.get("tags") as string;
    const tagsArray = tags ? tags.split(',') : [];

    let errors = ""

    if (title === "") {
        errors += "Title cannot be empty!\n"
    }

    if (content === "") {
        errors += "Content cannot be empty!"
    }

    if (errors !== "") {
        return {
            message: errors,
            data: {
                title: title,
                content: content,
            }
        }
    }

    let redirectPath: string | null = null
    const data = {
        "title": title,
        "content": content,
        "user_id": await getUserID(),
        "tags": tagsArray
    }
    console.log(data);
    try {
        const response = await BackendAPIClient.post(`/threads`, data);
        redirectPath = `/convos`;
        return response.data.message;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to post thread.');
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

export async function deleteThreadByID(threadID: string) {
    try {
        console.log(`Deleting thread ${threadID}...`);
        const response = await BackendAPIClient.delete<String>(`/threads/${threadID}`);
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error(`Failed to delete thread ${threadID}.`);
    } finally {
        redirect('/convos');
    }
}

export async function deleteCommentByID(threadID: string, commentID: string) {
    try {
        console.log(`Deleting comment ${commentID}...`);
        const response = await BackendAPIClient.delete<string>(`/comments/${commentID}`);
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error(`Failed to delete comment ${commentID}.`);
    } finally {
        redirect(`/convos/${threadID}`);
    }
}