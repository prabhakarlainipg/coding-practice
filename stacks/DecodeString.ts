

const decodeString = (str: string) => {
let currentString : string = '';
let currentNumber : number =0;
let countStack : number[] = [];
let stringStack : string[] = [];

for( let c of str ) {
    if( ! isNaN(Number(c))){
        currentNumber = Number(c);
    } else if( c === '['){
        stringStack.push(currentString);
        countStack.push(currentNumber);
        currentNumber=0;
        currentString = '';
    }
    else if( c === ']' ){
        let count  =  countStack.pop();
        let previousString = stringStack.pop();
        // @ts-ignore
        currentString = previousString + currentString.repeat(count);
    }
    else {
        currentString+=c;
    }
}

return  currentString;
}

console.log(decodeString("3[a]2[bc]")); // "aaabcbc"
console.log(decodeString("3[a2[c]]"));  // "accaccacc"

