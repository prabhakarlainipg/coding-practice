

const  letterCombinations = (digits : string)=>{

    let result:string[] = [];

    const phoneMap ={
        2:"abc",
        3:"def",
        4:"ghi",
        5:"jkl",
        6:"mno",
        7:"pqrs",
        8:"tuv",
        9:"wxyz",
    }
    const backtrack = (index:number, current:string)=> {
        if(index==digits.length){
            result.push(current);
            return;
        }
        // @ts-ignore
        let letters = phoneMap[digits[index]];

        for (const  letter of letters) {
            backtrack(index+1, current+letter);
        }
    }

    backtrack(0,'')

    return result;
}

console.log(letterCombinations("23"));