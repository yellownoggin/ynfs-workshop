(function () {
    'use strict';
    angular
        .module('todoApp')
        .controller('TodoController1', TodoController1);
    function TodoController1($scope, todoStorage) {
        var vm = this;
        vm.title = 'TodoController';
        var todos = vm.todos = todoStorage.get();
        vm.addTodo = addTodo;
        function addTodo() {
            var newTodo = vm.newTodo.trim();
            if (!vm.newTodo.length) {
                return;
            }
            todos.push({
                title: newTodo,
                completed: false
            });
            vm.newTodo = '';
            console.log(todos);
        }
    }
})();
