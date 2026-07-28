/*
var name = "React";
var name = "JavaScript";

console.log(name); // JavaScript
console.log(city);
let country='India';
console.log(country)

var city;
*/

/*
const varFunction = ()=>{
    for(var i = 0; i < 10; i++) //shared variable i for for loop
        setTimeout(()=>{
            console.log(i)
        },1000);
}


const letFunction = ()=>{
    for(let i = 0; i < 10; i++) // create new variable i for each iteration
    setTimeout(()=>{
        console.log(i)
    },1000)
}

varFunction();
letFunction();*/


/*if (true) {
    let a = 10; // these are block scoped
    const b = 20;

    console.log(a);
    console.log(b);
}

function outer() {
    const name = "Prabhakar";

    function inner() {
        console.log(name); // inner function can access variables from outer function (LEXICAL SCOPE)
    }

    inner();
}

outer(); // Prabhakar



const globalName = "Global";

function outer2() {
    const outerName = "Outer";

    function inner2() {
        const innerName = "Inner";

        console.log(globalName);
        console.log(outerName);
        console.log(innerName);
    }

    inner2();
}

outer2();*/



/*const name = "Global";

function test() {
    const name = "Local"; //variable shadowing
    console.log(name);
}

test(); // Local*/


/*
console.log(a); // ReferenceError a is not defined

console.log(b); // ReferenceError*/






/*for (var i = 0; i < 3; i++) {} //i is available outside the loop. Because var is function/global scoped.

console.log(i); // 3*/


var x = 10;

function test() {
    console.log(x);
    var x = 20;
}

test();


/*foo();

var foo = function () {
    console.log("Hello");
};*/




foo2();

function foo2() {
    console.log("Hello");
}
