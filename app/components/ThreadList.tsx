'use client';
import React from "react";
import ThreadListCard from "./ThreadListCard";
import { Box, Typography } from "@mui/material";
import { Thread } from "../lib/definitions";
import { useRouter } from "next/navigation";

interface ThreadListProps {
    threads: Thread[];
}

export default function ThreadList({ threads }: ThreadListProps) {
    const router = useRouter();
    function openThread(threadID: string) {
        router.push(`/convos/${threadID}`); // Navigate to the thread modal
    }

    if (threads === null) {
        return (
            <Typography
                variant="body2"
                color="textSecondary"
                className="text-center my-4"
            >
                No threads found!
            </Typography>
        )
    }

    return (
        <Box className="flex flex-col items-center mt-8">
            {threads.map((thread, index) => (
                <ThreadListCard
                    key={`${thread.ID}-${index}`}
                    title={thread.Title}
                    content={thread.Content}
                    author={thread.Username}
                    commentsCount={thread.CommentsCount}
                    createdAt={thread.CreatedAt}
                    tags={thread.Tags}
                    onClick={() => openThread(thread.ID)}
                />

            ))
            }
        </Box >

    );
};