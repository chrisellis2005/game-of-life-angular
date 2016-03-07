angular.module("game-of-life")
    .factory("levelEngine", [function(){

        var
        isNewCellAlive = function(cell, grid){
            var neighbourCount = getAliveNeighbours(cell.x, cell.y, grid);

            if (cell.alive === true &&
                (neighbourCount == 2 ||
                neighbourCount == 3))
                return true;

            if (cell.alive === false &&
                neighbourCount == 3)
                return true;

            return false;
        },
        getAliveNeighbours = function(x, y, grid){
            var neighbours = 0;

            neighbours += isCellAlive(x-1, y-1, grid); // NW
            neighbours += isCellAlive(x, y-1, grid); //N
            neighbours += isCellAlive(x+1, y-1, grid); //NE
            neighbours += isCellAlive(x - 1, y, grid); //E
            neighbours += isCellAlive(x + 1, y, grid); //W
            neighbours += isCellAlive(x - 1, y + 1, grid); //SW
            neighbours += isCellAlive(x, y + 1, grid); //S
            neighbours += isCellAlive(x + 1, y + 1, grid); //SE

            return neighbours;
        },
        width = function(grid){
            return grid.length;
        },
        height = function(grid){
            return grid[0].length;
        },
        isCellAlive = function(x, y, grid){
            var xToCheck = x;
            var yToCheck = y;

            if (xToCheck < 0){
                xToCheck = width(grid)-1;
            }
            if (xToCheck >= width(grid)){
                xToCheck = 0;
            }
            if (yToCheck < 0){
                yToCheck = height(grid)-1;
            }
            if (yToCheck >= height(grid)){
                yToCheck = 0;
            }

            try {
                var alive = grid[xToCheck][yToCheck].alive;
                return alive;
            }
            catch (e){
                console.log(e);
                return false;
            }
        };

        return {
            isGameOver: function(grid){
                for (var i=0; i < width(grid); i++){
                    for(var j=0; j < height(grid); j++){
                        if (grid[i][j].alive){
                            return false;
                        }
                    }
                }
                return true;
            },
            createNextGrid: function(grid){
                var newGrid = [];

                for (var i=0; i < width(grid); i++) {
                    var row = [];

                    for (var j = 0; j < height(grid); j++) {
                        var currentCell = grid[i][j];

                        var newCell = {
                            x: currentCell.x,
                            y: currentCell.y,
                            alive: isNewCellAlive(currentCell, grid)
                        }
                        row.push(newCell);
                    }
                    newGrid.push(row);
                }
                return newGrid;
            }
        }
    }]);