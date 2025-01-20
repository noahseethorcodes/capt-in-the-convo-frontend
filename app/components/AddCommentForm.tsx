import { Box, IconButton, TextField } from "@mui/material"
import { Send } from "@mui/icons-material"
import { useActionState } from "react";
import { postComment } from "../lib/data";

export default function AddCommentForm({ threadID }: { threadID: string }) {
    const [message, action, isPending] = useActionState(postComment, "");

    return (
        <Box
            component="form"
            action={action}
            sx={{ my: 2 }}

        >
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>


                <input type="hidden" name="threadID" value={threadID} />
                <TextField
                    name="content"
                    variant="standard"
                    placeholder="Add a comment..."
                    multiline
                    fullWidth
                    disabled={isPending}
                    sx={{ mr: 1 }}
                />
                <IconButton
                    type="submit"
                    color="primary"
                    disabled={isPending}
                >
                    <Send />
                </IconButton>
            </Box>
            {message && (
                <Box className="mt-2 text-red-500 text-sm">
                    {typeof message === "string" ? message : "An error occurred."}
                </Box>
            )}
        </Box>
    );
}