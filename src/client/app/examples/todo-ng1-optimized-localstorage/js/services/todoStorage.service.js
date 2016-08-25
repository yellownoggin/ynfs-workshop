(function () {
    'use strict';
    angular
        .module('todoApp')
        .factory('todoStorage', todoStorage);
    function todoStorage() {
        var STORAGE_ID = 'todos-angularjs-perf';
        return {
            get: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },
            put: function (todos) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
            }
        };
    }
})();
