'use strict';

angular.module('awesome-app', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'templates-app',
    'awesome-app.common',
    'awesome-app.home',
    'awesome-app.teams'
]).config(['$urlRouterProvider', 'MembersProvider', function($urlRouterProvider, membersProvider) {
	membersProvider.setUrl("assets/membersList10.json");
    $urlRouterProvider.otherwise('/home');
}]);