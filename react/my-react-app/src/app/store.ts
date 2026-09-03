

import {configureStore} from '@reduxjs/toolkit';

import counterReducer from '../components/counter/counterslice';

import usersReducer from '../components/user/userSlice.ts'

export const store = configureStore({
    reducer : {
        counter: counterReducer,
        users : usersReducer
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

