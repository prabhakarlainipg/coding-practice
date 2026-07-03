const productExceptSelf = (ar : number[])=>{
    let result=new Array(4).fill(1);

    let leftProduct =1;
    for (let i=0;i<ar.length;i++){
    result [i]=leftProduct;
    leftProduct*=ar[i];
    }

    let rightProduct =1;
    for (let i=ar.length-1;i>=0;i--){
        result [i]*=rightProduct ;
        rightProduct*=ar[i];
    }
    return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]