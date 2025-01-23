export type CreateConvoFormState = {
    message: string,
    data: {
        title: string,
        content: string,
    }
}

export type AuthFormState = {
    message: string,
    data: {
        username: string,
        password: string,
    }
}