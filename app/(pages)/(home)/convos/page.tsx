import React from "react";
import ThreadList from "@/app/components/ThreadList";
import { fetchTags, fetchThreads } from "@/app/lib/data";
import SearchAndFilter from "@/app/components/SearchAndFilter";

export default async function ThreadsPage(props: {
  searchParams?: Promise<{
    tag?: string[],
    search?: string
  }>;
}) {
  const searchParams = await props.searchParams;
  let tagsQuery = searchParams?.tag || [];
  // Normalize tagsQuery to always be an array
  if (!Array.isArray(tagsQuery)) {
    tagsQuery = tagsQuery ? [tagsQuery] : [];
  }
  const searchQuery = searchParams?.search || '';

  const threads = await fetchThreads(tagsQuery, searchQuery);
  const tags = await fetchTags();

  return (
    <div>
      <SearchAndFilter tags={tags} initialSelectedTags={tagsQuery} initialSearch={searchQuery} />
      <ThreadList threads={threads} />
    </div>
  );
};

