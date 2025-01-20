export type LoginFormState = {
    status?: string | null;
    message?: string | null;
}

export type CreateConvoFormState = {
    message: String,
    data: {
        title: String,
        content: String,
    }
}