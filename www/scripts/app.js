'use strict'

/**
 * 作用：模块定义及DI声明
 * shikelong 2015年6月1日21:17:06
 */
angular.module('myApp', ['ng-admin'])

.run(['$templateCache', function($templateCache) {

    $templateCache.put("template/datepicker/datepicker.html",
        "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +
        "  <daypicker ng-switch-when=\"day\" tabindex=\"0\"></daypicker>\n" +
        "  <monthpicker ng-switch-when=\"month\" tabindex=\"0\"></monthpicker>\n" +
        "  <yearpicker ng-switch-when=\"year\" tabindex=\"0\"></yearpicker>\n" +
        "</div>");
    $templateCache.put("template/datepicker/popup.html",
        "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" +
        "   <li ng-transclude></li>\n" +
        "   <li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
        "       <span class=\"btn-group pull-left\">\n" +
        "           <button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
        "           <button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
        "       </span>\n" +
        "       <button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
        "   </li>\n" +
        "</ul>\n" +
        "");

    $templateCache.put("template/datepicker/year.html",
        "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
        "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr ng-repeat=\"row in rows track by $index\">\n" +
        "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
        "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>\n" +
        "");
    $templateCache.put("template/datepicker/month.html",
        "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
        "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr ng-repeat=\"row in rows track by $index\">\n" +
        "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
        "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>\n" +
        "");

    $templateCache.put("template/datepicker/day.html",
        "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
        "      <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
        "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr ng-repeat=\"row in rows track by $index\">\n" +
        "      <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
        "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
        "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>\n" +
        "");

}])


.config(['NgAdminConfigurationProvider', 'RestangularProvider', function(NgAdminConfigurationProvider, RestangularProvider) {
    var nga = NgAdminConfigurationProvider;
    // set the main API endpoint for this admin
    var app = nga.application('YiChart')
        .title('YiChart')
        //获取所有entry point
        //production: http://yichart.com:8000/rest/
        //mock:http://private-49b1e-yichart.apiary-mock.com/rest/
        .baseApiUrl('http://yichart.com:8000/rest/');




    var patient = patientViewConfig(nga);
    var doctor = doctorViewConfig(nga);

    // set the application entities
    app
        .addEntity(patient)
        .addEntity(doctor);

    app.menu(nga.menu()
        .addChild(nga.menu(patient).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(doctor).icon('<span class="glyphicon glyphicon-plus"></span>'))
    );


    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        
            if (data.total_count&&operation=="getList") {

                return flattenNestObjectArray(data.result);
            }
            else{
                return flattenNestObjectArray(data)[0];
            }
        
    });
    RestangularProvider.addFullRequestInterceptor(function(elem, operation, what, url, headers, params, httpConfig) {

        // entityName + '/?page=1&page_size=10&order=1&orderby=id&email=%40'
        if (params._filters) {
            _.merge(params, params._filters);
            delete params._filters;
        }
        if (operation != "remove") {
            //添加自己的分页参数
            params.page = params._page || 1;
            params.page_size = params._perPage || 10;
            params.order = (params._sortDir == "ASC" ? 0 : 1) || 1;
            params.orderby = params._sortField || 'id';
        } else {
            // url=what + '/' + identifierValue + '/';
        }
        //移除自带的分页参数等等
        delete params._page;
        delete params._perPage;
        delete params._sortDir;
        delete params._sortField;

    });
    nga.configure(app);
}]);
