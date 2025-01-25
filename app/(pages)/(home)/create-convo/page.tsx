import React from "react";
import CreateThreadForm from "@/app/components/CreateThreadForm";
import { fetchTags } from "@/app/lib/data";

export const dynamic = "force-dynamic";

export default async function CreateConvoPage() {
    const tags = await fetchTags();

    return (
        <CreateThreadForm tags={tags} />
    )
}