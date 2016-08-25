var todos;
(function (todos) {
    'use strict';
    var TodoController = (function () {
        function TodoController($scope, $location, filterFilter, todoDataService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.filterFilter = filterFilter;
            this.todoDataService = todoDataService;
            var vm = this;
            vm.newTodo = '';
            vm.todos = this.todoDataService.getTodos();
            vm.editedTodo = null;
            vm.allChecked = undefined;
            $scope.$watch('vm.todos', function () { return _this.onTodos(); }, true);
            $scope.$watch('vm.$location.path()', function (path) {
                vm.onPath(path);
            });
            if ($location.path() === '')
                $location.path('/');
        }
        TodoController.prototype.onPath = function (path) {
            if (path === '/active') {
                this.statusFilter = { completed: false };
            }
            else if (path === '/completed') {
                this.statusFilter = { completed: true };
            }
            else {
                this.statusFilter = {};
            }
        };
        TodoController.prototype.onTodos = function () {
            this.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
            this.doneCount = this.todos.length - this.remainingCount;
        };
        TodoController.prototype.addTodo = function () {
            var vm = this;
            var newTodo = vm.newTodo.trim();
            if (!newTodo.length) {
                return;
            }
            vm.todos.$add({
                title: newTodo,
                completed: false
            });
            vm.newTodo = '';
        };
        TodoController.prototype.removeTodo = function (todo) {
            this.todos.$remove(todo);
        };
        TodoController.prototype.editTodo = function (todo) {
            this.editedTodo = todo;
            this.originalTodo = angular.extend({}, todo);
        };
        TodoController.prototype.doneEditing = function (todo) {
            this.originalTodo = undefined;
            this.editedTodo = undefined;
            todo.title = todo.title.trim();
            this.todos.$save(todo);
            if (!todo.title) {
                this.removeTodo(todo);
            }
        };
        TodoController.prototype.revertEdits = function (todo) {
            console.log('todo', todo);
            console.log('original', this.originalTodo);
            this.todos[this.todos.indexOf(todo)] = this.originalTodo;
            this.reverted = undefined;
        };
        TodoController.prototype.clearDoneTodos = function () {
            var vm = this;
            angular.forEach(this.todos, function (todo) {
                if (todo.completed === true) {
                    vm.todos.$remove(todo);
                }
            });
        };
        TodoController.prototype.markAll = function (completed) {
            angular.forEach(this.todos, function (todo) {
                todo.completed = completed;
            });
        };
        TodoController.prototype.updateTodoStatus = function (todo) {
            this.todos.$save(todo);
        };
        TodoController.$inject = [
            '$scope',
            '$location',
            'filterFilter',
            'todoDataService'
        ];
        return TodoController;
    }());
    todos.TodoController = TodoController;
    angular
        .module('todomvc')
        .controller('TodoController', TodoController);
})(todos || (todos = {}));
