import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUsers,
    selectUsers,
    selectUsersError,
    selectUsersStatus,
} from "../user/userSlice.ts";

import type { AppDispatch } from "../../app/store.ts";


export default function UsersList() {
    const dispatch = useDispatch<AppDispatch>();

    const users = useSelector(selectUsers);
    const status = useSelector(selectUsersStatus);
    const error = useSelector(selectUsersError);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    if (status === "loading") {
        return <p>Loading users...</p>;
    }

    if (status === "failed") {
        return <p role="alert">Error: {error}</p>;
    }

    return (
        <ul>
            {users?.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}