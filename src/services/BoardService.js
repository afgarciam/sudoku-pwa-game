import firestore from './FirebaseService'
import sudoku from 'sudoku'


const currentPuzzles = 'currentPuzzles'

export const BoardService = {
  getPuzzle() {
    let localPuzzle = window.localStorage.getItem('puzzle')
    if (localPuzzle) {
      return this.boardFromSingleArray(JSON.parse(localPuzzle).puzzleBoard)
    } else {
      return this.generatePuzzle()
    }
  },

  //generate new puzzle from sudoku library
  generatePuzzle() {
    let puzzle = sudoku.makepuzzle()
    let puzzleRate = sudoku.ratepuzzle(puzzle, 4)
    let puzzleSolution = sudoku.solvepuzzle(puzzle)

    let object = {
      id: null,
      user: null,
      generated: new Date().toISOString(),
      updated: new Date().toISOString(),
      puzzleGenerated: puzzle,
      puzzleRate: puzzleRate,
      puzzleSolution: puzzleSolution,
      puzzleBoard: puzzle
    }

    window.localStorage.setItem('puzzle', JSON.stringify(object))

    let board = this.boardFromSingleArray(object.puzzleGenerated)
    window.localStorage.setItem('board', JSON.stringify(board))

    return board;
  },

  //save current board on firebase
  savePuzzleRemote() {
    let puzzle = JSON.parse(window.localStorage.getItem('puzzle'))
    if (puzzle.id === null) {
      puzzle.puzzleBoard = this.boardToSingleArray(JSON.parse(window.localStorage.getItem('board')))
      firestore.collection(currentPuzzles).add(puzzle).then(docRef => {
        docRef.update({ id: docRef.id })
        puzzle.id = docRef.id
        console.log(puzzle)
        window.localStorage.removeItem('puzzle')
        window.localStorage.setItem('puzzle', JSON.stringify(puzzle))
      })
    } else {
      puzzle.puzzleBoard = this.boardToSingleArray(JSON.parse(window.localStorage.getItem('board')))
      puzzle.updated = new Date().toISOString()
      firestore.collection(currentPuzzles).doc(puzzle.id).update(puzzle).then(docRef => {
        window.localStorage.removeItem('puzzle')
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
  }
}
