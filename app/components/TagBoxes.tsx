import { Box, Chip } from "@mui/material";
import { Tag } from "../lib/definitions";

interface TagBoxesProps {
    tags: Tag[] | null;
}

export default function TagBoxes({ tags }: TagBoxesProps) {
    if (tags) {
        return (
            <Box className="flex flex-wrap gap-1 my-2">
                {tags.map((tag) => (
                    <Chip
                        key={tag.ID}
                        label={tag.Name}
                        size="small"
                        sx={{
                            backgroundColor: "secondary.light",
                            color: "secondary.contrast",
                            fontWeight: "bold",
                            borderRadius: "4px",
                        }}
                    />
                ))}
            </Box>
        );
    }
}