


const evalRPN = (tokens: string[]) => {
let stack: string[] = [];
for(let c of tokens) {
    if(c=='+'){
 let b = stack.pop();
 let a = stack.pop();
 // @ts-ignore
        stack.push(a+b);
    }else if(c=='*'){
        let b = stack.pop();
        let a = stack.pop();
        // @ts-ignore
        stack.push(a*b);
    }else if(c=='-'){
        let b = stack.pop();
        let a = stack.pop();
        // @ts-ignore
        stack.push(a-b);
    }else if(c=='/'){
        let b = stack.pop();
        let a = stack.pop();
        // @ts-ignore
        stack.push(Math.trunc(a/b));
    }else {
        // @ts-ignore
        stack.push(Number(c));
    }
}
    return stack.map(s=>Number(s)).reduce((sum, acc)=> sum+acc , 0);
}

console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6