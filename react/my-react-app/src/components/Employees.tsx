import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import {
    AllCommunityModule,
    ModuleRegistry,
    type ColDef,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

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

function Employees() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "https://randomuser.me/api/?results=1000",
                    {
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch employees");
                }

                const data = await response.json();

                setUsers(data.results);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    console.log("Request aborted");
                    return;
                }

                setError("Failed to load employees");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);
//For large grids, avoiding unnecessary grid configuration changes can be useful.
    //This keeps the columnDefs reference stable between renders.
    const columnDefs = useMemo<ColDef<User>[]>(
        () => [
            {
                headerName: "Name",
                valueGetter: (params) =>
                    `${params.data?.name.first} ${params.data?.name.last}`,
                sortable: true,
                filter: true,
                flex: 1,
            },
            {
                field: "email",
                headerName: "Email",
                sortable: true,
                filter: true,
                flex: 1,
            },
            {
                field: "phone",
                headerName: "Phone",
                flex: 1,
            },
            {
                headerName: "City",
                valueGetter: (params) => params.data?.location.city,
                sortable: true,
                filter: true,
            },
            {
                headerName: "Country",
                valueGetter: (params) => params.data?.location.country,
                sortable: true,
                filter: true,
            },
        ],
        []
    );

    if (loading) {
        return <h3>Loading employees...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <div style={{ width: "100%" }}>
            <h2>Employees: {users.length}</h2>

            <div
                className="ag-theme-alpine"
                style={{
                    height: "600px",
                    width: "100%",
                }}
            >
                <AgGridReact<User>
                    rowData={users}
                    columnDefs={columnDefs}

                    /*
                     * AG Grid row virtualization is enabled by default.
                     */
                    suppressRowVirtualisation={true}

                    /*
                     * Number of additional rows rendered
                     * outside the visible viewport.
                     */
                    rowBuffer={10}

                    animateRows={false}
                />
            </div>
        </div>
    );
}

export default Employees;