

const removeDuplicates = (str:string) => {
    let result='';
    let set = new Set();
    for(let c of str){
        if(!set.has(c)){
            set.add(c);
            result+=c;
        }
    }
    return result;

}

console.log(removeDuplicates("programming")); // "progamin"