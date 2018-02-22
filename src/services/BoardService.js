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

    return puzzle;
  },

  //save current board on firebase
  savePuzzleRemote() {
    let puzzle = JSON.parse(window.localStorage.getItem('puzzle'))
    if (puzzle.id === null) {
      firestore.collection(currentPuzzles).add(puzzle).then(docRef => {
        docRef.update({ id: docRef.id })
        puzzle.id = docRef.id
        window.localStorage.setItem('puzzle', JSON.stringify(puzzle))
      })
    } else {
      puzzle.updated = new Date().toISOString()
      firestore.collection(currentPuzzles).doc(puzzle.id).update(puzzle).then(docRef => {
        window.localStorage.setItem('puzzle', JSON.stringify(puzzle))
      })
    }

  },

  resetBoard(){
    let puzzle = JSON.parse(window.localStorage.getItem('puzzle'));
    console.log(puzzle.puzzle)
  },

  humanBoard(el){
    if(el!= null){
      el++;
    }
    return el
  }
}
