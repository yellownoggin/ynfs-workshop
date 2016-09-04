namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .service('uploadService', uploadService);

        function uploadService() {
            this.imageUrl = '';
            this.currentFile = {};

            this.getImageUrl = () => {
                return this.imageUrl;
            }
            this.setImageUrl = (url) => {
                this.imageUrl = url;
            }

            this.getCurrenFile = () => {
                return this.currentFile;
            }
            this.setCurrenFile = (file) => {
                this.currentFile = file;
            }
        }
}
