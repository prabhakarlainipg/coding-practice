import {decrement, increment, incrementByNumber, reset} from "./counterslice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {CounterState} from "../../pages/DashboardPage.tsx";


export function Counter() {

    const count = useSelector((state: CounterState) => state.counter.value);
    const dispatch = useDispatch();


    return (

        <section>
            <h2>Count: {count}</h2>

            <button onClick={() => dispatch(increment())}>
                Increment
            </button>

            <button onClick={() => dispatch(decrement())}>
                Decrement
            </button>

            <button onClick={() => dispatch(incrementByNumber(5))}>
                Add 5
            </button>

            <button onClick={() => dispatch(reset())}>
                Reset
            </button>
        </section>)
}