const bad = 7;

function isBadVersion(version : number) {
    return version >= bad;
}


const firstBadVersion = (version : number) =>{
    let result = 0;
let left=1;
let right=version;
while(left<right){
    let mid=Math.floor((left+right)/2);
    if(isBadVersion(mid)){
        right=mid;
    }
    else{
        left=mid+1;
    }
}
    return left;
}

console.log(firstBadVersion(15)); // 7

