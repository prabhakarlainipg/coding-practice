
/*If sum is too small, move left forward to increase sum.
    If sum is too large, move right backward to decrease sum.*/


const sortedTwoSum = (ar:number[], target : number) => {
let left=0;
let right=ar.length-1;

while(left < right){
    let sum = ar[left]+ ar[right];
    if(sum==target){
        return [ar[left], ar[right]];
    }
    if(sum < target){
        left++;
    }else right--;
}
    return [];
}

console.log(sortedTwoSum([1, 2, 3, 4, 6], 6)); // [1, 3]

export {};