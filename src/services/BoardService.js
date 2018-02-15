import sudoku from 'sudoku'



export const BoardService = {
  getPuzzle() {
    let puzzle = []
    let puzzleRow = []
    let countPos = 1;
    let countRow = 0;
    let puzzleGenerated = sudoku.makepuzzle()

    for (let i = 0; i < puzzleGenerated.length; i++) {
      let number = puzzleGenerated[i] !== null ? parseInt(puzzleGenerated[i]) + 1 : null;
      puzzleRow.push(number)
      if (countPos === 9) {
        puzzle[countRow] = puzzleRow
        puzzleRow = []
        countPos = 1
        countRow++
      }
      else {
        countPos++
      }
    }
    // console.log(puzzleGenerated)
    // console.log(puzzle)
    return puzzle;
  }
}
