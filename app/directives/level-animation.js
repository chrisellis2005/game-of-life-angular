angular.module("game-of-life")
    .directive("levelAnimation", function(){
        return {
            restrict: "E",
            templateUrl: "/app/templates/level-animation.html" ,
            controllerAs: "vm",
            scope: {
                animate: "=",
                getAnimationText: "=",
                animationDelay: "="
            },
            controller: function(){},
            bindToController: true
        };
    });