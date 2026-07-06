

const searchInsertPosition = (ar: number[], target: number) => {

    let left=0;
    let right= ar.length-1;
    while(left<=right){
        let mid= Math.floor((left + right) / 2);
        if(ar[mid]==target) return mid;
        if(ar[mid]>target){
            right=mid-1;
        }else left=mid+1;
    }
    return left;
}


console.log(searchInsertPosition([1,3,5,6],2)); //1
console.log(searchInsertPosition([1,3,5,6],5)); //2
console.log(searchInsertPosition([1, 3, 5, 6], 5)); // 2
console.log(searchInsertPosition([1, 3, 5, 6], 2)); // 1
console.log(searchInsertPosition([1, 3, 5, 6], 7)); // 4
console.log(searchInsertPosition([1, 3, 5, 6], 0)); // 0