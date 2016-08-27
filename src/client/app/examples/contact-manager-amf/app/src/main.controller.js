var ContactManagerApp;
(function (ContactManagerApp) {
    'use strict';
    var MainController = (function () {
        function MainController() {
            this.message = 'Hello from controller';
            var vm = this;
        }
        MainController.$inject = [];
        return MainController;
    }());
    ContactManagerApp.MainController = MainController;
    angular.module('contactManagerApp')
        .controller('MainController', MainController);
})(ContactManagerApp || (ContactManagerApp = {}));
