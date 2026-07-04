

const firstUniqueCharacter = (str: string) => {
    let count:{[key:string]:number} = {};
    for(let char of str){
        if(!count[char])
            count[char] = 1;
        else count[char] = count[char]+1;
    }
    for(let i = 0; i < str.length; i++){
        if(count[str[i]]==1) return str[i];
    }
    return -1;

}

console.log(firstUniqueCharacter("ababbcdc"));