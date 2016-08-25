var todos;
(function (todos) {
    'use strict';
    var ESCAPE_KEY = 27;
    function todoEscape() {
        return {
            link: function ($scope, element, attributes) {
                element.bind('keydown', function (event) {
                    if (event.keyCode === ESCAPE_KEY) {
                        $scope.$apply(attributes.todoEscape);
                    }
                });
                $scope.$on('$destroy', function () { element.unbind('keydown'); });
            }
        };
    }
    todos.todoEscape = todoEscape;
    angular
        .module('todomvc')
        .directive('todoEscape', todoEscape);
})(todos || (todos = {}));
