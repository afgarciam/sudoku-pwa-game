<template>
<div>
  <div class="button-container">
            <button onclick="setNumber(1)" class="btn">1</button>
            <button onclick="setNumber(2)" class="btn">2</button>
            <button onclick="setNumber(3)" class="btn">3</button>
            <button onclick="setNumber(4)" class="btn">4</button>
            <button onclick="setNumber(5)" class="btn">5</button>
            <button onclick="setNumber(6)" class="btn">6</button>
            <button onclick="setNumber(7)" class="btn">7</button>
            <button onclick="setNumber(8)" class="btn">8</button>
            <button onclick="setNumber(9)" class="btn">9</button>
    </div>
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
</div>
</template>

<script>
import {BoardService} from '../services/BoardService.js'
export default {
  name: 'Board',
  mounted(){
let uiScript = document.createElement('script')
    uiScript.setAttribute('src', '/static/ui.js')
    document.head.appendChild(uiScript)
  },
  data () {
    return {
      blockClass:'block',
      msg: 'Welcome to Your Vue.js App',
      puzzle: BoardService.getPuzzle()
    }
  },
  created() {
    // let uiScript = document.createElement('script')
    // uiScript.setAttribute('src', '/static/ui.js')
    // document.head.appendChild(uiScript)
  },
}
</script>

<style scoped>
.bg-row{
    background-color: blanchedalmond;
}

.bg-col{
    background-color: blanchedalmond;
}

.bg-active{
    background-color: darkgoldenrod;
}

.block{
    background-color: #ddd;
    cursor: not-allowed !important;
}

.border-right{
    border-right: solid 2px #000 !important;
}

.button-container{
    width: 340px;
    margin: 20px auto;
}

#tbl tr td{
    cursor: pointer;
    height: 40px;
    text-align: center;
    vertical-align:middle;
    width: 40px;
}

#tbl tr:nth-child(5),tr:nth-child(8){
    border-top: solid 2px #000;
}
</style>
