
const rotate = (ar: number[], k : number) => {
    k = k % ar.length;

    // 1.reverse whole array
    reverse(ar, 0, ar.length-1);
    //2. reverse first k elements
    reverse(ar, 0, k-1);
    //3. reverse remaining elements
    reverse(ar, k, ar.length-1);
    return ar;
}

const reverse = (ar: number[], start:number, end: number) => {
    while(start<end){
        let temp = ar[start];
        ar[start] = ar[end];
        ar[end] = temp;
        start++;
        end--;
    }
    return ar;
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
