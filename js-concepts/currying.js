
function sum(a,b,c){
    return a + b+c;
}


const curry = (fn) => {
    return function curried(...args) {
        if(args.length == fn.length){
            return fn.apply(fn, args);
        }
        return function(...nextArgs){
            return curried(...args, ...nextArgs);
        }
    };
}


let carriedSum = curry(sum);

console.log(carriedSum(1,2,3));
console.log(carriedSum(1)(2,3));
console.log(carriedSum(1)(2)(3));


