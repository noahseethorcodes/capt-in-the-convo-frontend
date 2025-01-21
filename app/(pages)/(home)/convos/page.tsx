import React from "react";
import ThreadList from "@/app/components/ThreadList";
import { fetchTags, fetchThreads } from "@/app/lib/data";
import TagFilter from "@/app/components/TagFilter";

export default async function ThreadsPage(props: {
  searchParams?: Promise<{
    tag?: string[]
  }>;
}) {
  const searchParams = await props.searchParams;
  let tagsQuery = searchParams?.tag || [];
  // Normalize tagsQuery to always be an array
  if (!Array.isArray(tagsQuery)) {
    tagsQuery = tagsQuery ? [tagsQuery] : [];
  }
  console.log("Query: ", tagsQuery);
  const threads = await fetchThreads(tagsQuery);
  const tags = await fetchTags();

  return (
    <div>
      <TagFilter tags={tags} initialSelectedTags={tagsQuery} />
      <ThreadList threads={threads} />
    </div>
  );
};

