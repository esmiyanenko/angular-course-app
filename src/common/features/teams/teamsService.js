'use strict';

angular.module('awesome-app.common.features.teams', [

]).service('Teams',['$q', function ($q) {

    var teams = {};

    var _addTeam = function(name) {
        var deferred = $q.defer();
        if(!teams[name]) {
            teams[name] = {};
            teams[name].members = [];
            teams[name].name = name;
            deferred.resolve(teams[name]);
        } else {
            deferred.reject('Team "' + name + '" already exists');
        };
        return deferred.promise;
    };

    var _deleteTeam = function(name) {
        delete teams[name];
    };

    var _addMemberToTeam = function(name, member) {
        var deferred = $q.defer();
        if(teams[name]) {
            teams[name].members.push(member);
            deferred.resolve("done");
        } else {
            deferred.reject('Team "' + name + '" does not exist');
        };
        return deferred.promise;
    };

    var _deleteMemberFromTeam = function(name, memberId) {
        var deferred = $q.defer();
        if(teams[name]) {
            for (var i = 0; i < teams[name].members.length; i++) {
                if(teams[name].members[i].id === memberId) {
                    teams[name].members.splice(i, 1);
                }
            };
            deferred.resolve("done");
        } else {
            deferred.reject('Team "' + name + '" does not exist');
        };
        return deferred.promise;  
    };

    var _refreshTeam = function(name, newMembers) {
        var deferred = $q.defer();
        if(teams[name]) {
            while(newMembers.length) {
                teams[name].members.push(newMembers.pop());
            }
            deferred.resolve(teams[name]);
        } else {
            deferred.reject('Team "' + name + '" does not exist');
        };
        return deferred.promise;
    };

    var _list = function() {
        var result = [];
        for(var property in teams) {
            if (teams.hasOwnProperty(property)) {
                result.push({ name: property, members: teams[property] });
            };
        };
        return result;
    };

    return {
        list : _list,
        addTeam : _addTeam,
        deleteTeam : _deleteTeam,
        refreshTeam : _refreshTeam,
        addMemberToTeam : _addMemberToTeam,
        deleteMemberFromTeam : _deleteMemberFromTeam
    }
    
}]);