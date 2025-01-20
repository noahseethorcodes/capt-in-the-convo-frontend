import { Box, Chip } from "@mui/material";
import { Tag } from "../lib/definitions";

interface TagBoxesProps {
    tags: Tag[] | null;
}

export default function TagBoxes({ tags }: TagBoxesProps) {
    if (tags) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 0.5,
                }}
            >
                {tags.map((tag) => (
                    <Chip
                        key={tag.ID}
                        label={tag.Name}
                        size="small"
                        sx={{
                            backgroundColor: "#e0f7fa",
                            color: "#006064",
                            fontWeight: "bold",
                            borderRadius: "4px",
                        }}
                    />
                ))}
            </Box>
        );
    }
}