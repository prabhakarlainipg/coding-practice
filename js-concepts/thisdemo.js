//The value of this is decided at runtime based on how the function is called.

//console.log(this); // {} in node env, but prints window object when running in browser

/*
const name='Sujatha';

const user = {
    name: "Prabhakar",

    sayName: function () {
        console.log(this.name);
    }
};

const user2 = {
    name: "Prabhakar",

    sayName: () => {
        console.log(this.name);
    } //Arrow function does not get this from caller.
};

user.sayName();

user.sayName();

const  fn  = user.sayName;

 fn(); // undefined , There is no object before the dot. So this is not user. The connection was lost.

user2.sayName(); //Because arrow function does not get this from user. It takes this from outside, usually global scope.
    //So for object methods, avoid arrow function if you need this.


//Nested Function Problem - this can be fixed using SELF object or using Arrow Functions
const user3 = {
    name: "Prabhakar",

    sayName: function () {
        function inner() {
            console.log(this.name);
        }

        inner(); // But inner() is called like normal function, So this inside inner is not user.
    } //Inside sayName, this is user.
};

user3.sayName();

const user4 = {
    name: "Prabhakar",

    sayName: function () {
        const self = this;

        function inner() {
            console.log(self.name);
        }

        inner();
    }
};

user4.sayName(); // Prabhakar

const user5 = {
    name: "Prabhakar",

    sayName: function () {
        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};

user5.sayName(); // Prabhakar


const user6 = {
    name: "Prabhakar",

    sayName: function () {
        setTimeout(function () {
            console.log(this.name);
        }, 1000); //The callback is a normal function. It does not automatically use user.
    }
};

user6.sayName();

const user7 = {
    name: "Prabhakar",

    sayName: function () {
        const self =  this;
        setTimeout(function () {
            console.log(self.name);
        }, 1000); //FIx with Self Object.
    }
};

user7.sayName();

const user8 = {
    name: "Prabhakar",

    sayName: function () {
        setTimeout( ()=> {
            console.log(this.name);
        }, 1000); //FIx with Arrow Functions.
    }
};

user8.sayName();
*/



class User {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

const user9 = new User("Prabhakar");
console.log("---.bind demo---")
const fn9 = user9.sayName.bind(user9); //bind permanently sets this.
fn9();

console.log("---.call demo---")
user9.sayName.call(user9); //calls immediately, comma params

console.log("---.apply demo---")
user9.sayName.apply(user9); //calls immediately, array params


const obj = {
    value: 10
};

function printValue() {
    console.log(this.value);
}

const fn = printValue.bind(obj);
fn();
fn.call({ value: 50 }); //Because once function is bound with bind, its this cannot be changed by call or apply.


