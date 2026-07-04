

const countVowels = (str: string) => {

    let count=0;

    const vowels=['a','e','i','o','u'];
    for(let c of str){
        if(vowels.includes(c)){ count++;}
    }

    return count;
}

console.log(countVowels("JavaScript")); // 3