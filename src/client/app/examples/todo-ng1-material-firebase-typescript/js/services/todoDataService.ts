namespace todos {
    // TODO: add this interface or  delete
    interface ITodoDataService {

    }

    export class TodoDataService
        implements ITodoDataService {

        static $inject  = ['$firebaseArray', '$firebaseRef'];
         constructor(private $firebaseArray: any, private $firebaseRef: any ) {

         }

        getTodos(): any {
        return this.$firebaseArray(this.$firebaseRef.array);
        }
    }
    angular
    .module('todomvc')
    .service('todoDataService', TodoDataService);

}
