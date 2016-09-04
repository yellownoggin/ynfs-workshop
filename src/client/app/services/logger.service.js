var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .service('logger', logger);
    logger.$inject = ['toastr', '$log'];
    function logger(toastr, $log) {
        this.showToasts = false,
            this.error = error;
        this.info = info;
        this.success = success;
        this.warning = warning;
        this.log = $log.log;
        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }
        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }
        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }
        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
})(ynfsworkshop || (ynfsworkshop = {}));
