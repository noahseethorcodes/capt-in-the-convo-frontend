import { Box, Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Thread } from "../lib/definitions";
import TagBoxes from "./TagBoxes";
import { deleteThreadByID } from "@/app/lib/data";

interface ThreadInfoProps {
    thread: Thread
    loggedInUserID: String
}

export default function ThreadInfo({ thread, loggedInUserID }: ThreadInfoProps) {
    // Check if the logged-in user owns the thread
    const isOwner = loggedInUserID === thread.UserID;

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this thread?")) {
            try {
                await deleteThreadByID(thread.ID);
                alert("Thread deleted successfully!");
            } catch (error) {
                console.error("Failed to delete thread:", error);
            }
        }
    };

    return (
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

            {/* Delete Button */}
            {isOwner && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    className="mt-2"
                ><Delete /></Button>
            )}
        </Box>
    )
}