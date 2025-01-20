'use client';
import React from "react";
import ThreadCard from "./ThreadCard";
import { Box } from "@mui/material";
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

    return (
        <div>
            <Box className="flex flex-col items-center mt-8">
                {threads.map((thread) => (
                    <ThreadCard
                        key={thread.ID}
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
        </div >

    );
};