let gridHeight;
let gridWidth;
let screen = document.querySelector(`#screen`)


let testArr = [];
let changeArr = [];
let loop=0

function createArray(col) { 
 let arr = [];
 for (let i = 0; i < col; i++) {
  arr[i] = [];
 }
 return arr;
}




// const RandomN = (arr, row) => {
//  for (let i = 0; i < row; i++) arr[i] = Math.floor(Math.random() * 2);
// }

// testArr.forEach(elem => RandomN(elem, gridWidth))
 function  getData(){
fetch('test.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data)
    testArr = data
    changeArr=data
    gridHeight=testArr.length
    gridWidth=testArr[0].length
    console.log(gridWidth)
  })
  }




testArr = createArray(gridHeight)
changeArr = createArray(gridHeight)

getData()


screen.innerHTML = '<ul>' + testArr.map(function (row) {
  return '<li>' + row + '</li>';
}).join('') + '</ul>';





 const updateGrid = ()=>{
let x;
let y;
  for (y = 0; y < gridHeight;y++){
   for(x=0; x<gridWidth;x++){
    let neighborCells=0
    if(y!=0) {neighborCells += testArr[y - 1][x]}
    if (y!=0 && x!=0){neighborCells += testArr[y - 1][x - 1]}
    if (y!=0 && x<gridWidth){neighborCells += testArr[y - 1][x + 1]}
    if(x!=0){neighborCells += testArr[y][x - 1]} 
    if(x!=gridWidth-1){neighborCells += testArr[y][x + 1]}
    if(y!=gridHeight-1 && x!=0){ neighborCells += testArr[y+1][x - 1]}
    if(y!=gridHeight-1){neighborCells += testArr[y+1][x]}
    if(y!=gridHeight-1 && x!=gridWidth-1){neighborCells += testArr[y+1][x+1]}
    

      if (testArr[y][x] === 0) {
       switch (neighborCells) {
        case 3:
         changeArr[y][x] = 1; 
         break;
        default:
         changeArr[y][x] = 0; 
       }
      } else if (testArr[y][x] === 1) { 
       switch (neighborCells) {
        case 0:
        case 1:
         changeArr[y][x] = 0; 
         break;
        case 2:
        case 3:
         changeArr[y][x] = 1; 
         break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
         changeArr[y][x] = 0; 
         break;
        default:
         changeArr[y][x] = 0; 
       }
      } 
   }
  }
}

const tick =()=>{
  updateGrid()
  testArr=changeArr
 
  screen.innerHTML = '<ul>' + testArr.map(function (row) {
    return '<li>' + row + '</li>';
  }).join('') + '</ul>';
  testArr.map(elem=> console.log(elem.toString()))
}

function intit() {loop= setInterval(tick, 1200)
}

intit()


// after.innerHTML = '<ul>' + changeArr.map(function (row) {
//   return '<li>' + row + '</li>';
// }).join('') + '</ul>';














