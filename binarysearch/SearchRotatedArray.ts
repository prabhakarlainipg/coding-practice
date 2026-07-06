

const searchRotatedArray = (ar:number[], target: number) => {

    let left=0;
    let right = ar.length-1;
    while (left <= right) {
        let mid = Math.floor((left+right) / 2);
        if(ar[mid]===target){
            return mid;
        }
        if(ar[left] <= ar[mid]){ //first half is sorted
            if(ar[left] <= target && target < ar[mid]){
                right = mid-1;
            }
            else left=mid+1;
        }
        else{ // if not first half is sorted, second half must be sorted
            if(ar[mid] < target && target <= ar[right]){
                left = mid+1;
            }
            else right=mid-1;
        }
    }
    return -1;
}


console.log(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 3)); // -1