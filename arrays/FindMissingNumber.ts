const missingNumber =  (ar:number[])=>{
    let n:number = ar.length;
    let targetSum = n* (n+1)/2;
    let actualSum:number = ar.reduce((acc, num)=>acc + num, 0);
    return targetSum-actualSum
}

console.log(missingNumber([3, 0, 1])); // 2