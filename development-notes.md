<!-- TODO:  colors.css -->

9. splash page
basic without spinner
-  controller on the shell
+ showSplash binding
+ hideSplash() [timeout]
- ng1-sandbox shell
+ ng-show directive
- css
+ dissolve-animation
+ page-splash
* styling (color*)
* z-index
* message css
* NEEDS REVIEW

with progress bar
- used md-progress-linear directive
- flex box to position
- on top or in the page splash

- NOTE: mixed in md flex box and the vanilla css





8. Routing Issue * (needs a name)

- used git new-development branch to save the old way of doing it
- need to explain*
















7. ng messages
    - using a template
    - http://stackoverflow.com/questions/28678878/angularjs-ng-template-with-ng-messages-include
6. using this example:
http://codepen.io/team/AngularMaterial/pen/WvMeMQ
- can dry up theboxWithHeight when all the way down the line

5. angular loading more than once
https://www.google.com/#q=WARNING%3A+Tried+to+load+angular+more+than+once.

1. logger functionality
- uses log service
- Q: why use log service
    - http://stackoverflow.com/questions/24185847/why-use-angulars-log-instead-of-console-log
    - downside  it doesn't show the file or line where the log comes from

2. problem: controller instantiation with ui view
- needs to be used with a ui you template in order for controller to the recognized
when declaring it on the ui router(state) property
when I'm in control of not initiated 1 launched when launched
    - X state.go in the run phase   ( did not work)
    - route helper 1 phase like in angular style guide
    - uiview to instantiate

3. onInit does not seem to work on a regular controller


4. using third-party libraries(toastr)
(in the configuration file)
- app.constant('toaster' toaster)
- injecting it into a service(like loggerservice just like another dependency)
- additional note:
+  MAKE NOTE: you canconfigure the toaster options in the config phase
+ resource: https://github.com/johnpapa/ng-demos/blob/cbfb125c4e262dda9d29662e9be9c78ef9317591/modular/src/client/app/core/config.js
- Q: do you need the const ?
+ Update: yes it will not work(it didn't work for me without it)
+ throws a injector error

5. .debug enabled
-  $logProvider.debugEnabled(true);
-  $compileProvider.debugInfoEnabled(true);
    - (allows to access & isolate scope property on the directive)
    - see article angela recipes production

6.
