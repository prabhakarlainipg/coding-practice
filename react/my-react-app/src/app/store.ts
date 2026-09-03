

import {configureStore} from '@reduxjs/toolkit';

import counterReducer from '../components/counter/counterslice';

import usersReducer from '../components/user/userSlice.ts'

import {usersApi} from '../services/usersApi.tsx';
/*RTK Query creates both:
    - A reducer
- Middleware
Both must be registered.*/
export const store = configureStore({
    reducer : {
        counter: counterReducer,
        users : usersReducer,
        [usersApi.reducerPath]  : usersApi.reducer, //RTK query reducer
    },
    middleware : (getDefaultMiddleware)=>{
       return  getDefaultMiddleware().concat(usersApi.middleware) // RTK query middleware
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

