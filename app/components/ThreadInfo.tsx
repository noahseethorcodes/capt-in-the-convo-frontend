import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Thread } from "../lib/definitions";
import TagBoxes from "./TagBoxes";
import { deleteThreadByID } from "@/app/lib/data";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ThreadInfoProps {
    thread: Thread
    loggedInUserID: string
}

export default function ThreadInfo({ thread, loggedInUserID }: ThreadInfoProps) {
    // Check if the logged-in user owns the thread
    const isOwner = loggedInUserID === thread.UserID;
    const router = useRouter();

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this convo?")) {
            const response = await deleteThreadByID(thread.ID);
            if (response === "Success") {
                toast.success("Convo Deleted");
                router.push('/convos');
            } else {
                toast.error("Couldn't Delete Convo");
            }
        }
    };

    return (
        <Box className="bg-[#f5f5f5] rounded-lg p-6 max-w-[800px] outline-none">
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
                {new Date(thread.CreatedAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                })}
            </Typography>

            {/* Delete Button */}

            {isOwner &&
                <Box className="flex justify-end">
                    <Tooltip title="Delete Thread">
                        <IconButton
                            aria-label="Delete convo"
                            color="primary"
                            onClick={handleDelete}
                            size="small"
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            }
        </Box>
    )
}