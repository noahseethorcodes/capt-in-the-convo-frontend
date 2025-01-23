import { redirect } from "next/navigation";

export default function RootPage() {
    redirect("/convos"); // Redirects to the /convos page immediately
}