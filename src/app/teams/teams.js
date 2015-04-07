'use strict';

angular.module('awesome-app.teams', ['ui.router']).

config(function config($stateProvider) {
    $stateProvider
        .state('teams', {
            abstract: true,
        	url: '/teams',
            templateUrl: 'teams/teams.tpl.html'
        })
        .state('teams.tab1', {
            url: '/tab1',
            controller: 'TeamsCtrl',
            templateUrl: 'teams/teams.tab1.tpl.html',
            parent: 'teams'
        })
        .state('teams.tab2', {
            url: '/tab2',
            controller: 'TeamsCtrl',
            templateUrl: 'teams/teams.tab2.tpl.html',
            parent: 'teams'
        });
});