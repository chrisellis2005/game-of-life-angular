angular.module("game-of-life")
    .directive("randomLevel", function(){
        return {
            restrict: "E",
            templateUrl: "/app/templates/random-level.html",
            controllerAs: "vm",
            scope: {
                currentLevel: "=",
                birthChance: "=",
                randomiseLevel: "="
            },
            controller: function(){},
            bindToController: true
        };
    });