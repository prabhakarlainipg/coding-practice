import { useState } from "react";
import { useCreateUserMutation } from "../../services/usersApi";


//A cleaner typed option uses skipToken:
// import { skipToken } from "@reduxjs/toolkit/query";
//If userId is undefined, the query does not run.
// const result = useGetUserByIdQuery(
//   userId ?? skipToken
// );
export default function CreateUserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [
        createUser,
        {
            isLoading,
            isSuccess,
            isError,
        },
    ] = useCreateUserMutation();

    //Unlike a query, a mutation does not automatically run during rendering. You trigger it:
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            const createdUser = await createUser({
                name,
                username: name.toLowerCase(),
                email,
            }).unwrap();

            console.log("Created:", createdUser);

            setName("");
            setEmail("");
        } catch (error) {
            console.error("Failed:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
                placeholder="Name"
            />

            <input
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                placeholder="Email"
            />

            <button disabled={isLoading}>
                {isLoading ? "Saving..." : "Create user"}
            </button>

            {isSuccess && <p>User created.</p>}
            {isError && <p>Unable to create user.</p>}
        </form>
    );
}