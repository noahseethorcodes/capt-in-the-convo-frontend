import { Box, Typography, List, IconButton, Tooltip } from "@mui/material";
import { Comment } from "../lib/definitions";
import { deleteCommentByID } from "../lib/data";
import { Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CommentListProps {
    comments: Comment[];
    loggedInUserID: string;
}

export default function CommentList({ comments, loggedInUserID }: CommentListProps) {
    const isCommenter = (commentUserID: string) => loggedInUserID === commentUserID;
    const router = useRouter();

    async function handleDelete(threadID: string, commentID: string) {
        if (confirm("Are you sure you want to delete this comment?")) {
            const response = await deleteCommentByID(threadID, commentID);
            if (response === "Success") {
                toast.success("Comment successfully deleted");
                router.push(`/convos/${threadID}`);
            } else {
                toast.error("Couldn't delete this comment");
            }

        }
    };

    if (comments.length === 0) {
        return (
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center", my: 4 }}
            >
                There are no comments yet.
            </Typography>
        )
    }
    return (
        <List
            className="max-h-96 overflow-y-auto"
        >
            {comments.map((comment) => (
                <Box
                    key={comment.ID}
                    sx={{
                        backgroundColor: "#f5f5f5",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "12px",
                    }}
                >
                    <Typography variant="body2" className="mb-1">
                        {comment.Content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Comment by <span className="font-semibold">{comment.Username}</span> on{" "}
                        {new Date(comment.CreatedAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </Typography>
                    {/* Delete Button (Visible to Owner Only) */}
                    {isCommenter(comment.UserID) && (
                        <Box className="flex justify-end">
                            <Tooltip title="Delete Comment">
                                <IconButton
                                    aria-label="Delete comment"
                                    color="primary"
                                    onClick={() => handleDelete(comment.ThreadID, comment.ID)}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            ))}
        </List >
    )
}