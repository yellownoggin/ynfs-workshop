namespace todos {

    'use strict';

    const ESCAPE_KEY = 27;


    /**
     * Directive that cancels editing todo if the user presses the ESCAPE key
     */
     export function todoEscape(): ng.IDirective {
         return {
             link: ($scope: ng.IScope, element: JQuery,  attributes: any) => {
                 element.bind('keydown', (event) => {
                     if(event.keyCode === ESCAPE_KEY) {
                         $scope.$apply(attributes.todoEscape);
                     }
                 });

                 $scope.$on('$destroy', () => { element.unbind('keydown'); });
             }
         }
     }

     angular
        .module('todomvc')
        .directive('todoEscape', todoEscape);
}
