import { useEffect, useMemo, useState } from "react";
import {
    List,
    type RowComponentProps,
} from "react-window";

interface User {
    login: {
        uuid: string;
    };
    name: {
        first: string;
        last: string;
    };
    email: string;
    phone: string;
    location: {
        city: string;
        country: string;
    };
}

interface EmployeeRowProps {
    users: User[];
}

function EmployeeRow(
    props: RowComponentProps<EmployeeRowProps>
) {
    const {
        index,
        style,
        users,
        ariaAttributes,
    } = props;

    const user = users[index];

    return (
        <div
            {...ariaAttributes}
            style={{
                ...style,
                display: "grid",
                gridTemplateColumns:
                    "250px 300px 180px 180px 180px",
                alignItems: "center",
                padding: "0 15px",
                boxSizing: "border-box",
                borderBottom: "1px solid #e5e5e5",
            }}
        >
            <div>
                {user.name.first} {user.name.last}
            </div>

            <div>{user.email}</div>

            <div>{user.phone}</div>

            <div>{user.location.city}</div>

            <div>{user.location.country}</div>
        </div>
    );
}

function EmployeesList() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // -----------------------------------------
    // Fetch users
    // -----------------------------------------

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUsers() {
            try {
                setLoading(true);
                setError("");

                // Fetch only 1000 from the public API.
                // We will create 5000 local records for
                // virtualization testing.
                const response = await fetch(
                    "https://randomuser.me/api/?results=1000",
                    {
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Request failed: ${response.status}`
                    );
                }

                const data = await response.json();

                // Create 5000 records locally
                const largeDataSet: User[] = [];

                for (let i = 0; i < 5; i++) {
                    data.results.forEach((user: User) => {
                        largeDataSet.push({
                            ...user,
                            login: {
                                ...user.login,
                                uuid: `${user.login.uuid}-${i}`,
                            },
                        });
                    });
                }

                setUsers(largeDataSet);
            } catch (err) {
                if (
                    err instanceof DOMException &&
                    err.name === "AbortError"
                ) {
                    console.log("Request aborted");
                    return;
                }

                console.error(err);
                setError("Failed to load employees.");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);

    // -----------------------------------------
    // Search
    // -----------------------------------------

    const filteredUsers = useMemo(() => {
        const searchValue = search
            .trim()
            .toLowerCase();

        if (!searchValue) {
            return users;
        }

        return users.filter((user) => {
            const fullName =
                `${user.name.first} ${user.name.last}`.toLowerCase();

            return (
                fullName.includes(searchValue) ||
                user.email
                    .toLowerCase()
                    .includes(searchValue) ||
                user.location.city
                    .toLowerCase()
                    .includes(searchValue) ||
                user.location.country
                    .toLowerCase()
                    .includes(searchValue)
            );
        });
    }, [users, search]);

    // -----------------------------------------
    // Loading
    // -----------------------------------------

    if (loading) {
        return (
            <div style={{ padding: 20 }}>
                <h3>Loading employees...</h3>
            </div>
        );
    }

    // -----------------------------------------
    // Error
    // -----------------------------------------

    if (error) {
        return (
            <div style={{ padding: 20 }}>
                <h3>{error}</h3>
            </div>
        );
    }

    // -----------------------------------------
    // Render
    // -----------------------------------------

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div
            style={{
                padding: 20,
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <h2>Employees</h2>

            <div style={{ marginBottom: 15 }}>
                Total: <strong>{users.length}</strong>
                {" | "}
                Showing:{" "}
                <strong>{filteredUsers.length}</strong>
            </div>

            <input
                type="text"
                value={search}
                placeholder="Search employees..."
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                style={{
                    width: 350,
                    padding: "10px",
                    marginBottom: 15,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                }}
            />

            {/* ------------------------------------- */}
            {/* Table Header */}
            {/* ------------------------------------- */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "250px 300px 180px 180px 180px",
                    height: 50,
                    alignItems: "center",
                    padding: "0 15px",
                    boxSizing: "border-box",
                    background: "#eeeeee",
                    fontWeight: "bold",
                    borderBottom: "2px solid #ccc",
                }}
            >
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>City</div>
                <div>Country</div>
            </div>

            {/* ------------------------------------- */}
            {/* Virtualized List */}
            {/* ------------------------------------- */}

            <List
                rowCount={filteredUsers.length}
                rowHeight={55}
                rowComponent={EmployeeRow}
                rowProps={{
                    users: filteredUsers
                }}
                style={{
                    height: 600,
                    width: "100%",
                }}
            />
        </div>
    );
}

export default EmployeesList;