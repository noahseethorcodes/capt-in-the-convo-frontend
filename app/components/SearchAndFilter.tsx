"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tag } from "../lib/definitions";
import { Box, InputLabel, Select, OutlinedInput, MenuItem, Button, TextField } from "@mui/material";

interface TagFilterProps {
    tags: Tag[]
    initialSelectedTags: string[]
    initialSearch: string
}

export default function SearchAndFilter({ tags, initialSelectedTags, initialSearch }: TagFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
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

    function handleSearch(e: any) {
        const currentSearchQuery = e.target.value;
        setSearchQuery(currentSearchQuery)
        const params = new URLSearchParams(searchParams);
        params.set('search', currentSearchQuery)
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Box className="my-4">
            <TextField
                fullWidth
                label="Search"
                value={searchQuery}
                onChange={handleSearch}
            >
            </TextField>
            <InputLabel className="mt-2">Filter by Tags</InputLabel>
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