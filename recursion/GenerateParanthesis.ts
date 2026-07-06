
const generateParanthesis = (num: number) => {

    let result : string[]=[];
    const backtrack = (currentString : string, open : number, close : number) =>{
        if(currentString.length== num*2){
            result.push(currentString);
            return;
        }
        if(open< num){
            backtrack(currentString+'(', open+1, close);
        }
        if(close<open){
            backtrack(currentString+')', open, close+1);
        }
    }
    backtrack('', 0, 0);
    return result;
}


console.log(generateParanthesis(3));