<template>
<div>
  <div class="row justify-content-sm-center">
    <div class="controls">
      <button @click="savePuzzleRemote" class="btn btn-control"><i class="fa fa-save"></i> </button>
      <button @click="resetBoard" class="btn btn-control"><i class="fa fa-recycle"></i> </button>
      <button class="btn btn-control"><i class="fa fa-info"></i> </button>
    </div>
  </div>


    <table border="1" id="tbl" style="margin:auto;">
        <colgroup>
            <col span="2">
            <col class="border-right">
            <col span="2">
            <col class="border-right">
        </colgroup>
        <tr v-for="i in [1,2,3,4,5,6,7,8,9]">
          <td v-for="j in [8,7,6,5,4,3,2,1,0]" :id="((i*9)-j)-1" :class="[puzzle.puzzle[((i*9)-j)-1]===null?'':blockClass]">
            {{puzzle.board[((i*9)-j)-1]}}
          </td>
        </tr>
    </table>
    <div class="row justify-content-center">
      <div class="button-container btn-group" role="group">
            <button onclick="setNumber(this)" class="btn btn-number" v-for="i in [1,2,3,4,5,6,7,8,9]">{{i}}</button>
      </div>
    </div>
</div>
</template>

<script>
import { BoardService } from "../services/BoardService.js"
export default {
  name: "Board",
  data() {
    return {
      blockClass: "block",
      puzzle:BoardService.getPuzzle()
    };
  },
  created() {
     let uiScript = document.createElement("script")
    uiScript.setAttribute("src", "/static/ui.js")
    document.head.appendChild(uiScript)
  },
  methods:{
    savePuzzleRemote:function(event){
      BoardService.savePuzzleRemote()
    },
    resetBoard:function(event){
     this.puzzle = BoardService.generatePuzzle()

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
  color: #B60050;
}

.block {
  background-color: #ddd;
  color: #675A69 !important;
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
  height: 40px;
  width: 40px;
  color: #E37462;
  text-align: center;
  vertical-align: middle;
}

#tbl{
  margin: auto;
}

#tbl tr:nth-child(5),
tr:nth-child(8) {
  border-top: solid 2px #675A69;
}
</style>
