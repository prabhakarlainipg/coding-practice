import { useEffect, useRef, useState } from "react";

interface User {
    login: {
        uuid: string;
        username: string;
    };
    name: {
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
    };
}

interface ApiResponse {
    results: User[];
}

const PAGE_SIZE = 20;

function InfiniteScroll() {
    const [users, setUsers] = useState<User[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(false);

    // Reference to the last user
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    // -----------------------------------------
    // Fetch users
    // -----------------------------------------

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "https://randomuser.me/api/?results=1000"
                );

                const data: ApiResponse = await response.json();

                setUsers(data.results);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // -----------------------------------------
    // Load more users
    // -----------------------------------------


    // -----------------------------------------
    // IntersectionObserver
    // -----------------------------------------

    useEffect(() => {
        if (loading) {
            return;
        }
// creates new observer for new lastref element
        const observer = new IntersectionObserver(
            (entries) => {
                console.log(
                    "Observer fired:",
                    entries[0].isIntersecting
                );

                if (!entries[0].isIntersecting) {
                    return;
                }

                setVisibleCount((currentCount) =>
                    Math.min(
                        currentCount + PAGE_SIZE,
                        users.length
                    )
                );
            },
            {
                rootMargin: "200px",
                threshold: 0,
            }
        );

        if (lastElementRef.current) {
            observer.observe(lastElementRef.current);
        }
// React first runs the cleanup, for previous observer
        return () => {
            observer.disconnect();
        };
    }, [loading, visibleCount, users.length]);

    // -----------------------------------------
    // Display only visible users
    // -----------------------------------------

    const visibleUsers = users.slice(0, visibleCount);

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "0 auto",
                padding: "20px",
            }}
        >
            <h1>Infinite Scroll</h1>

            <p>
                Showing {visibleUsers.length} of {users.length} users
            </p>

            {visibleUsers.map((user, index) => {
                const isLast = index === visibleUsers.length - 1;

                return (
                    <div
                        key={user.login.uuid}
                        ref={isLast ? lastElementRef : null}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            padding: "15px",
                            marginBottom: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <img
                            src={user.picture.large}
                            alt={`${user.name.first} ${user.name.last}`}
                            width="80"
                            height="80"
                            style={{
                                borderRadius: "50%",
                            }}
                        />

                        <div>
                            <h3>
                                {user.name.first} {user.name.last}
                            </h3>

                            <p>{user.email}</p>

                            <p>@{user.login.username}</p>
                        </div>
                    </div>
                );
            })}

            {loading && <p>Loading...</p>}

            {!loading && visibleCount >= users.length && (
                <p style={{ textAlign: "center" }}>
                    No more users
                </p>
            )}
        </div>
    );
}

export default InfiniteScroll;