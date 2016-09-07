var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .directive('chooseFile', chooseFile)
        .controller('UploadController', UploadController);
    function chooseFile() {
        return {
            controller: 'UploadController',
            controllerAs: 'uc',
            link: function (scope, element, attributes, controller) {
                var button = element.find('button');
                var input = angular.element(element[0].querySelector('input#fileInput'));
                button.bind('click', function () {
                    input[0].click();
                });
                input.bind('change', function (e) {
                    scope.$apply(function () {
                        console.log(e.target.files, 'target files');
                        controller.readPicture(e);
                        controller.state.go('addPicture');
                    });
                });
            }
        };
    }
    UploadController.$inject = ['$state', 'uploadService'];
    function UploadController($state, uploadService) {
        this.$onInit = function () {
            this.currentFile = '';
            this.readPicture = readPicture;
            this.state = $state;
            this.uploadService = uploadService;
        };
        function readPicture(e) {
            var that = this;
            var file = e.target.files[0];
            that.currentFile = file;
            this.uploadService.setCurrenFile(file);
            if (file.type.match('image.*')) {
                var reader = new FileReader();
                reader.onload = function (e) { return that.uploadService.setImageUrl(e.target.result); };
                reader.readAsDataURL(file);
            }
        }
    }
})(friendlyPix || (friendlyPix = {}));
