angular.module('myApp')

.controller('mySlideController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i = 0; i < 5; i++) {
        $scope.addSlide();
    }

    $scope.okModal = function() {
        $modalInstance.close();
    }

}])
