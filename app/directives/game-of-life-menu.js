angular.module("game-of-life")
    .directive("gameOfLifeMenu", function(){
        return {
            restrict: "E",
            templateUrl: "/app/templates/game-of-life-menu.html",
            controller: function(){},
            controllerAs: "vm",
            scope: {
                currentMenu: "="
            },
            bindToController: true
        };
    });