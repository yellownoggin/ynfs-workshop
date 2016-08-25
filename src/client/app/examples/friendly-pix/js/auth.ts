'use strict';
declare var friendlyPix:any;

window.friendlyPix = window.friendlyPix || {};


/**
 *  Handles the user auth flows and updating the UI depending on the auth state
 */

friendlyPix.Auth = class {

 /**
  * Returns a Promise that completes when auth is ready.
  * @return Promise
  */

  get waitForAuth() {
      return this._waitForAuthPromiseResolver.promise();
  }
database: any;
auth: any;
_waitForAuthPromiseResolver: any;

  constructor(private firebase: any) {
      // Firebase SDK
    this.database = firebase.app().database();
    this.auth = firebase.app().auth();
    this._waitForAuthPromiseResolver= new $.Deferred<void>();

  }
 }
