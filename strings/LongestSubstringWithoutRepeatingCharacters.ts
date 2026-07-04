
const lengthOfLongestSubstring = (str : string) : number=>{
    let left=0;
    let maxLength = 0;
    let set = new Set();
    for(let right=0; right<str.length; right++){
        while(set.has(str[right])){
         set.delete(str[left]);
        left++;
        }
    set.add(str[right]);
    maxLength = Math.max(maxLength, right-left+1);
    }
    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));