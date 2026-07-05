


const stringAfterBackspaces = (str: string) => {

    let stack: string[] = [];

   for (let c of str){
       if(c == '#'){
           stack.pop();
       }
       else stack.push(c);
   }

   return stack.join();
}

const backspaceCompare = (s: string, t: string) => {

    let s1 = stringAfterBackspaces(s);
    let t1 = stringAfterBackspaces(t);
    return s1 === t1;
}


console.log(backspaceCompare("ab#c", "ad#c")); // true
console.log(backspaceCompare("a#c", "b"));     // false