

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

interface CreateUserRequest {
    name: string;
    username: string;
    email: string;
}
/*interface UsersResponse {
    data: User[];
    total: number;
}*/

export const  usersApi  =  createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    endpoints : (builder) => ({
        getUsers : builder.query<User[], void> ({
            query : ()=> "/users",
/*
            keepUnusedDataFor: 60, //seconds
*/

            /*transformResponse: (
                response: UsersResponse
            ) => response.data,*/
        }),
        getUserById: builder.query<User, number>({
            query: (userId) => `/users/${userId}`,
        }),
        createUser : builder.mutation<User, CreateUserRequest> ({
            query : (newUser)=> ({
                url : "/users",
                method : "POST",
                body : newUser
                })
        })
    })
});

//use + EndpointName + Query/Mutation
export const {useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation} = usersApi;