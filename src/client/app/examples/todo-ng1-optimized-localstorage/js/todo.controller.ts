(() => {
    'use strict';
    /**
     * @ngdoc controller
     * @name TodoController
     * @description
     *
     * The main controller for the Todo application
     *
     */
    angular
        .module('todoApp')
        .controller('TodoController', TodoController);

        //TODO:  need to inject
        function TodoController($scope, todoStorage) {
            var vm = this;
            var todos = vm.todos = todoStorage.get();
            vm.title = 'TodoController';
            vm.editedTodo = {}
            vm.ESCAPE_KEY = 27;

            // methods
            vm.resetTodo = resetTodo;
            vm.addTodo = addTodo;
            vm.resetTodo();
            vm.removeTodo = removeTodo;
            vm.editTodo = editTodo;
            vm.doneEditing = doneEditing;
            vm.revertEditing = revertEditing;


            $scope.$watch('vm.todos', () => {
                todoStorage.put(todos);
            }, true);




            ///////////// Controller Methods //////////////

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
                }
            }

            function removeTodo(index) {
                todos.splice(index, 1);
            }

            function editTodo(todo) {
                vm.editedTodo = todo;

                // Clone the original todo to restore it on demand
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
        // /controller

})();
