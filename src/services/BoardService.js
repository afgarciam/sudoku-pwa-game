import firestore from './FirebaseService'
import sudoku from 'sudoku'


const currentPuzzles = 'currentPuzzles'

export const BoardService = {
  getPuzzle() {
    let localPuzzle = window.localStorage.getItem('puzzle')
    if (localPuzzle) {
      let localBoard = JSON.parse(localPuzzle)
      return localBoard
    } else {
      return this.generatePuzzle()
    }
  },

  //generate new puzzle from sudoku library
  generatePuzzle() {
    let puzzleGenerated = sudoku.makepuzzle()
    let puzzleRate = sudoku.ratepuzzle(puzzle, 4)

    let puzzle = {
      id: null,
      user: null,
      generated: new Date().toISOString(),
      updated: new Date().toISOString(),
      puzzle: puzzleGenerated,
      rate: puzzleRate,
      board: puzzleGenerated.map(this.humanBoard)
    }

    window.localStorage.setItem('puzzle', JSON.stringify(puzzle))

    // let board = this.boardFromSingleArray(object.puzzleGenerated)
    // window.localStorage.setItem('board', JSON.stringify(board))

    return puzzle;
  },

  //save current board on firebase
  savePuzzleRemote() {
    let puzzle = JSON.parse(window.localStorage.getItem('puzzle'))
    if (puzzle.id === null) {
      // puzzle.puzzleBoard = this.boardToSingleArray(JSON.parse(window.localStorage.getItem('board')))
      firestore.collection(currentPuzzles).add(puzzle).then(docRef => {
        docRef.update({ id: docRef.id })
        puzzle.id = docRef.id
        window.localStorage.setItem('puzzle', JSON.stringify(puzzle))
      })
    } else {
      // puzzle.puzzleBoard = this.boardToSingleArray(JSON.parse(window.localStorage.getItem('board')))
      puzzle.updated = new Date().toISOString()
      firestore.collection(currentPuzzles).doc(puzzle.id).update(puzzle).then(docRef => {
        window.localStorage.setItem('puzzle', JSON.stringify(puzzle))
      })
    }

  },

  //convert board (nested array) in sigle array to save on firestore
  boardToSingleArray(puzzleBoard) {
    let pos = 0;
    let array = []
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        array[pos] = parseInt(puzzleBoard[i][j])-1
        pos++;
      }
    }
    return array
  },

  //convert single array to nested array to print in view
  boardFromSingleArray(puzzle) {
    let puzzleBoard = []
    let puzzleRow = []
    let countPos = 1;
    let countRow = 0;
    for (let i = 0; i < puzzle.length; i++) {
      let number = puzzle[i] !== null ? parseInt(puzzle[i]) + 1 : null;
      puzzleRow.push(number)
      if (countPos === 9) {
        puzzleBoard[countRow] = puzzleRow
        puzzleRow = []
        countPos = 1
        countRow++
      }
      else {
        countPos++
      }
    }
    return puzzleBoard
  },

  humanBoard(el){
    if(el!= null){
      el++;
    }
    return el
  }
}
