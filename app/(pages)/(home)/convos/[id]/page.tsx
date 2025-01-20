import ThreadViewModal from "@/app/components/ThreadViewModal";
import { fetchCommentsByThreadID, fetchThreadByID } from "@/app/lib/data";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: threadID } = await params;
    const comments = await fetchCommentsByThreadID(threadID);
    const thread = await fetchThreadByID(threadID);

    return (
        <div>
            {/* Pass session and comments to the client component */}
            <ThreadViewModal thread={thread} comments={comments} />
        </div>
    );
}