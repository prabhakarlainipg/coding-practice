

const findMaximumSumOfSubArray = (a:number[], k: number) => {

    let maximumSum = 0;
    const prefixSumMap = new Map();
    let sum = 0;
    prefixSumMap.set(0,0); //space O(n)
    for(let i = 0; i < a.length; i++) { //time O(n)
        sum+=a[i];
        prefixSumMap.set(i+1, sum);
        if(i>=(k-1)){
            maximumSum = Math.max(maximumSum, sum - prefixSumMap.get(i-(k-1)));
        }
    }

    return maximumSum;
}

const findMaximumSumOfSubArrayUsingSlidingWindow = (a:number[], k: number) => {

    let maximumSum = 0;
    let windowSum = 0; //space O(1)

    for(let i = 0; i < a.length; i++) { //time O(n)
        windowSum+=a[i];
        if(i>=(k-1)){
            maximumSum = Math.max(maximumSum, windowSum);
            windowSum-= a[i-(k-1)];
        }
    }
    return maximumSum;

}

console.log(findMaximumSumOfSubArray([2,1,5,1,3,2], 3))

console.log(findMaximumSumOfSubArrayUsingSlidingWindow([2,1,5,1,3,2], 3))