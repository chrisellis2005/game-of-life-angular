angular.module("game-of-life")
    .directive("gameTitle", function(){
        return {
            restrict: "E",
            template: "<h1>Game of Life - {{vm.message()}}</h1>",
            controllerAs: "vm",
            scope: {
                message: "="
            },
            controller: function(){},
            bindToController: true
        };
    });