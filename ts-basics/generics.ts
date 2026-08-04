
//Generics allow us to write reusable code that works with different types
// while preserving the exact type.

/*function getFirstGeneric<T>(items : T[]) : T {
    return items[0];
}*/
//why comma(,) - In .tsx files, it avoids confusion with JSX tags.
const getFirstGeneric = <T,>(items : T[]) : T=>{
    return items[0];
}

function getFirst(items: any[]){
    return items[0];
}

/*const firstNumber = getFirst([10, 20, 30]);
const firstName = getFirst(["prabhakar", "raj", "ram"]);*/
//
//const firstNumber = getFirstGeneric<number>([10, 20, 30]);
//const firstName = getFirstGeneric<string>(["prabhakar", "raj", "ram"]);
//You do not always need to write type manually.
//TypeScript automatically understands:
const firstNumber = getFirstGeneric([10, 20, 30]);
const firstName = getFirstGeneric(["prabhakar", "raj", "ram"]);
console.log(firstNumber.toFixed());    // allowed
console.log(firstName.toUpperCase());  // allowed

