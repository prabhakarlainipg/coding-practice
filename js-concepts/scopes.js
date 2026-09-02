

var value = 10;

function test() {
    console.log(value);
    var value = 20;
}

//above function is equivalent to below code
/*function test() {
    var value;

    console.log(value);
    value = 20;
}*/

//JavaScript does not fall back to the global value because a local binding already exists.
test();

/*const price = 100;

{
    console.log(price); // ReferenceError
    const price = 200;
}*/


//Classes are also in the TDZ:
const user = new User(); // ReferenceError

class User {}