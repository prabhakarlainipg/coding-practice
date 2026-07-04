
const isPalindrome = (str: string) => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    console.log(String(cleanStr));
    let left=0;
    let right=cleanStr.length-1;
    while(left < right){
        if(cleanStr[left]!==cleanStr[right]){ return false}
        left++;
        right--;
    }
    return true;
}


console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("Madam")); // true
console.log(isPalindrome("Hello")); // false