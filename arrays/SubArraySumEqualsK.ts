

const subarraySum = (a: number[], k: number)            =>{
    let count=0;
    const map = new Map();
    map.set(0,1);
    let sum = 0;
    for(let num of a){
        sum+=num;
        if(map.has(sum-k)){
            count+=map.get(sum-k);
        }
        map.set(sum, (map.get(sum)||0)+1);
    }

    return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2
console.log(subarraySum([1, 2, 3], 3)); // 2
console.log(subarraySum([1, 2, 3], 5)); // 1