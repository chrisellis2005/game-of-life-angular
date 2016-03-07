angular.module("game-of-life")
    .directive("gameOfLifeView", function(){
        return {
            restrict: "E",
            templateUrl: "/app/templates/game-of-life-view.html",
            controller: "GameOfLifeViewController",
            controllerAs: "vm",
            scope: {
                grid: "="
            },
            bindToController: true
        };
    });