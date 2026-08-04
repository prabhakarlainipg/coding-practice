//TypeScript, do not check this variable.
//Trust me.
//any Removes Type Safety
let prop : any;
prop = 'Prabhakar';
//prop = 10;
console.log(prop.toUpperCase());

//unknown This value can be anything, but you must check its type before using it.
let value: unknown = "value";

//error TS18046: value is of type unknown
//console.log(value.toUpperCase());
if(typeof value === "string") {
    console.log(value.toUpperCase());
}



//Anything Can Be Assigned To unknown
let b: unknown;

b = 10;
b = "hello";
b = true;
b = {};

//unknown Cannot Be Assigned Without Check
let b1: unknown = "hello";

/*let str: string = b; // error
let num: number = b; // error*/

if (typeof b1 === "string") {
    let str: string = b1;
}


//never  - never means a value that should never exist.
/*function never returns
impossible type
    exhaustive switch checks
    unreachable code*/

function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        console.log("Running...");
    }
}

type A10 = string & number;
type A11 = never;


