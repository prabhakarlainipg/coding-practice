
const findPeakElement = (a:number[]) => {
    let left =0;
    let right = a.length-1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if(a[mid] < a[mid+1])
            left= mid+1;
        else
            right=mid;
    }
    return a[left];
}


console.log(findPeakElement([1, 2, 3, 1])); // 3