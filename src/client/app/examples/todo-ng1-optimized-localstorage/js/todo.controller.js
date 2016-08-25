(function () {
    'use strict';
    angular
        .module('todoApp')
        .controller('TodoController', TodoController);
    function TodoController($scope, todoStorage) {
        var vm = this;
        var todos = vm.todos = todoStorage.get();
        vm.title = 'TodoController';
        vm.editedTodo = {};
        vm.ESCAPE_KEY = 27;
        vm.resetTodo = resetTodo;
        vm.addTodo = addTodo;
        vm.resetTodo();
        vm.removeTodo = removeTodo;
        vm.editTodo = editTodo;
        vm.doneEditing = doneEditing;
        vm.revertEditing = revertEditing;
        $scope.$watch('vm.todos', function () {
            todoStorage.put(todos);
        }, true);
        function addTodo() {
            vm.newTodo.title = vm.newTodo.title.trim();
            if (vm.newTodo.title.length === 0) {
                return;
            }
            todos.push(vm.newTodo);
            vm.resetTodo();
        }
        function resetTodo() {
            vm.newTodo = {
                title: '',
                completed: false
            };
        }
        function removeTodo(index) {
            todos.splice(index, 1);
        }
        function editTodo(todo) {
            vm.editedTodo = todo;
            vm.originalTodo = angular.copy(todo);
        }
        function doneEditing(todo, index) {
            console.log('done editing called');
            vm.editedTodo = {};
            todo.title = todo.title.trim();
            if (!todo.title) {
                vm.removeTodo(index);
            }
        }
        function revertEditing(index) {
            vm.editedTodo = {};
            todos[index] = vm.originalTodo;
        }
    }
})();
