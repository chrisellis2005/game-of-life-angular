angular.module("game-of-life")
    .directive("nextLevelButton", function(){
        return {
            restrict: "E",
            template: "<button ng-click=\"vm.nextLevel()\" ng-show=\"!vm.isGameOver()\">Next</button>",
            controllerAs: "vm",
            scope: {
                nextLevel: "=",
                isGameOver: "="
            },
            controller: function(){},
            bindToController: true
        };
    });