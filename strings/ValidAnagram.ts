
const isAnagram = (src: string, trt: string) => {
    if(src.length !== trt.length) { return false;}
     const count : {[key: string]: number} = {};
    for (let c of src){
        count[c]= count[c] ? count[c] + 1 : 1;
    }
    for(let c of trt){
        if(!count[c]){ return false;}
        count[c]--;
    }
    return true;

}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));