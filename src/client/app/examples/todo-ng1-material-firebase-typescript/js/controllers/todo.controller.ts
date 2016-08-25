namespace todos {
    'use strict';

    /**
     * The main controller for the  app. The controller:
     *  - retrieves and persists model  via the todoStorage servic
     * - exposes the model to the template and provides event handlers
     */

    export class TodoController {

        public static $inject = [
            '$scope',
            '$location',
            'filterFilter',
            'todoDataService'
        ];

        // not using this interface because $add $remove not on todo error
        // private todos: TodoItem[];
        private todos: any;
        newTodo: string;
        editedTodo: Object;
        originalTodo: Object;
        reverted: boolean;
        statusFilter: any;
        remainingCount: number;
        doneCount: number;
        allChecked: any;


        constructor(
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private filterFilter: any,
            private todoDataService: any
            //   TODO: need  proper d.ts file reference
        ) {
            var vm = this;
            vm.newTodo = '';
            vm.todos = this.todoDataService.getTodos();
            vm.editedTodo = null;
            vm.allChecked = undefined;
            $scope.$watch('vm.todos', () => this.onTodos(), true);
            $scope.$watch('vm.$location.path()', function(path) {
                vm.onPath(path);
            });
            if ($location.path() === '') $location.path('/');
        }

        onPath(path) {
            if (path === '/active') {
                this.statusFilter = { completed: false };
            } else if (path === '/completed') {
                this.statusFilter = { completed: true };
            } else {
                this.statusFilter = {};
            }
        }

        onTodos() {
            // 1. store uncompleted tasks length using filterFilter methodin remainingCount scope
            this.remainingCount = this.filterFilter(this.todos, { completed: false }).length;

            // 2. store completed tasks in  doneCount scope value (what is this for)
            //  done count is used for showing clear completed functionality /interface
            this.doneCount = this.todos.length - this.remainingCount;
            // 3.
            // this.allChecked = !this.remainingCount;

            // 4. used in a watch in the constructor  function(watches the todos)
        }


        addTodo() {
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
        }

        removeTodo(todo) {
            this.todos.$remove(todo);
        }

        editTodo(todo: any) {
            // activate the editing css property on the li containing element
            this.editedTodo = todo;

            // store current to do an original value  in case of revert
            this.originalTodo = angular.extend({}, todo);
        }

        doneEditing(todo: any) {
            // dismiss originaltodo value
            // set editedTodo to undefined for the display behavior
            this.originalTodo = undefined;
            this.editedTodo = undefined;

            // if once reverted change the value back to undefined
            // if (this.reverted) {
            // 	Todo edits were reverted, don't save.
            // 	this.reverted = null;
            // 	return;
            // }
            // save edits to current todo
            todo.title = todo.title.trim();
            this.todos.$save(todo);

            // left empty delet the current todo
            if (!todo.title) {
                this.removeTodo(todo);
            }

        }

        // TODO: why do you need the indexOf pattern here
        // compared to the doneEditing you don't
        // AND don't need any firebase call
        revertEdits(todo) {
            console.log('todo', todo);
            console.log('original', this.originalTodo);
            this.todos[this.todos.indexOf(todo)] = this.originalTodo;
            this.reverted = undefined;
        }

        clearDoneTodos() {
            var vm = this;
            angular.forEach(this.todos, (todo) => {
                if (todo.completed === true) {
                    vm.todos.$remove(todo);
                }
            })

            // todomvc solution
            // this.$scope.todos = this.todos = this.todos.filter(todoItem => !todoItem.completed);

        }

        markAll(completed) {
            angular.forEach(this.todos, (todo) => {
                todo.completed = completed;
            })
        }

        // I added this with firebase need to save the checked to the array ref
        // solved issue of the checked not saving the state
        updateTodoStatus(todo: any) {
            this.todos.$save(todo);
        }

    }
    angular
        .module('todomvc')
        .controller('TodoController', TodoController);
}
