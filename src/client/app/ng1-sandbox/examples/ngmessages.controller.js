var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .controller('MessagesController', MessagesController);
    function MessagesController(logger, $state) {
        this.signUp = signUp;
        this.state = $state;
        init();
        function init() {
            logger.success("MessagesController initialized");
        }
        function signUp() {
            logger.success('Thanks for signing up for ngMessages', null);
            this.email = '';
            this.fullName = '';
            this.password = '';
            this.state.go('ng1Sandbox.ngmessagesConfirmation');
        }
    }
})(ynfsworkshop || (ynfsworkshop = {}));
