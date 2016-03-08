angular.module("game-of-life")
    .controller("GameOfLifeController",
    ["$timeout", "gridGenerator", "levelEngine", function($timeout, gridGenerator, levelEngine){
    var vm = this;

    vm.game = {};
    vm.currentMenu = "game";

    vm.init = function(){
        vm.game = {
            grid: gridGenerator.createEmptyGrid(vm.cellsWidth, vm.cellsHeight),
            level: 0,
            animate: false,
            randomBirthChance: 30,
            animateDelay: 100
        };
    };

    vm.randomiseLevel = function(){
        vm.game.level = 0;
        vm.game.animate = false;
        vm.game.grid = gridGenerator.createRandomGrid(vm.cellsWidth, vm.cellsHeight, vm.game.randomBirthChance);
    };

    vm.nextLevel = function(){
        if (vm.isGameOver()){
            return;
        }

        var newGrid = levelEngine.createNextGrid(vm.game.grid);
        for (var i=0; i < vm.game.grid.length; i++){
            for (var j=0; j < vm.game.grid[0].length; j++){
                vm.game.grid[i][j].alive = newGrid[i][j].alive;
            }
        }

        vm.game.level++;
    };
    vm.isGameOver = function(){
        return levelEngine.isGameOver(vm.game.grid);
    };

    vm.levelMessage = function(){
        var message = "Level: " + vm.game.level;

        if (vm.game.level > 0 &&
            vm.isGameOver()){
            message += " - Game Over";
        }
        return message;
    };


    function runAnimation(){
        if (vm.game.animate && !vm.isGameOver()){
            vm.nextLevel();
            $timeout(runAnimation, vm.game.animateDelay);
        }
    }
    vm.runAnimation = function(){
        vm.game.animate = !vm.game.animate;

        if (vm.game.animate === true) {
            $timeout(runAnimation, vm.game.animateDelay);
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

