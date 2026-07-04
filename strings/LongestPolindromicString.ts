

const expand = (data:string, left:number, right:number) => {
    while(data[left]==data[right] && left>=0 && right<data.length){
        left--;
        right++;
    }
    return data.slice(left+1, right);
}


const longestPalindrome = (str: string) => {

    let result = '';
    for(let i = 0; i < str.length; i++) {
        let odd = expand(str, i, i);

        let even = expand(str, i,i+1);

        if(odd.length > result.length){
            result = odd;
        }
        if(even.length > result.length){
            result = even;
        }

    }
    return result;
}




console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // "bb"