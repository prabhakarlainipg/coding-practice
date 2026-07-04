
const longestCommonPrefix = (str: string[]) => {
    let lcp : string = str[0];
    for (let i = 1; i < str.length; i++) {
        while(!str[i].startsWith(lcp) && lcp.length > 0) {
            lcp = lcp.slice(0, lcp.length - 1);
        }
    }
return lcp.length > 0?lcp:'NOT_FOUND';
}


console.log(longestCommonPrefix(["flower", "flow", "flight"]));
// "fl"

console.log(longestCommonPrefix(["dog", "racecar", "car"])); //""