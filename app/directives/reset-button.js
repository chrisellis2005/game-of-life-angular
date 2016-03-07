angular.module("game-of-life")
    .directive("resetButton", function(){
        return {
            restrict: "E",
            template: "<button class=\"btn btn-primary btn-sm\" ng-click=\"vm.reset()\" >Reset</button>",
            controllerAs: "vm",
            scope: {
                reset: "="
            },
            controller: function(){},
            bindToController: true
        };
    });