var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .controller('SandboxHomeController', SandboxHomeController);
    function SandboxHomeController($timeout, logger) {
        var vm = this;
        vm.showSplash = true;
        init();
        function init() {
            logger.success('SH Controller activated!');
            hideSplash();
        }
        function hideSplash() {
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }
    }
})(ynfsworkshop || (ynfsworkshop = {}));
