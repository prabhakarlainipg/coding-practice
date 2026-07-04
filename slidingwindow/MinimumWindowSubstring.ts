


//O(n*m*n) time complexity.. not optimal
const minWindow = (s:string, t: string) => {

    let result ='';
    let left=0;
    let right=left+(t.length-1);
    for (let i=right; i<=s.length;i++ ) {
       while( (t.split('')).every(c=> s.slice(left, i).includes(c))){
           if(result=='') result=s.slice(left, i);
           else if(s.slice(left, i).length < result.length){
               result= s.slice(left, i);
           }
           left++;
       }
    }
    return result;
}

const minWindowOptimalSolution = (s:string, t: string) => {
    let minLength= Infinity;
    let need = new Map();
    for(let c of t){
        need.set(c,((need.get(c)||0)+1));
    }
    let window= new Map();
    let matched=0;
    let left=0;
    let start=0;
    for(let right=0; right < s.length; right++){
        let rightChar= s[right];
        window.set(rightChar, (window.get(rightChar)||0) +1);
        if(need.has(rightChar) && window.get(rightChar) <= need.get(rightChar) ){
            matched++;
        }
        while(matched===t.length){
    if(right-left+1 < minLength){
    minLength = right-left+1;
    start= left;
    }

    let leftChar = s[left];
    window.set(leftChar, window.get(leftChar) - 1);

    if(need.has(leftChar) && window.get(leftChar) < need.get(leftChar) ){
        matched--;
    }
    left++;
        }

    }
    return s.slice(start, start+minLength)
}
console.log(minWindowOptimalSolution("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"