import firestore from './FirebaseService'
import sudoku from 'sudoku'


const currentPuzzles = 'currentPuzzles'

export const BoardService = {
  getPuzzle() {
    let localPuzzle = localStorage.getItem('puzzle')
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
    let puzzleRate = sudoku.ratepuzzle(puzzle, 1)
    let userId = localStorage.getItem('userId') ? localStorage.getItem('userId'):null

    let puzzle = {
      id: null,
      user: userId,
      generated: new Date().toISOString(),
      updated: new Date().toISOString(),
      puzzle: puzzleGenerated,
      rate: puzzleRate,
      board: puzzleGenerated.map(this.humanBoard)
    }

    localStorage.setItem('puzzle', JSON.stringify(puzzle))

    return puzzle;
  },

  //save current board on firebase
  savePuzzleRemote() {
    let puzzle = JSON.parse(localStorage.getItem('puzzle'))
    let userId = localStorage.getItem('userId')
    puzzle.userId = userId
    if (puzzle.id === null) {
      firestore.collection(currentPuzzles).add(puzzle).then(docRef => {
        docRef.update({ id: docRef.id })
        puzzle.id = docRef.id
        puzzle.user = userId
        localStorage.setItem('puzzle', JSON.stringify(puzzle))
        alert('Puzzle save success')
      })
    } else {
      puzzle.updated = new Date().toISOString()
      firestore.collection(currentPuzzles).doc(puzzle.id).update(puzzle).then(docRef => {
        puzzle.user = userId
        localStorage.setItem('puzzle', JSON.stringify(puzzle))
        alert('Puzzle update success')
      })
    }
  },

  checkBoard(){
    let currentPuzzle = JSON.parse(localStorage.getItem('puzzle'))
    let currentBoard = currentPuzzle.board
    let solvedCurrentPuzzle = sudoku.solvepuzzle(currentPuzzle.puzzle).map(this.humanBoard)
    let correct = true

    if(currentBoard.includes(null)){
      alert('Board is incomplete')
    }else{
      currentBoard.every((v,i)=>{
        if(v != solvedCurrentPuzzle[i]){
          correct = false
          return
        }
      })

      if(!correct){
        alert('Board solution is incorrect :(')
      }else{
        alert('YEAH!...Board solution is correct :D')
      }
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
