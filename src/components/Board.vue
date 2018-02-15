<template>
<div>
    <div class="controls">
      <button @click="savePuzzleRemote" class="btn">Save</button>
    </div>
    <hr>
    <table border="1" id="tbl" style="margin:auto;">
        <colgroup>
            <col span="2">
            <col class="border-right">
            <col span="2">
            <col class="border-right">
        </colgroup>
        <!-- eslint-disable no-new "-->
        <tr v-for="i in [0,1,2,3,4,5,6,7,8]">
          <td v-for="j in [0,1,2,3,4,5,6,7,8]"  :class="[puzzle[i][j]===null?'':blockClass]">{{puzzle[i][j]}}</td>
        </tr>
    </table>
    <div class="button-container">
            <button onclick="setNumber(this)" class="btn" v-for="i in [1,2,3,4,5,6,7,8,9]">{{i}}</button>
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
      puzzle: BoardService.getPuzzle()
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
  background-color: blanchedalmond;
}

.bg-col {
  background-color: blanchedalmond;
}

.bg-active {
  background-color: darkgoldenrod;
}

.block {
  background-color: #ddd;
  cursor: not-allowed !important;
}

.border-right {
  border-right: solid 2px #000 !important;
}

.button-container {
  width: 340px;
  margin: 20px auto;
}

#tbl tr td {
  cursor: pointer;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  width: 40px;
}

#tbl tr:nth-child(5),
tr:nth-child(8) {
  border-top: solid 2px #000;
}
</style>
