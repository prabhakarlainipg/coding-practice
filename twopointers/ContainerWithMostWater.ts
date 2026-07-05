
const maxArea = (heights: number[]) => {

    let maxWater=0;
let left=0;
let right = heights.length - 1;
while (left < right) {
    let width = right-left;
    let height = Math.min(heights[left], heights[right]);
    maxWater = Math.max(maxWater, width*height);

    if(heights[left] < heights[right]){
        left++;
    }
    else right--;
}

    return maxWater;
}


console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49