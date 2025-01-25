'use server';
import { Comment, Tag, Thread } from "./definitions";
import BackendAPIClient from "@/app/auth/AxiosClient";
import { getUserID } from "@/app/auth/TokenHandling";
import { CreateConvoFormState } from "./form-validation";

export async function fetchThreads(tags: string[], searchQuery: string) {
    try {
        let query = ''
        tags.forEach((tag: string) => query += `tag=${tag}&`)
        if (searchQuery) {
            query += `search=${searchQuery}`
        }
        const response = await BackendAPIClient.get<Thread[]>(`/threads?${query}`);
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to fetch threads.');
    }
}

export async function fetchThreadByID(threadID: string) {
    try {
        const response = await BackendAPIClient.get<Thread>(`/threads/${threadID}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch thread ${threadID}.`);
    }
}

export async function fetchTags() {
    try {
        const response = await BackendAPIClient.get<Tag[]>("/tags?is_active=true");
        return response.data;
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to fetch tags.');
    }
}

export async function fetchCommentsByThreadID(threadID: string) {
    try {
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
        return "Comment cannot be empty!";
    }

    const data = {
        "content": content,
        "user_id": await getUserID(),
        "thread_id": thread_id
    }

    try {
        await BackendAPIClient.post(`/comments`, data);
        return "Success";
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to post comment.');
    }
}

export async function postThread(prevState: CreateConvoFormState, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
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

    const data = {
        "title": title,
        "content": content,
        "user_id": await getUserID(),
        "tags": tagsArray
    }

    try {
        await BackendAPIClient.post(`/threads`, data);
        return {
            message: 'Success',
            data: {
                title: title,
                content: content,
            }
        }
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error('Failed to post thread.');
    }
}

export async function deleteThreadByID(threadID: string) {
    try {
        await BackendAPIClient.delete<string>(`/threads/${threadID}`);
        return 'Success';
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error(`Failed to delete thread ${threadID}.`);
    }
}

export async function deleteCommentByID(threadID: string, commentID: string) {
    try {
        await BackendAPIClient.delete<string>(`/comments/${commentID}`);
        return "Success";
    } catch (error) {
        console.error('Backend Error:', error);
        throw new Error(`Failed to delete comment ${commentID}.`);
    }
}