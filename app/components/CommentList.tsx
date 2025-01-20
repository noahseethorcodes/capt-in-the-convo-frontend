import { Box, Typography, List, IconButton } from "@mui/material";
import { Comment } from "../lib/definitions";
import { deleteCommentByID } from "../lib/data";
import { Delete } from "@mui/icons-material";

interface CommentListProps {
    comments: Comment[];
    loggedInUserID: string;
}

export default function CommentList({ comments, loggedInUserID }: CommentListProps) {
    const isCommenter = (commentUserID: string) => loggedInUserID === commentUserID;
    async function handleDelete(threadID: string, commentID: string) {
        if (confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteCommentByID(threadID, commentID);
                alert("Comment deleted successfully!");
            } catch (error) {
                console.error("Failed to delete comment:", error);
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
                        By {comment.Username} on{" "}
                        {new Date(comment.CreatedAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </Typography>
                    {/* Delete Button (Visible to Owner Only) */}
                    {isCommenter(comment.UserID) && (
                        <IconButton
                            aria-label="Delete comment"
                            color="error"
                            onClick={() => handleDelete(comment.ThreadID, comment.ID)}
                        >
                            <Delete />
                        </IconButton>
                    )}
                </Box>
            ))}
        </List >
    )
}