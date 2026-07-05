
const reverseString = (str: string) => {
     let left=0;
     let right=str.length-1;
    const chars = str.split('');

    while(left<right){
         [chars[left], chars[right]] = [chars[right], chars[left]];
         left++;
         right--;
     }
     return chars.join('');
}

console.log(reverseString("hello"));