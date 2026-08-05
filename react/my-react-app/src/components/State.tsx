import {useState} from "react";

export const Counter =  ()=>{
    const [count, setCount] = useState(0);
    const expValueFun = ()=>{
        console.log('inside exp function');
        return 2;
    }
    //Lazy Initial State
const [expvalue, ] = useState(()=>{
    return expValueFun();
});
    //expValueFun runs on every render
    //const [expvalue, ] = useState(expValueFun());
    function handleClick() {
        setCount(count + 1);
        //old value prints here, because state update takes effect in next render
        console.log(count);
    }

    return <>
        <button>{expvalue}</button>

        <button onClick={handleClick}>{count}</button>
        </>
}
