(function () {
    'use strict';
    angular
        .module('todoApp')
        .directive('todoFocus', todoFocus);
    function todoFocus($timeout) {
        return {
            restrict: 'EA',
            link: function (scope, element, attributes) {
                scope.$watch(attributes.todoFocus, function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            element[0].focus();
                        }, 100, false);
                    }
                });
            }
        };
    }
})();
