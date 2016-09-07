var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .directive('sidenavNg1', sidenavNg1Directive);
    function sidenavNg1Directive() {
        return {
            controller: SideNavController,
            controllerAs: 'sn',
            templateUrl: 'app/ng1-sandbox/layout/sidenavNg1.html'
        };
    }
    function SideNavController($mdSidenav) {
        this.sidenavNg1 = 'sidenavNg1';
    }
})(ynfsworkshop || (ynfsworkshop = {}));
