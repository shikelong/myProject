'use strict'

angular.module('myApp')

.config(['$compileProvider',function($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
	//angular.reloadWithDebugInfo(); write this commmand in console to debug
}])


