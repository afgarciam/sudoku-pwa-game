<template>
<div>
    <div class="controls">
      <button @click="savePuzzleRemote" class="btn btn-save">Save <i class="fa fa-save"></i> </button>
    </div>
    <hr>
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
    <div class="button-container">
            <button onclick="setNumber(this)" class="btn btn-number" v-for="i in [1,2,3,4,5,6,7,8,9]">{{i}}</button>
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
      console.log('save puzzle on firebase')
      BoardService.savePuzzleRemote()
    }
  }
};
</script>

<style scoped>
.bg-row {
  background-color: #A2D8A7;
}

.bg-col {
  background-color: #A2D8A7;
}

.bg-active {
  background-color: #B60050;
}

.block {
  background-color: #675A69;
  color: #F7FFE8 !important;
  cursor: not-allowed !important;
}

.border-right {
  border-right: solid 2px #000 !important;
}

.btn-number{
  font-family: Luckiest Guy;
  font-size: 1.5rem;
  line-height: 1;
  margin: 2px;
  color: #E37462;
}

.btn-save{
  font-family: Passero One;
  font-size: 2.5rem;
  color: #675A69;
}

.button-container {
  /* width: 360px; */
  margin: 20px auto;
}

#tbl tr td {
  cursor: pointer;
  font-family: Luckiest Guy;
  font-size: 2rem;
  line-height: 1;
  padding: .5rem .8rem;
  color: #E37462;
}

#tbl tr:nth-child(5),
tr:nth-child(8) {
  border-top: solid 2px #000;
}
</style>
