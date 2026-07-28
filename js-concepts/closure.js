

//Closure = function + remembered outer variables
//A closure allows an inner function to access and remember
// variables from its outer lexical scope even after the outer function has returned.

const myCounter =  ()=>{
    let counter=0;

    const increment = ()=>{
        counter++;
        console.log(counter);
    }
    const decrement = ()=>{
        counter--;
        console.log(counter);
    }
     return {
        increment ,
         decrement
     }
}

const counter =  myCounter();
counter.increment(); // increment inner function still has access to counter variable declared in the myCounter closure
counter.increment(); // but cannot access counter.counter directly.. this way we can have encapsulation
                        // and maintain state persistence
counter.decrement();





function createBankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },

        withdraw(amount) {
            balance -= amount;
            return balance;
        },

        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);

console.log(account.deposit(500));  // 1500
console.log(account.withdraw(200)); // 1300
console.log(account.getBalance());  // 1300




function multiplyBy(multiplier) {
    return function (number) {
        return number * multiplier;
    };
}

const double = multiplyBy(2); //double remembers multiplier = 2
const triple = multiplyBy(3); // triple remembers multiplier = 3

console.log(double(5)); // 10
console.log(triple(5)); // 15

