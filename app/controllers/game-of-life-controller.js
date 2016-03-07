angular.module("game-of-life")
    .controller("GameOfLifeController",
    ["$timeout", "gridGenerator", function($timeout, gridGenerator){
    var vm = this;
    var width = vm.cellsWidth;
    var height = vm.cellsHeight;

    vm.game = {};

    vm.init = function(){
        vm.game = {
            grid: gridGenerator.createEmptyGrid(width, height),
            level: 0,
            animate: false,
            randomBirthChance: 30
        };
    };

    vm.randomiseLevel = function(){
        if (vm.game.level > 0){
            return;
        }

        vm.game.level = 0;
        vm.game.animate = false;
        vm.game.grid = gridGenerator.createRandomGrid(width, height, vm.game.randomBirthChance);
    };

    vm.nextLevel = function(){
        if (vm.isGameOver()){
            return;
        }
        var newGrid = [];
        for (var i=0; i < width; i++) {
            var row = [];

            for (var j = 0; j < height; j++) {
                var currentCell = vm.game.grid[i][j];

                var newCell = {
                    x: currentCell.x,
                    y: currentCell.y,
                    alive: isNewCellAlive(currentCell)
                }
                row.push(newCell);
            }
            newGrid.push(row);
        }
        vm.game.grid = newGrid;
        vm.game.level++;

        function isNewCellAlive(cell){
            var neighbourCount = getAliveNeighbours(cell.x, cell.y);

            if (cell.alive === true &&
                (neighbourCount == 2 ||
                neighbourCount == 3))
                return true;

            if (cell.alive === false &&
                neighbourCount == 3)
                return true;

            return false;
        }
        function getAliveNeighbours(x, y){
            var neighbours = 0;

            neighbours += isCellAlive(x-1, y-1); // NW
            neighbours += isCellAlive(x, y-1); //N
            neighbours += isCellAlive(x+1, y-1); //NE
            neighbours += isCellAlive(x - 1, y); //E
            neighbours += isCellAlive(x + 1, y); //W
            neighbours += isCellAlive(x - 1, y + 1); //SW
            neighbours += isCellAlive(x, y + 1); //S
            neighbours += isCellAlive(x + 1, y + 1); //SE

            return neighbours;
        }
        function isCellAlive(x, y){
            var xToCheck = x;
            var yToCheck = y;

            if (xToCheck < 0){
                xToCheck = width-1;
            }
            if (xToCheck >= width){
                xToCheck = 0;
            }
            if (yToCheck < 0){
                yToCheck = height-1;
            }
            if (yToCheck >= height){
                yToCheck = 0;
            }

            try {
                var alive = vm.game.grid[xToCheck][yToCheck].alive;
                return alive;
            }
            catch (e){
                console.log(e);
                return false;
            }
        }
    };
    vm.isGameOver = function(){
        for (var i=0; i < width; i++){
            for(var j=0; j < height; j++){
                if (vm.game.grid[i][j].alive){
                    return false;
                }
            }
        }
        return true;
    };

    vm.levelMessage = function(){
        var message = "Level: " + vm.game.level;

        if (vm.isGameOver()){
            message += " - Game Over";
        }
        return message;
    };


    function runAnimation(){
        if (vm.game.animate && !vm.isGameOver()){
            vm.nextLevel();
            $timeout(runAnimation, 1000);
        }
    }
    vm.runAnimation = function(){
        vm.game.animate = !vm.game.animate;

        if (vm.game.animate === true) {
            $timeout(runAnimation, 250);
        }
    }
    vm.getAnimateButtonText = function(){
        if (vm.game.animate === true){
            return "Stop Animation";
        }
        return "Start Animation";
    };



    vm.init();

}]);

