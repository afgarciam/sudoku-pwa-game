table = document.querySelector('#tbl');
cells = table.querySelectorAll('td');
rows = table.querySelectorAll('tr');
selectedCell = -1;
selectedRow = -1;

(function(){
   for(var i=0; i< cells.length; i++){
       cells[i].addEventListener('click', clickCell);
   }
}())

function clickCell(e){
    if(e.target.classList.contains('block')){
        return;
    }

    clearTableBg();
    e.target.parentNode.classList.add('bg-row');
    setTableBgColumn(e.target.cellIndex);
    selectedCell = e.target.cellIndex;
    selectedRow = e.target.parentNode.rowIndex;
    rows[selectedRow].cells[selectedCell].classList.add('bg-active');
}

function clearTableBg(){
    for(var i=0; i< cells.length; i++){
        cells[i].classList.remove('bg-col');
        cells[i].classList.remove('bg-active');
        cells[i].parentNode.classList.remove('bg-row');
    }
}

function setTableBgColumn(cellIdx){
    for(var j=0; j<rows.length; j++){
        rows[j].cells[cellIdx].classList.add('bg-col');
    }
}

function setNumber(target){
    if(selectedCell >=0 && selectedRow >=0){
        rows[selectedRow].cells[selectedCell].innerText = target.innerText
        var boardLocal = JSON.parse(window.localStorage.getItem('board'))
        boardLocal[selectedRow][selectedCell] = parseInt(target.innerText)
        window.localStorage.removeItem('board')
        window.localStorage.setItem('board',JSON.stringify(boardLocal))
        clearTableBg()
        selectedCell = -1
        selectedRow = -1
    }
}
