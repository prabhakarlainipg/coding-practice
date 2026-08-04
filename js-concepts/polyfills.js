

Array.prototype.myIncludes = function (searchValue) {
    for(let i = 0; i < this.length; i++) {
        if(this[i]==searchValue) { return true}
    }
    return false;
}
Array.prototype.myMap = function (callback) {
    let result = [];
    for(let i = 0; i < this.length; i++) {
        result.push(callback(this[i]));
    }
    return result;
}

Array.prototype.myFilter = function (callback) {
    let result = [];
    for(let i = 0; i < this.length; i++) {
        if(callback(this[i]))
        result.push(this[i]);
    }
    return result;
}
console.log([1, 2, 3].myIncludes(2)); // true

console.log([1, 2, 3].myMap(num=>num*2)); //map numbers to multiply by same number

console.log([1, 2, 3].myFilter(num=>num%2!=0)); //odd numbers filter

