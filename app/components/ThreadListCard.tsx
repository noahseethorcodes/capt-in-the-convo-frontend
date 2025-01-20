import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import CommentTwoToneIcon from "@mui/icons-material/Comment";
import { Tag } from "../lib/definitions";
import TagBoxes from "./TagBoxes";

interface ThreadListCardProps {
    title: string;
    content: string;
    author: string;
    createdAt: string;
    commentsCount: string;
    tags: Tag[] | null;
    onClick: () => void;
}

export default function ThreadListCard({ title, content, author, createdAt, commentsCount, tags, onClick }: ThreadListCardProps) {
    return (
        <Card className="shadow-md mb-6 mx-auto w-full max-w-lg rounded-lg transition-transformation duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:scale-105"
            variant="outlined"
            sx={{
                width: "100%",
                maxWidth: 600,
                borderRadius: "10px",
            }}
            onClick={onClick}>
            <CardContent>
                {/* Thread Title */}
                <Typography variant="h6" className="font-bold">
                    {title}
                </Typography>
                <TagBoxes tags={tags} />
                {/* Thread Content */}
                <Typography variant="body2" className="text-gray-500 mt-2">
                    {content.substring(0, 100)}... {/* Limit content to 100 characters */}
                </Typography>
                {/* Comment Count */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        mt: 2,
                    }}
                >
                    <CommentTwoToneIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption" color="textSecondary">
                        {commentsCount} {commentsCount === "1" ? "comment" : "comments"}
                    </Typography>
                </Box>
                {/* Posted By and Date */}
                <Box className="text-right mt-4">
                    <Typography variant="caption" className="text-gray-400 mt-4">
                        Posted by {author} on {new Date(createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            timeZone: "UTC",
                        })}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};