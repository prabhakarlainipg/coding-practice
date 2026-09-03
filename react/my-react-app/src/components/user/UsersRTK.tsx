import {useGetUserByIdQuery, useGetUsersQuery} from "../../services/usersApi";


export default function UsersListUsingRTK() {

    //RTK also supports automatic fetching
   /* useGetUsersQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: 30_000,
    });*/
    const {
        data: users,
        isLoading,
        isFetching,
        refetch,
        isError,
        isSuccess
    } = useGetUsersQuery();

//Two components using the same endpoint and argument share one cache entry:
// <ComponentA>
//   useGetUserByIdQuery(1)
// </ComponentA>
//
// <ComponentB>
//   useGetUserByIdQuery(1)
// </ComponentB>
// RTK Query normally does not send two identical simultaneous requests. Both components subscribe to the same cached query.
// This is called request deduplication.
    const {
        data: user,
        isLoading : userLoading,
        isError : userError,
        isSuccess : userSuccess,
    } = useGetUserByIdQuery(2);
    //You do not need:
    // useDispatch()
    // You do not need:
    // useEffect()
    // You do not need:
    // createAsyncThunk()
    // You do not need:
    // useSelector()
    // Calling the generated hook is sufficient:
    // useGetUsersQuery();

    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p role="alert">Unable to fetch users.</p>;
    }

    if (userLoading) {
        return <p>Loading user...</p>;
    }

    if (userError || !user) {
        return <p>User could not be loaded.</p>;
    }

    return (
        <section>
            <button
                onClick={refetch}
                disabled={isFetching}
            >
                Refresh
            </button>

            {isFetching && <p>Refreshing...</p>}

            {isSuccess && <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul> }

            {userSuccess && <article>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </article>}

        </section>
    );
}