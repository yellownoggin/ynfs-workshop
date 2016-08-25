namespace todos {

    'use strict';

    export function todoFocus($timeout: ng.ITimeoutService): ng.IDirective {
        return {
            link: ($scope: ng.IScope, element: JQuery, attributes: any) => {

                //watch the att for true
                $scope.$watch(attributes.todoFocus, (newValue) => {

                    if (newValue) {

                        // $timeout(() => element[0].focus(), 0, false);
                        $timeout(function () {
                        element[0].focus()
                    }, 0, false);
                    }
                });
            }
        }
    }


    angular
        .module('todomvc')
        .directive('todoFocus', todoFocus);
}
