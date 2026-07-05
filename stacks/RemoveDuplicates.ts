

const removeAdjacentDuplicates = (str:string) => {

    let stack : string[] =[];
    for(let c of str) {
         if(stack.length > 0 && stack[stack.length - 1] === c){
             stack.pop();
         }
         else {
             stack.push(c);
         }
    }
    return stack.join("");
}



console.log(removeAdjacentDuplicates("abbaca")); // "ca"

