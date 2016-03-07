angular.module("game-of-life")
    .controller("GameOfLifeController",
    ["$timeout", "gridGenerator", "levelEngine", function($timeout, gridGenerator, levelEngine){
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

        vm.game.grid = levelEngine.createNextGrid(vm.game.grid);
        vm.game.level++;
    };
    vm.isGameOver = function(){
        return levelEngine.isGameOver(vm.game.grid);
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

