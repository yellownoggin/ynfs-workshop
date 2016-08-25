
'use strict';



interface Window {
    friendlyPix: any;
}

// interface window.friendlyPix {
//     Router: any;
// }

window.friendlyPix = window.friendlyPix || {};



/**
 * Handles the pages/routing.
 */ 

window.friendlyPix.Router = class {


    /**
     * @constructor - Initializes the Friendly Pix controller/router
     *
     *
     */
    constructor() {
        $(document).ready(() => {
            return 'fred';
        });
    }
}

window.friendlyPix.router = new window.friendlyPix.Router();
