import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p>You are not authenticated. Please log in.</p>;
    }

    return (
        <div>
            <h1>Welcome, {session.user.email}</h1>
            <p>Your role: {session.user.role}</p>
        </div>
    );
}
