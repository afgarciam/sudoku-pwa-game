table = document.querySelector('#tbl');
cells = table.querySelectorAll('td');
rows = table.querySelectorAll('tr');
selectedCell = -1;
selectedRow = -1;

(function () {
  initUI()
  if ('serviceWorker' in navigator) {
    console.log('install service worker');
    navigator.serviceWorker.register('/static/sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
    window.addEventListener('load', function () {

    });
  }
}())

function initUI() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', clickCell);
  }
}

function clickCell(e) {
  if (e.target.classList.contains('block')) {
    return;
  }

  clearTableBg();
  e.target.parentNode.classList.add('bg-row');
  setTableBgColumn(e.target.cellIndex);
  selectedCell = e.target.id;
  e.target.classList.add('bg-active');
}

function clearTableBg() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove('bg-col');
    cells[i].classList.remove('bg-active');
    cells[i].parentNode.classList.remove('bg-row');
  }
}

function setTableBgColumn(cellIdx) {
  for (var j = 0; j < rows.length; j++) {
    rows[j].cells[cellIdx].classList.add('bg-col');
  }
}

function setNumber(target) {
  if (selectedCell >= 0) {
    document.getElementById(selectedCell).innerText = target.innerText
    var localPuzzle = JSON.parse(window.localStorage.getItem('puzzle'))
    localPuzzle.board[selectedCell] = parseInt(target.innerText)
    localPuzzle.updated = new Date().toISOString()
    window.localStorage.setItem('puzzle', JSON.stringify(localPuzzle))
    clearTableBg()
    selectedCell = -1
  }
}


function unsetNumber() {
  if (selectedCell >= 0) {
    document.getElementById(selectedCell).innerText = ''
    var localPuzzle = JSON.parse(window.localStorage.getItem('puzzle'))
    localPuzzle.board[selectedCell] = null;
    localPuzzle.updated = new Date().toISOString()
    window.localStorage.setItem('puzzle', JSON.stringify(localPuzzle))
    clearTableBg()
    selectedCell = -1
  }
}
