angular.module("game-of-life")
    .directive("levelAnimation", function(){
        return {
            restrict: "E",
            template: "<button ng-click=\"vm.animate()\">{{vm.getAnimationText()}}</button>" ,
            controllerAs: "vm",
            scope: {
                animate: "=",
                getAnimationText: "="
            },
            controller: function(){},
            bindToController: true
        };
    });