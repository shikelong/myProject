angular.module('myApp')

.controller('mySlideController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
        	image: '//placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    
    $scope.slides=[{
       image:'http://g.hiphotos.baidu.com/image/pic/item/962bd40735fae6cd25341d600db30f2442a70f2a.jpg'
      },{
       image:'http://c.hiphotos.baidu.com/image/pic/item/4afbfbedab64034f42324f60acc379310b551ddc.jpg'
      }];


    for (var i = 0; i < 0; i++) {
        $scope.addSlide();
    }
    
    $scope.okModal = function() {
        $modalInstance.close();
    }

}])
