"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tag } from "../lib/definitions";
import { Box, InputLabel, Select, OutlinedInput, MenuItem, Button } from "@mui/material";

interface TagFilterProps {
    tags: Tag[]
    initialSelectedTags: string[]
}

export default function TagFilter({ tags, initialSelectedTags }: TagFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags);

    function handleFilter(e: any) {
        const currentTags = e.target.value;
        setSelectedTags(currentTags)
        const params = new URLSearchParams(searchParams);
        params.delete('tag');
        if (currentTags) {
            currentTags.forEach((tag: string) => {
                params.append('tag', tag);
            })
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Box sx={{ my: 4 }}>
            <InputLabel>Filter by Tags</InputLabel>
            <Select
                multiple
                value={selectedTags}
                onChange={handleFilter}
                input={<OutlinedInput placeholder="Select Tags" />}
                fullWidth
            >
                {tags.map((tag) => (
                    <MenuItem key={tag.ID} value={tag.Name}>
                        {tag.Name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}