

const isValidParantheses = ( str : string)=>{
    let pairs    = {
        ')':'(',
        ']':'[',
        '}':'{'
    }
    let stack = [];
   for (let c of str){
 if(c=='(' || c=='[' || c=='{') stack.push(c);
 else{
     // @ts-ignore
     if(pairs[c]!== stack.pop()){ return false; }
 }
   }
   return stack.length === 0;
}

console.log(isValidParantheses("()[]{}")); // true
console.log(isValidParantheses("([)]"));   // false