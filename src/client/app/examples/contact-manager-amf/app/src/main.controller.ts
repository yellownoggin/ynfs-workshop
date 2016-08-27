namespace ContactManagerApp {
    'use strict';

    export class MainController {
        static $inject = [];

        constructor() {
            var vm = this;


        }

        message: string = 'Hello from controller';
    }
    
    angular.module('contactManagerApp')
        .controller('MainController', MainController);
}
