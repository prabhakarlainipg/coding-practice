const memoize = (fn)=>{

    const cache =  new Map();

    //returned function is closed over the cache, so chache survives between the calls.
    return function myFunction(...args){

        let key = JSON.stringify(args);

        if(cache.get(key)) return cache.get(key);

        const result =  fn.apply(this, args);

        cache.set(key, result);

        return result;

    }
}

const calculateMultiply = memoize((number)=>{

    console.log("Calculating");
    return number*number;

})

console.log(calculateMultiply(5));
console.log(calculateMultiply(5));