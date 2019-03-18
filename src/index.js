module.exports = function solveSudoku(grid, row=0, col=0) {
  var cell = findUnassignedLocation(grid, row, col);
  row = cell[0];
  col = cell[1];

  if (row == -1) {
      return grid;
  }

  for (var num = 1; num <= 9; num++) {

      if ( noConflicts(grid, row, col, num) ) {   
          grid[row][col] = num;

          if ( solveSudoku(grid, row, col) ) {                
              return grid;
          }

          grid[row][col] = 0;
      }
  }
  return false;
}


function findUnassignedLocation(grid, row, col) {
  for (; row < 9 ; col = 0, row++)
      for (; col < 9 ; col++)
          if (grid[row][col] == 0)
              return [row, col];
  return [-1, -1];
}

function noConflicts(grid, row, col, num) {
  return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
}

function isRowOk(grid, row, num) {
  if(grid[row].includes(num))
      return false;

  return true;
}
function isColOk(grid, col, num) {
  if(grid.map(el => {return el[col]}).includes(num))
    return false

  return true;    
}
function isBoxOk(grid, row, col, num) {
  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (var r = 0; r < 3; r++)
      for (var c = 0; c < 3; c++)
          if (grid[row + r][col + c] == num)
              return false;

  return true;
}
