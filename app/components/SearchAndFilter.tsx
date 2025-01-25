"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tag } from "../lib/definitions";
import { Box, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import TagBoxes from "./TagBoxes";

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
        console.log(typeof (currentTags));
        setSelectedTags(currentTags);
        const params = new URLSearchParams(searchParams);
        params.delete('tag');
        if (currentTags) {
            currentTags.forEach((tag: string) => {
                params.append('tag', tag);
            })
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
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
            <InputLabel className="mt-2">Filter by Tags:</InputLabel>
            {selectedTags.length > 0 &&
                <Box>
                    <TagBoxes tags={tags.filter((tag) => selectedTags.includes(tag.Name))} />
                </Box>
            }
            <Select
                multiple
                value={selectedTags}
                onChange={handleFilter}
                fullWidth
                className="mt-2"
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