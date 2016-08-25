var todos;
(function (todos) {
    var TodoDataService = (function () {
        function TodoDataService($firebaseArray, $firebaseRef) {
            this.$firebaseArray = $firebaseArray;
            this.$firebaseRef = $firebaseRef;
        }
        TodoDataService.prototype.getTodos = function () {
            return this.$firebaseArray(this.$firebaseRef.array);
        };
        TodoDataService.$inject = ['$firebaseArray', '$firebaseRef'];
        return TodoDataService;
    }());
    todos.TodoDataService = TodoDataService;
    angular
        .module('todomvc')
        .service('todoDataService', TodoDataService);
})(todos || (todos = {}));
