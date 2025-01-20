import { Box, Typography, List } from "@mui/material";
import { Comment } from "../lib/definitions";

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
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
                </Box>
            ))}
        </List >
    )
}