

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value :0
}

const counterSlice  = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value+=1;
        },
        decrement: (state) => {
            state.value-=1;
        },
        incrementByNumber: (state, action) => {
            state.value+=action.payload;
        },
        reset: (state) => {
            state.value = 0;
        }
    }
})

export const {
    decrement, increment, incrementByNumber, reset
} = counterSlice.actions;

export default counterSlice.reducer;


