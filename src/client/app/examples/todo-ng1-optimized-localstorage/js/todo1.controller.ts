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
        .controller('TodoController1', TodoController1);

        function TodoController1($scope, todoStorage) {
            var vm = this;
            vm.title = 'TodoController';
            var todos = vm.todos = todoStorage.get();


            // methods
            // vm.resetTodo = resetTodo;
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
