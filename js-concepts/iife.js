(function greet(name){
    console.log(`Hello ${name}`);
})('Prabhakar');


for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0);
}

//with IIFE, this problem will be resolved.
for (var i = 0; i < 3; i++) {
    (function (currentValue) {
        setTimeout(() => {
            console.log(currentValue);
        }, 0);
    })(i);
}


(() => {
    console.log("Arrow IIFE");
})();



((name) => {
    console.log(`Hello, ${name}`);
})("Alice");



const counter = (function () {
    let count = 0;

    return {
        increment() {
            count += 1;
            return count;
        },

        getCount() {

            return count;
        },
    };
})();

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.getCount());