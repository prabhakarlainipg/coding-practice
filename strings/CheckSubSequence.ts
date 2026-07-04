

const isSubsequence = (s: string, t: string)=>{
let start=0;
    for(let i=0; i<t.length; i++){
        if(s[start] == t[i]){
            start++;
        }
        if(start==s.length) return true
    }
    return false;

}

console.log(isSubsequence("abc", "ahbgdc")); // true
console.log(isSubsequence("axc", "ahbgdc")); // false