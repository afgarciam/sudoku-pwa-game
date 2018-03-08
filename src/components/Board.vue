<template>
<div>
  <div class="row justify-content-sm-center">
    <div class="controls">
      <button class="btn btn-control" @click="unsetNumber"><i class="fa fa-eraser"></i> </button>
      <button @click="savePuzzleRemote" class="btn btn-control"><i class="fa fa-save"></i> </button>
      <button @click="resetBoard" class="btn btn-control"><i class="fa fa-recycle"></i> </button>
      <button @click="checkBoard" class="btn btn-control"> <i class="fa fa-check"></i> </button>
    </div>
  </div>


    <table border="1" id="tbl" ref="tbl" style="margin:auto;" v-if="renderTable">
        <colgroup>
            <col span="2">
            <col class="border-right">
            <col span="2">
            <col class="border-right">
        </colgroup>
        <tr v-for="i in arrNumbers">
          <td v-for="j in [8,7,6,5,4,3,2,1,0]" :id="((i*9)-j)-1" :class="[puzzle.puzzle[((i*9)-j)-1]===null?'':blockClass]" @click="clickCell">
            {{puzzle.board[((i*9)-j)-1]}}
          </td>
        </tr>
    </table>
    <div class="row justify-content-center">
      <div class="button-container btn-group" role="group">
            <button @click="setNumber" class="btn btn-number" v-for="i in [1,2,3,4,5,6,7,8,9]">{{i}}</button>
      </div>
    </div>
</div>
</template>

<script>
import { BoardService } from "../services/BoardService.js"
export default {
  name: "Board",
  beforeCreate: async function(){
    await BoardService.getPuzzle().then(val => {
        let data = val.docs[0].data()
        data.id = val.docs[0].id
        localStorage.setItem('puzzle', JSON.stringify(data))
      }).catch(err => {
        let data = BoardService.generatePuzzle()
        localStorage.setItem('puzzle', JSON.stringify(data))
      })
      this.puzzle = JSON.parse(localStorage.getItem('puzzle'))
      this.renderTable = true;
  },
  mounted(){
    this.$parent.setTitle('Board')
  },
  data() {
    return {
      blockClass: "block",
      puzzle:JSON.parse(localStorage.getItem('puzzle')),
      arrNumbers:[1,2,3,4,5,6,7,8,9],
      renderTable:false,
      table: undefined,
      cells:undefined,
      rows:undefined,
      selectedCell:-1,
      selectedRow :-1
    };
  },
  methods:{
    savePuzzleRemote:function(event){
      BoardService.savePuzzleRemote()
    },
    resetBoard:function(event){
     this.puzzle = BoardService.generatePuzzle()
    },
    checkBoard:function(event){
      BoardService.checkBoard()
    },
    clickCell:function(event){
        if (event.target.classList.contains('block')) {
          return;
        }

        this.clearTableBg();
        event.target.parentNode.classList.add('bg-row');
        this.setTableBgColumn(event.target.cellIndex);
        this.selectedCell = event.target.id;
        event.target.classList.add('bg-active');
    },
    setTableBgColumn:function(cellIdx){
      let rows = document.querySelectorAll('tr')
       for (var j = 0; j < rows.length; j++) {
        rows[j].cells[cellIdx].classList.add('bg-col');
      }
    },
    clearTableBg:function(){
      let cells = document.querySelectorAll('td')
      for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove('bg-col');
        cells[i].classList.remove('bg-active');
        cells[i].parentNode.classList.remove('bg-row');
      }
    },
    setNumber:function(event){
       if (this.selectedCell >= 0) {
        document.getElementById(this.selectedCell).innerText = event.target.innerText
        let localPuzzle = JSON.parse(window.localStorage.getItem('puzzle'))
        localPuzzle.board[this.selectedCell] = parseInt(event.target.innerText)
        localPuzzle.updated = new Date().toISOString()
        window.localStorage.setItem('puzzle', JSON.stringify(localPuzzle))
        this.clearTableBg()
        this.selectedCell = -1
      }
    },
    unsetNumber:function(event){
      if (this.selectedCell >= 0) {
        document.getElementById(this.selectedCell).innerText = ''
        let localPuzzle = JSON.parse(window.localStorage.getItem('puzzle'))
        localPuzzle.board[this.selectedCell] = null;
        localPuzzle.updated = new Date().toISOString()
        window.localStorage.setItem('puzzle', JSON.stringify(localPuzzle))
        this.clearTableBg()
        this.selectedCell = -1
      }
    }
  }
};
</script>

<style scoped>
.bg-row {
  background-color: #F7FFE8;
}

.bg-col {
  background-color: #F7FFE8;
}

.bg-active {
  background-color: #E37462 ;
  color:#F7FFE8 !important;
}

.block {
  background-color: rgba(0, 0, 0, .3);
  color: #F7FFE8!important;
  cursor: not-allowed !important;
}

.border-right {
  border-right: solid 2px #675A69 !important;
}

.btn-number{
  font-family: Luckiest Guy;
  color: #E37462;
  font-size: 1.5rem;
  height: 40px;
  vertical-align:middle;
}

.btn-control{
  font-family: Passero One;
  font-size: 1rem;
  color: #E37462;
}

.button-container {
  margin-top: 5px;
}


.controls{
  margin: 10px auto;
}

#tbl tr td {
  cursor: pointer;
  font-family: Luckiest Guy;
  font-size: 1.5rem;
  line-height: 1;
  height: 35px;
  width: 40px;
  color: #E37462;
  text-align: center;
  vertical-align: middle;
}

#tbl tr:nth-child(5),
tr:nth-child(8) {
  border-top: solid 2px #675A69;
}
</style>
