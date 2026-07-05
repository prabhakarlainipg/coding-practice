
/*Sort array first.
    Fix one number nums[i].
    Use two pointers to find two more numbers that make sum 0.
Skip duplicates to avoid repeated triplets.*/


const threeSum = (ar: number[]) => {

    let sortedArray = ar.sort((a, b) => a - b);
    let result =[];
    for(let i = 0; i < sortedArray.length-2; i++){
        if (i > 0 && sortedArray[i] === sortedArray[i - 1]) {
            continue;
        }
        let left = i+1;
        let right = sortedArray.length-1;

        while (left < right){
            let sum = sortedArray[i] + sortedArray[left]+sortedArray[right];
            if(sum==0){
                result.push([sortedArray[i], sortedArray[left], sortedArray[right]]);

                while (left < right && sortedArray[left] === sortedArray[left + 1]) {
                    left++;
                }

                while (left < right && sortedArray[right] === sortedArray[right - 1]) {
                    right--;
                }

                left++;
                right--;
            }
            else if (sum < 0){
                left++;
            }
            else {
                right--;
            }
        }
    }
    return result;
}

console.log(threeSum([-1, 0, 1, 1, 2, 2, -1, -4]));