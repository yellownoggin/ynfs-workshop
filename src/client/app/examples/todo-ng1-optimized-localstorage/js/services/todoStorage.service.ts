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
        .factory('todoStorage', todoStorage);

        function todoStorage() {
            var STORAGE_ID = 'todos-angularjs-perf';

            return {
                get: function () {
                    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]')
                },

                put: function () {
                    // console.log(localStorage.setItem(STORAGE_ID, JSON.stringify(todos, hello)));

                    localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
                }
            }
        }
})();
