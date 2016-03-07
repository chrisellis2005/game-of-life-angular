angular.module("game-of-life")
    .factory("gridGenerator", [function(){
        function randomIsAlive(birthChance){
            var bornChance =  Math.floor((Math.random() * 100) + 1);

            if (bornChance >= 100 - birthChance){
                return true;
            }
            return false;
        }

        function createGrid(width, height, createCellFunction){
            var newGrid = [];
            for (var i = 0; i < width; i++) {
                var row = [];

                for (var j = 0; j < height; j++) {
                    row.push(createCellFunction(i,j));
                }

                newGrid.push(row);
            }
            return newGrid;
        }

        return {
            createEmptyGrid: function(width, height){
                return createGrid(width, height, function(i, j){
                    return {
                        x: i,
                        y: j,
                        alive: false
                    };
                });
            },
            createRandomGrid: function(width, height, birthChance){
                return createGrid(width, height, function(i, j){
                    return {
                        x: i,
                        y: j,
                        alive: randomIsAlive(birthChance)
                    };
                });
            }
        }
    }]);