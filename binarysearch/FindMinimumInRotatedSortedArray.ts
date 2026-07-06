

const findMin =(a:number[])=>{

    let left=0;
    let right = a.length-1;
    while(left<right){
        let mid = Math.floor(left+right)/2;
        if(a[mid]>a[right]){
            left=mid+1;
        }else
            right=mid;
    }
    return a[left];
}
console.log(findMin([3, 4, 5, 1, 2])); // 1
console.log(findMin([23, 25, 26, 27, 28])); // 23