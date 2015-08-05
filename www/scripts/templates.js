angular.module("myApp").run(["$templateCache", function($templateCache) {$templateCache.put("templates/myModalContent.html","<div class=\"modal-header\">\r\n    <h4>查看病人病历</h4></div>\r\n<div class=\"modal-body\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 .col-sm-4 col-md-3\" ng-repeat=\"slide in slides\">\r\n            <!-- fancyboxable -->\r\n            <a class=\"thumbnail text-center\" ng-href=\"{{slide.image}}\" fancyboxable ng-mouseover=\"imgSelected()\" href=\"#\">\r\n                <img ng-src=\"{{slide.image}}\" class=\"img-responsive center-block img-rounded img-hover\" alt=\"{{slide.text}}\"> {{slide.text}}\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <button class=\"btn btn-primary\" ng-click=\"okModal()\">确定</button>\r\n</div>\r\n");
$templateCache.put("templates/mySlideButton.html","<a class=\"btn btn-default\" ng-class=\"size ? \'btn-\' + size : \'\'\" ng-click=\"openModel(\'lg\')\">\r\n    <span class=\"glyphicon glyphicon-picture\" aria-hidden=\"true\"></span> &nbsp; 查看病历\r\n</a>\r\n");}]);