
class User {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }

    getName() {
        return this.name;
    } // this method is not copied to every object, instead stores on User.prototype

    increment() {
        this.count++; //points to the object before the dot
        console.log(this.count);
    }
}

const u   = new User("Prabhakar");
console.log(u.getName());
console.log(u.hasOwnProperty("getName")); //false
console.log(u.hasOwnProperty("name"));// each object has its own name property
u.increment();
u.increment();


//Static methods belong to class itself, not object.
class MathHelper {
    static add(a, b) {
        return a + b;
    }
}
console.log(MathHelper.add(1,4));

const helper = new MathHelper();
//helper.add(2,3); Reference Error, You cannot call static method on instance:


class UserUtils {
    static formatName(name) {
        return name.trim().toUpperCase()
    }
}
console.log(UserUtils.formatName("prabhakar"));


class BankAccount {
    #balance = 0;

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}
const bankAccount = new BankAccount();
bankAccount.deposit(100);
console.log(bankAccount.getBalance());
//console.log(account.#balance); //Private fields cannot be accessed outside class.


