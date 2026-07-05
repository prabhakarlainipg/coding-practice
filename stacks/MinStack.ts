class MinStack {
    private stack: number[];
    private minStack: number[];

    constructor() {
        this.stack =[];
        this.minStack = [];
    }

    push(val: number) {
        this.stack.push(val);

        if(this.minStack.length == 0 ||
        val <= this.minStack[this.minStack.length - 1]){
            this.minStack.push(val);
        }
    }

    pop() : number | undefined {
        let removed = this.stack.pop();

        if(removed == this.minStack[this.minStack.length - 1]){
            this.minStack.pop();
        }
        return removed;
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    min(): number {
        return this.minStack[this.minStack.length - 1];
    }
}


const minStack = new MinStack();
minStack.push(5);
minStack.push(2);
minStack.push(7);

console.log(minStack.min()); // 2
console.log(minStack.top());    // 7

minStack.pop();

console.log(minStack.min()); // 2

minStack.pop();

console.log(minStack.min()); // 5