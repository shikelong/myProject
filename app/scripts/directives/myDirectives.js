'use strict'

angular.module('myApp')

.directive('mySlideButton', [function() {
    // Runs during compile
    return {

        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: ['$scope', '$element', '$attrs', '$transclude', '$modal', function($scope, $element, $attrs, $transclude, $modal) {

            $scope.openModel = function(size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'templates/myModalContent.html',
                    controller: 'mySlideController',
                    size: size
                });
            }

        }],
        /*require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements*/
        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'templates/mySlideButton.html',
        replace: false,
        link: function($scope, iElm, iAttrs, controller) {

        }
    };
}]);
