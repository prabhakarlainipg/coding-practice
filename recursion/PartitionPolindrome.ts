

const partitionPalindrome = (p:string) => {

    let result:string[][] = [];

    const isPalindrome =(s:string) => {
        let left=0;
        let right = s.length-1;
        while(left<right){
            if(s[left] != s[right]){ return false;}
            left++;
            right--;
        }
        return true;
    }

    const backtrack = (index:number, current:string[]) => {
        if(index== p.length){
            result.push([...current]);
            return;
        }
        for(let i=index; i<p.length;i++){
            let part  = p.slice(index, i+1);
            if(isPalindrome(part)){
                current.push(part);
                backtrack(i+1, current);
                current.pop();
            }
        }
    }
    backtrack(0,[]);
    return result;

}

console.log(partitionPalindrome("aab"));