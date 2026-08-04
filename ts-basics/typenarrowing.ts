

const id : string | number = 10;
const name  : string | number = "prabhakar";

//typeof for primitives
if(typeof id === "number") console.log(id.toFixed());
if(typeof name === "string") console.log(name.toUpperCase());



class Dog {
    bark() {
        console.log("Bark");
    }
}

class Cat {
    meow() {
        console.log("Meow");
    }
}
//instanceof for objects
function speak(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
speak(new Dog());
speak(new Cat());

//in operator narrowing
type Admin = {
    role: "admin";
    permissions: string[];
};

type User = {
    role: "user";
    email: string;
};

function printAccount(account: Admin | User) {
    if ("permissions" in account) {
        console.log(account.permissions);
    } else {
        console.log(account.email);
    }
}

printAccount({role: "admin", "permissions":["create", "update"]});
printAccount({role: "user", "email":"prabhakar@gmail.com"});


function handleStatus(status: "loading" | "success" | "error") {
    if (status === "loading") {
        console.log("Show loader");
    } else if (status === "success") {
        console.log("Show data");
    } else {
        console.log("Show error");
    }
}

handleStatus("loading");



type ApiState =
    | { status: "loading" }
    | { status: "empty" }
    | { status: "success"; data: string[] }
    | { status: "error"; error: string };

function render(state: ApiState) {
    switch (state.status) {
        case "loading":
            return "Loading...";

        case "success":
            return state.data.join(", ");

        case "error":
            return state.error;

        default:
           // const exhaustiveCheck: never = state;
          //  return exhaustiveCheck;
            return state;
    }
}

console.log(render({status: "empty"}));

//Array Narrowing using isArray
function printValue(value: string | string[]) {
    if (Array.isArray(value)) {
        value.forEach(item => console.log(item));
    } else {
        console.log(value.toUpperCase());
    }
}

printValue("hello");
printValue(["hello", "prabhakar"]);


export {};