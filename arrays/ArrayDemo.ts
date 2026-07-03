const nestArray = [[1,3], [4,5,[6,7]]];
console.log(nestArray.flat());
console.log(nestArray.flat(Infinity));

/*
reduce() takes an array and reduces it to one final value.
reduce()      -> left to right
reduceRight() -> right to left*/
const words = ["JavaScript", "is", "fun"];

const sentence = words.reduce((acc, curr) => acc + " " + curr,"");

console.log(sentence); // "JavaScript is fun"

const reverseSentence = words.reduceRight((acc, curr) => acc + " " + curr);

console.log(reverseSentence); // "fun is JavaScript"