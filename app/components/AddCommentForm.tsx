import { Box, IconButton, TextField, Tooltip } from "@mui/material"
import { Send } from "@mui/icons-material"
import { useActionState } from "react";
import { postComment } from "../lib/data";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddCommentForm({ threadID }: { threadID: string }) {
    const [message, action, isPending] = useActionState(handleSubmit, "");
    const router = useRouter();

    async function handleSubmit(prevState: string, formData: FormData) {
        const response = await postComment(prevState, formData);
        if (response === 'Success') {
            toast.success('Comment Posted!')
            router.push(`/convos/${threadID}`);
            return "Comment successfully added!";
        } else {
            return response;
        }
    }

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
                <Tooltip title="Post Comment">
                    <IconButton
                        type="submit"
                        color="primary"
                        disabled={isPending}
                    >
                        <Send />
                    </IconButton>
                </Tooltip>
            </Box>
            {message && (
                <Box className="mt-2 text-red-500 text-sm">
                    {message !== "Comment successfully added!" && message}
                </Box>
            )}
        </Box>
    );
}