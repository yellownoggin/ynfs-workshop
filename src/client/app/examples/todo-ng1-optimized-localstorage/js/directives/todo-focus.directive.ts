(() => {
    'use strict';
    /**
     * @ngdoc module
     * @name module
     * @requires dependencies
     * @description
     *
     * The `module` description.
     *
     */
    angular
        .module('todoApp')
        .directive('todoFocus', todoFocus);

        function todoFocus($timeout) {
            return {
                restrict: 'EA',
                link: (scope, element, attributes) => {

                    scope.$watch(attributes.todoFocus, (newValue) => {
                        if (newValue) {
                            $timeout(() => {
                                element[0].focus();
                            }, 100, false);
                        }
                    });
                }
            };
        }
})();
