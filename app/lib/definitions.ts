export type Thread = {
    ID: string;
    Title: string;
    Content: string;
    UserID: string;
    Username: string;
    CommentsCount: string;
    CreatedAt: string;
    Tags: Tag[];
};

export type Tag = {
    ID: string;
    Name: string;
};

export type Comment = {
    ID: string;
    ThreadID: string;
    Content: string;
    UserID: string;
    Username: string;
    CreatedAt: string;
};
