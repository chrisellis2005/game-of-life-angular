angular.module("game-of-life")
    .controller("GameOfLifeViewController",
        [function() {
            var vm = this;

            vm.getCells = function(){
                var cells = [];

                if (vm.grid){
                    for (var i=0; i < vm.grid.length; i++) {
                        for (var j = 0; j < vm.grid[0].length; j++) {
                            cells.push(vm.grid[i][j]);
                        }
                    }
                }

                return cells;
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
            vm.getWidth = function(){
                return (vm.grid.length * 10) + 50;
            };
            vm.getHeight = function(){
                return (vm.grid[0].length * 10) + 50;
            };
        }]);