
/*number -> add score
"+"    -> add sum of previous two scores
"D"    -> double previous score
"C"    -> remove previous score*/

const calPoints = (operations: string[]) => {
let stack : number[] = [];
for (let c of operations) {
    if(c === 'C'){
        stack.pop();
    }else if(c === 'D'){
        stack.push(stack[stack.length-1] *2);
    } else if (c === '+'){
        stack.push( stack[stack.length-1] + stack[stack.length-2] );
    }
    else {
        stack.push(Number(c));
    }
}
    return stack.reduce((acc, red)=> acc + red, 0);
}


console.log(calPoints(["5", "2", "C", "D", "+"])); // 30