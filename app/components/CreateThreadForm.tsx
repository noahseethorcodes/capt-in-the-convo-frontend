'use client';

import { Box, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useActionState, useState } from "react";
import { postThread } from "../lib/data"; // Assume postThread is your server action
import { CreateConvoFormState } from "../lib/form-validation";
import { Tag } from "../lib/definitions";

export default function CreateThreadForm({ tags }: { tags: Tag[] }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const initalState = {
        message: "",
        data: {
            title: "",
            content: "",
        }
    }
    const [state, action, isPending] = useActionState<CreateConvoFormState, FormData>(postThread, initalState);

    return (
        <Box
            component="form"
            action={action}
            sx={{ my: "2", width: "50%", }}
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
            <InputLabel>Tags (can select multiple)</InputLabel>
            <Select
                multiple
                value={selectedTags}
                onChange={(e) => setSelectedTags(e.target.value as string[])}
                input={<OutlinedInput label="Tags" placeholder="Choose Tags!" />}
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
            <Box className="flex justify-end items-center">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-500 hover:bg-blue-425 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-transform transition-colors hover:scale-110 hover:brightness-110 transform-origin-top"
                >
                    POST
                    <Send className="ml-3" />
                </button>
            </Box>


        </Box>
    );
}