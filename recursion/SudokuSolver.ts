
const solveSudoku =(board : string[][])=>{

    const isValid = (r:number, c:number, char:string) => {
        for (let i = 0; i < 9; i++) {
            if (board[r][i] === char) return false;
            if (board[i][c] === char) return false;

            const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(c / 3) + (i % 3);

            if (board[boxRow][boxCol] === char) return false;
        }
        return true;
    }

    const backtrack = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if(board[row][col]==='.'){
                    for(let num=1; num<=9; num++){
                        let char = String(num);
                        if(isValid(row, col, char)) {
                            board[row][col] = char;
                            if(backtrack()){
                                return true;
                            }
                            board[row][col] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    backtrack();
    return board;
}



const board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

console.log(solveSudoku(board));
