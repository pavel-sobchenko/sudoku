module.exports = function solveSudoku(matrix) {
  // your solution
  let mtrx = matrix;
    let emptyCells = getEmptyCells(mtrx);
    if(emptyCells.length > 0){
        for(let cell of emptyCells){
            let missedRowValues = getMissedRowValues(mtrx[cell.row]);
            let missedColValues = getMissedColValues(mtrx, cell.col);
            let missedSquareValues = getMissedSquareValues(mtrx, cell.row, cell.col);
            let result = intersectFilter(missedRowValues, intersectFilter(missedColValues, missedSquareValues));
            if(result.length == 1 /* && result[0] != undefined */){
                mtrx[cell.row][cell.col] = result[0];
                solveSudoku(mtrx);
            } else if (result.length > 1){
                let siblings = checkSiblings(result, mtrx, cell.row, cell.col);
                if(siblings.length == 1){
                    mtrx[cell.row][cell.col] = siblings[0];
                    solveSudoku(mtrx);
                } 
            } 
        }
    } 
   return mtrx;

   function checkSiblings(array, matrix, row, col){
    let res = [];
    let rows = getSeblings(row);
    let cols = getSeblings(col);
    let row1Array = matrix[rows[1]];
    let row2Array = matrix[rows[2]];
  
    let col1Array = matrix.map(element => {return element[cols[1]]});
    let col2Array = matrix.map(element => {return element[cols[2]]});
  
    for(let key of array){
        if(row1Array.includes(key) && row2Array.includes(key)){
            res.push(key);
        }
    }
  
    for(let key of array){
        if(col1Array.includes(key) && col2Array.includes(key)){
            res.push(key);
        }
    }
    
    return res;
  }
  
  function getSeblings(index){
    let c1, c2;
    if([0,3,6].includes(index)){
        c1 = index + 1;
        c2 = index + 2;
    } else if ([1,4,7].includes(index)){
        c1 = index - 1;
        c2 = index + 1;
    } else {
        c1 = index - 2;
        c2 = index - 1;
    }
    return {1: c1, 2: c2};
  }
  
  function intersectFilter(a, b) {
    return a.filter(el => b.indexOf(el) !== -1);
  }
  
  function getMissedSquareValues(matrix, row, col){
    let rowStart = getStartInedex(row);
    let colStart = getStartInedex(col);
    let colArray = [];
    for(let r = rowStart; r < (rowStart + 3); r++){
        for(let c = colStart; c < (colStart + 3); c++){
            colArray.push(matrix[r][c]);
        }
    }   
    return getMissedValues(colArray);
  }
  
  function getStartInedex(number){
    if(number >= 0 && number < 3){
        return 0;
    } else if(number >= 3 && number < 6) {
        return 3;
    } else 
        return 6;
  }
  
  function getMissedColValues(matrix, col){
    let colArray = [];
    for(let i = 0; i < matrix.length; i++){
        colArray.push(matrix[i][col]);
    }
    return getMissedValues(colArray);
  }
  
  function getMissedRowValues(matrixRow){
    return getMissedValues(matrixRow);
  }
  
  function getEmptyCells(matrix){
    let map = [];
    for(let r = 0; r < matrix.length; r ++){
        for (let c = 0; c < matrix[r].length; c++){
            if(matrix[r][c] == "0"){
                let obj = { row: r,
                            col: c};
                map.push(obj);
            }
        }
    }
    return map;
  }
  
  function getMissedValues(array) {
    let map = [1,2,3,4,5,6,7,8,9];
    let missedMap = [];
    for(let key of map){
        if(!array.includes(key)){
            missedMap.push(key);
        }
    }
    return missedMap;
  }
}

