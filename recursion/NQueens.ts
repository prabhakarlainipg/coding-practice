


const solveNQueens  = (num: number) => {
    let columns : Set<number> =  new Set();
    let dig1:Set<number> =  new Set();
    let dig2:Set<number> =  new Set();

    let result : string[][][] = [];
    let board : string[][] = new Array(num);
    for (let i = 0; i < 4; i++) {
        board[i] = ['.','.','.','.']
    }

    const recursiveFn  = (row: number) => {

        if(row == num){
            result.push(board.map(r=>[...r]));
            return;
        }


        for(let col = 0; col < num; col++) {
            if(columns.has(col) ||
            dig1.has(row+col) ||
            dig2.has(row-col) ){
                continue;
            }

            board[row][col] = 'Q';
            columns.add(col);
            dig1.add(row+col);
            dig2.add(row-col);

            recursiveFn(row+1);

            board[row][col] = '.';
            columns.delete(col);
            dig1.delete(row+col);
            dig2.delete(row-col);
        }
    }

    recursiveFn(0);

    return result;

}



console.log(solveNQueens(4));