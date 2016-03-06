angular.module("game-of-life")
    .directive("gameOfLife", function(){
        return {
          restrict: "E",
          templateUrl: "/app/templates/game-of-life.html",
          controller: "GameOfLifeController",
          controllerAs: "vm",
          scope: {
              cellsWidth: "=",
              cellsHeight: "="
          },
          bindToController: true
        };
    });