'use client';

import React from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
import CommentList from "./CommentList";
import { Thread, Comment } from "@/app/lib/definitions";
import TagBoxes from "./TagBoxes";
import AddCommentForm from "./AddCommentForm";
import { useRouter } from "next/navigation";

interface ThreadViewModalProps {
    thread: Thread
    comments: Comment[]
}

const ThreadViewModal: React.FC<ThreadViewModalProps> = ({ thread, comments }) => {
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
                <Box
                    sx={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        padding: "24px",
                        maxWidth: "800px",
                        outline: "none",
                    }}

                >
                    <Typography variant="h5" className="font-bold mb-2">
                        {thread.Title}
                    </Typography>
                    <TagBoxes tags={thread.Tags} />
                    <Typography variant="body1">
                        {thread.Content}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        className="text-right block py-2"
                    >
                        Posted by <span className="font-semibold">{thread.Username}</span> on{" "}
                        {new Date(thread.CreatedAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </Typography>
                </Box>

                {/* Comments Section */}
                <Box sx={{ marginTop: "24px" }}>
                    <Typography variant="h6" className="mb-2">
                        Comments
                    </Typography>
                    <Divider />
                    <AddCommentForm threadID={thread.ID} />
                    <CommentList comments={comments} />
                </Box>
            </Box>
        </Modal>
    );
};

export default ThreadViewModal;