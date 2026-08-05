import * as React from "react";
import {useRef} from "react";

export const UnControlledComp: React.FC = () =>{
    const inputRef = useRef<HTMLInputElement  | null>(null);
    const checkboxRef = useRef<HTMLInputElement | null>(null);

    function handleSubmit() {
        console.log(inputRef.current?.value);
    }
    return (
        <>
            <div>
                <input ref={inputRef} />

                <button onClick={handleSubmit}>Submit</button>
            </div>

            <input type="checkbox" ref={checkboxRef} defaultChecked />

            <button onClick={() => console.log(checkboxRef.current?.checked)}>
                Check
            </button>
        </>
    );
}
