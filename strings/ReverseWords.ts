
const reverseWords = (str: string)=>{
    let result = '';
    let strArray = str.trim().split(/\s+/);
    console.log(strArray);
for(let i =strArray.length-1; i>=0; i--){
    result += strArray[i]+" " ;
}
    return result;

}


console.log(reverseWords("the sky is blue"));
// "blue is sky the"

console.log(reverseWords("  hello   world  "));