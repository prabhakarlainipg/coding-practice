import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";

export const fetchUsers = createAsyncThunk<User[], void, {rejectValue:string}>(
    "users/fetchUsers",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            if (!response.ok) {
                throw new Error("Request failed");
            }

            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Unable to fetch users"
            );
        }
    }
);

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
}

export interface GeoLocation {
    lat: string;
    lng: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export type UserState = {
    items:  Array<User>,
    status: string,
    error: null | string
}

const initialState : UserState = {
    items: [],
    status: "idle",
    error: null ,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.items = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
               state.error =  action.payload ?? action.error.message ?? "Unknown error";
            });
    },
});

export const { clearUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) =>
    state.users.items;

export const selectUsersStatus = (state: RootState) =>
    state.users.status;

export const selectUsersError = (state: RootState) =>
    state.users.error;

export default usersSlice.reducer;