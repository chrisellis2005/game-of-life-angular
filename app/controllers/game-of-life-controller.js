angular.module("game-of-life")
    .controller("GameOfLifeController",
    ["$timeout", function($timeout){
    var vm = this;
    var width = vm.cellsWidth;
    var height = vm.cellsHeight;
    vm.grid = [];
    vm.level = 0;
    vm.animate = false;
    vm.randomBirthChance = 30;

    vm.getCells = function(){
        var cells = [];
        for (var i=0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                cells.push(vm.grid[i][j]);
            }
        }
        return cells;
    };

    vm.init = function(){
        vm.level = 0;
        vm.animate = false;
        vm.grid = [];
        for (var i=0; i < width; i++){
            var row = [];

            for(var j=0; j < height; j++){

                var cell = {
                    x: i,
                    y: j,
                    alive: false
                };

                row.push(cell);
            }

            vm.grid.push(row);
        }
        vm.grid[1][1].alive = true;
    };

    vm.getX = function(cell){
        return (cell.x + 1) * 10;
    };
    vm.getY = function(cell){
        return (cell.y+ 1) * 10;
    };
    vm.getStyle = function(cell){
        if (cell.alive){
            return "fill:royalblue;"
        }
        return "fill:peachpuff;";
    };
    vm.toggleAlive = function(cell){
        if (vm.level > 0){
            return;
        }
        cell.alive = !cell.alive;
    };
    vm.nextLevel = function(){
        if (vm.isGameOver()){
            return;
        }
        var newGrid = [];
        for (var i=0; i < width; i++) {
            var row = [];

            for (var j = 0; j < height; j++) {
                var currentCell = vm.grid[i][j];

                var newCell = {
                    x: currentCell.x,
                    y: currentCell.y,
                    alive: isNewCellAlive(currentCell)
                }
                row.push(newCell);
            }
            newGrid.push(row);
        }
        vm.grid = newGrid;
        vm.level++;

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
            if (vm.grid[x] && vm.grid[x][y]){
                return vm.grid[x][y].alive;
            }
            return false;
        }
    };
    vm.isGameOver = function(){
        for (var i=0; i < width; i++){
            for(var j=0; j < height; j++){
                if (vm.grid[i][j].alive){
                    return false;
                }
            }
        }
        return true;
    };
    vm.levelMessage = function(){
        var message = "Level: " + vm.level;

        if (vm.isGameOver()){
            message += " - Game Over";
        }
        return message;
    };
    function runAnimation(){
        if (vm.animate && !vm.isGameOver()){
            vm.nextLevel();
            $timeout(runAnimation, 1000);
        }
    }
    vm.runAnimation = function(){
        vm.animate = !vm.animate;

        if (vm.animate === true) {
            $timeout(runAnimation, 1000);
        }
    }
    vm.getAnimateButtonText = function(){
        if (vm.animate === true){
            return "Stop Animation";
        }
        return "Start Animation";
    };

    vm.randomiseLevel = function(){
        if (vm.level > 0){
            return;
        }

        var newGrid = [];
        vm.level = 0;
        vm.animate = false;

        function randomIsAlive(){
            var bornChance =  Math.floor((Math.random() * 100) + 1);

            if (bornChance >= 100 - vm.randomBirthChance){
                return true;
            }
            return false;
        }

        for (var i=0; i < width; i++) {
            var row = [];

            for (var j = 0; j < height; j++) {
                var currentCell = vm.grid[i][j];

                var newCell = {
                    x: currentCell.x,
                    y: currentCell.y,
                    alive: randomIsAlive()
                }
                row.push(newCell);
            }
            newGrid.push(row);
        }
        vm.grid = newGrid;

    };

    vm.init();

}]);

