/**
 * Uploads the pic to Firebase Storage and add a new post into the Firebase Database.
 */


angular note: upload pic using energy click versus jquery $(...).click()
questions/issues:

0. before upload
- need to focus on the text input(caption)
- using ng-focus="true"
+ Update: that the not work not sure why
+ autofocus(used in todo app) that worked



uploadpic
1. e.preventdefault()
- preventdefault() set for this was that in general for click
- P1.How to do this in angular
    -  ?? other issue button never should use click(angular 1.5 no longer supports ngclick)
    -   Update: for now this is not relevant to the issue since it is an ng-submit(form submit control)
- e in html can not be used
+ angular passes $event
+ $event.preventDefault is available
* what are we preventing again?

O 2. disabledUploadUi
- demo: uses j query to set the property(prop) 2 disabled
+ this 1 method disables all inputs/buttons involved in this flow
+ but for this exact method in the ad picture html relevant to upload
* this.uploadButton = $('.fp-upload');  // this also has a type="submit"
- How to do this in angular?
+ ngdisabled & view model
+ check if the type submit actually works(be aware more accurately)

/ 3. Get value of image caption
- demo: j query: var imageCaption = this.imageCaptionInput.val();
- angular:
+ ngmodel:
* placed on input
* added to upload pic, parameter
    - Q: this is the only way to do it(best practice?)

4. Generate images
-





```javascript
this.uploadPicForm.submit(e => this.uploadPic(e));

uploadPic(e) {
<!-- n1: ng click on the md button-->
  e.preventDefault();

  this.disableUploadUi(true);
  var imageCaption = this.imageCaptionInput.val();

  this.generateImages().then(pics => {
    // Upload the File upload to Firebase Storage and create new post.
    friendlyPix.firebase.uploadNewPic(pics.full, pics.thumb, this.currentFile.name, imageCaption)
        .then(postId => {
          page(`/user/${this.auth.currentUser.uid}`);
          var data = {
            message: 'New pic has been posted!',
            actionHandler: () => page(`/post/${postId}`),
            actionText: 'View',
            timeout: 10000
          };
          this.toast[0].MaterialSnackbar.showSnackbar(data);
          this.disableUploadUi(false);
        }, error => {
          console.error(error);
          var data = {
            message: `There was an error while posting your pic. Sorry!`,
            timeout: 5000
          };
          this.toast[0].MaterialSnackbar.showSnackbar(data);
          this.disableUploadUi(false);
        });
      });
}
```


<!-- /**
   * Clear the uploader.
   */
  clear() {
    this.currentFile = null;

    // Cancel all Firebase listeners.
    friendlyPix.firebase.cancelAllSubscriptions();

    // Clear previously displayed pic.
    this.newPictureContainer.attr('src', '');

    // Clear the text field.
    friendlyPix.MaterialUtils.clearTextField(this.imageCaptionInput[0]);

    // Make sure UI is not disabled.
    this.disableUploadUi(false);
  }
}; -->












<!-- post new pic page
section
- div
+ div
* div
    - i material icon hourglass
* image#newPictureContainer
* div.supporting text
        - form#uploadPicForm
        + div
        * input
        * label
        +  br
        +  button
         -->

<!-- <p>
             {{ap.imageValue}}
         </p>

         <p>
             {{ap.title}}
         </p>
         <p>
             {{ap.currentAuth}}
         </p> -->
