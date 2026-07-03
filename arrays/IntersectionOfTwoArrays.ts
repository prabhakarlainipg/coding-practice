const intersection = (a1: number[], a2 : number[]) =>{
    let a1Set =  new Set(a1);
    let result = new Set();

    for( let num of a2){
        if( a1Set.has(num) ){
            result.add(num);
        }
    }
    return [...result];
}

console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]