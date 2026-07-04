
/*AT EVERY NUMBER-----
    Should I start a new subarray from current number?
    or
    Should I continue the previous subarray?*/

const maxSubArray = (ar : number[])=>{
    let maxSum= ar[0];
    let currentSum= ar[0];
    for(let i = 1; i <= ar.length-1; i++){
currentSum = Math.max(ar[i], currentSum + ar[i]);
maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6