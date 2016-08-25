var todos;
(function (todos) {
    'use strict';
    function todoFocus($timeout) {
        return {
            link: function ($scope, element, attributes) {
                $scope.$watch(attributes.todoFocus, function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            element[0].focus();
                        }, 0, false);
                    }
                });
            }
        };
    }
    todos.todoFocus = todoFocus;
    angular
        .module('todomvc')
        .directive('todoFocus', todoFocus);
})(todos || (todos = {}));
