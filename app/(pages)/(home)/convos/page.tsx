import React from "react";
import ThreadList from "@/app/components/ThreadList";
import { fetchThreads } from "../../../lib/data";

export default async function ThreadsPage() {
  const threads = await fetchThreads();

  return (
    <div>
      <ThreadList threads={threads} />
    </div>
  );
};

