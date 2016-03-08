angular.module('game-of-life'   )
    .directive('ngCX', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngCX, function(value) {
                element.attr('cx', value);
            });
        };
    })
    .directive('ngCY', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngCY, function(value) {
                element.attr('cy', value);
            });
        };
    })
    .directive('ngWidth', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngWidth, function(value) {
                console.log(value);
                element.attr('width', value);
            });
        };
    })
    .directive('ngHeight', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngHeight, function(value) {
                element.attr('height', value);
            });
        };
    });