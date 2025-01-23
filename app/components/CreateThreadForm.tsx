'use client';

import { Box, Button, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useActionState, useState } from "react";
import { postThread } from "../lib/data"; // Assume postThread is your server action
import { CreateConvoFormState } from "../lib/form-validation";
import { Tag } from "../lib/definitions";
import TagBoxes from "./TagBoxes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateThreadForm({ tags }: { tags: Tag[] }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const initalState = {
        message: "",
        data: {
            title: "",
            content: "",
        }
    }
    const router = useRouter();

    async function handleSubmit(prevState: CreateConvoFormState, formData: FormData) {
        const state = await postThread(prevState, formData);
        if (state.message === 'Success') {
            toast.success('Convo Posted!')
            router.push(`/convos`);
            return state;
        } else {
            return state;
        }
    }

    const [state, action, isPending] = useActionState<CreateConvoFormState, FormData>(handleSubmit, initalState);

    return (
        <Box
            component="form"
            action={action}
            sx={{ my: "2", width: "100%", }}
        >
            <Typography variant="h4" className="text-center mb-4 py-4">
                Create a Convo!
            </Typography>
            {/* Title Field */}
            <TextField
                name="title"
                variant="outlined"
                label="Title"
                placeholder="Enter the thread title"
                defaultValue={state.data.title} // Retain previous title
                fullWidth
                disabled={isPending}
                sx={{ mb: 2 }}
            />

            {/* Tag Selection Field */}
            <InputLabel>Select Tags:</InputLabel>
            {selectedTags.length > 0 &&
                <Box>
                    <TagBoxes tags={tags.filter((tag) => selectedTags.includes(tag.Name))} />
                </Box>
            }
            <Select
                multiple
                value={selectedTags}
                onChange={(e) => setSelectedTags(e.target.value as string[])}
                name="tags"
                fullWidth
            >
                {tags.map((tag) => (
                    <MenuItem key={tag.ID} value={tag.Name}>
                        {tag.Name}
                    </MenuItem>
                ))}
            </Select>

            {/* Content Field */}
            <TextField
                name="content"
                variant="outlined"
                label="Content"
                placeholder="Enter the thread content"
                defaultValue={state.data.content} // Retain previous content
                multiline
                rows={6}
                fullWidth
                disabled={isPending}
                sx={{ my: 2 }}
            />
            {/* Error/Success Message */}
            {state.message && (
                <Box className="mb-2 text-red-500 text-sm">
                    {typeof state.message === "string" ? state.message : "An error occurred."}
                </Box>
            )}

            {/* Submit Button */}
            <Box className="flex justify-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isPending}
                >
                    POST
                    <Send className="ml-2" />
                </Button>
            </Box>
        </Box>
    );
}