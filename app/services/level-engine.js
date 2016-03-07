angular.module("game-of-life")
    .factory("levelEngine", [function(){
        return {
            isGameOver: function(grid){
                for (var i=0; i < grid.length; i++){
                    for(var j=0; j < grid[0].length; j++){
                        if (grid[i][j].alive){
                            return false;
                        }
                    }
                }
                return true;
            },

        }
    }]);