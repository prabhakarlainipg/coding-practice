

const splitArrayMinimumPossibleLargestSubArraySum = (a:number[], noOfArrays:number) =>{

    let left = Math.max(...a);
    let right = a.reduce((a, b) => a + b, 0);
    let answer =  right;
    while(left<=right){
        let maxSumAllowed = Math.floor((left+right)/2);

        let currentSum= 0;
        let subArrays = 1;

        for(let num of a){
            if(currentSum + num > maxSumAllowed){
                subArrays += 1;
                currentSum = 0;
            }
            currentSum+=num;
        }

        if(subArrays <=noOfArrays){
            answer = maxSumAllowed;
            right = maxSumAllowed-1;
        }else{
            left=maxSumAllowed+1;
        }

    }

    return answer;
}



console.log(splitArrayMinimumPossibleLargestSubArraySum([7, 2, 5, 10, 8], 2)); // 18