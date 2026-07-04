
const isRotation = (s: string, t: string)=>{

    if(s.length != t.length){ return false }
    return (s+s).includes(t);
}




console.log(isRotation("abcde", "cdeab")); // true
console.log(isRotation("abcde", "abced")); // false