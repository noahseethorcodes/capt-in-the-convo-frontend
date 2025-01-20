'use client';

import React from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
import CommentList from "./CommentList";
import { Thread, Comment } from "@/app/lib/definitions";
import TagBoxes from "./TagBoxes";
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
        <Modal open={true} onClose={onModalClose} >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "24px",
                    maxWidth: "800px",
                    maxHeight: "90%",
                    margin: "40px auto",
                    outline: "none",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                }}

                className="mb-4 overflow-y-auto"
            >
                {/* Thread Information */}
                <ThreadInfo thread={thread} loggedInUserID={loggedInUserID} />

                {/* Comments Section */}
                <Box sx={{ marginTop: "24px" }}>
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