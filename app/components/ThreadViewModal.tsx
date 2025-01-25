'use client';

import React from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
import CommentList from "./CommentList";
import { Thread, Comment } from "@/app/lib/definitions";
import AddCommentForm from "./AddCommentForm";
import { useRouter } from "next/navigation";
import ThreadInfo from "./ThreadInfo";

interface ThreadViewModalProps {
    thread: Thread
    comments: Comment[]
    loggedInUserID: string
}

export default function ThreadViewModal({ thread, comments, loggedInUserID }: ThreadViewModalProps) {
    const router = useRouter();
    function onModalClose() {
        router.push(`/convos`); // Navigate back to the thread modal
    }

    return (
        <Modal open={true} onClose={onModalClose} className="px-4">
            <Box className="mb-4 overflow-y-auto bg-white rounded-lg p-6 max-w-[800px] 
                            max-h-[90%] mx-auto my-[40px] 
                            outline-none shadow-[0px_4px_20px_rgba(0,0,0,0.2)]">
                {/* Thread Information */}
                <ThreadInfo thread={thread} loggedInUserID={loggedInUserID} />

                {/* Comments Section */}
                <Box className="mt-6">
                    <Typography variant="h6" className="mb-2">
                        Comments
                    </Typography>
                    <Divider />
                    <AddCommentForm threadID={thread.ID} />
                    <CommentList comments={comments} loggedInUserID={loggedInUserID} />
                </Box>
            </Box>
        </Modal>
    );
};