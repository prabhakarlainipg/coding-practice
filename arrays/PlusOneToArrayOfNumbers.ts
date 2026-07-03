const plusOne =    (a: number[])=>{
    for(let i=a.length-1;i>=0;i--) {
        if (a[i] < 9) {
            a[i] = a[i] + 1;
            return a;
        }
        a[i] = 0;
    }
    a.unshift(1);
    return a;
}

console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([9, 9]));    // [1, 0, 0]