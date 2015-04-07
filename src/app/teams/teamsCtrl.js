'use strict';

angular.module('awesome-app.teams').

controller('TeamsCtrl',['$scope', '$filter', 'Members', 'Teams', function ($scope, $filter, Members, Teams) {

	$scope.init = function() {
		$scope.selected = undefined;
		$scope.openedTeamName = "";
		$scope.selectedMembers = [];
		$scope.selectedTeamMembers = [];
		$scope.teams = [];
		Members.init().success(function(data) {
			$scope.members = data;
		});
	};

	$scope.addTeam = function() {
		Teams.addTeam($scope.newTeam.name).then(function(newTeam) {
			newTeam.isOpen = false;
			$scope.teams.push(newTeam);
			$scope.resetForm();
		}, function(error) {
			alert(error);
		});
	};

	$scope.resetForm = function() {
		$scope.newTeam = {};
		$scope.addTeamForm.$setPristine(true);
	};

	$scope.clickTeamHandler = function(team) {
		if(team.isOpen) {
			if($scope.selectedMembers.length) {
				var refresh = confirm("Refresh team '" + $scope.openedTeamName + "'' before closing ?");
				if(refresh) {
					$scope.refreshMembers();
				} else {
					rollBackSelectedMembers();
				}
			}
			$scope.openedTeamName = team.name;
			$scope.selectedTeamMembers = angular.copy(team.members);
		} else {
			$scope.openedTeamName = "";
			$scope.selectedTeamMembers = [];
		}
	};

	$scope.replaceMemberToTeam = function(member) {
		if($scope.openedTeamName) {
			Members.delete(member.id).then(function() {
				$scope.addMemberToTeam($scope.openedTeamName, member);
				$scope.removeMember(member);
			});
		} else {
			alert("Select a team !");
		}
	};

	$scope.addMemberToTeam = function(name, member) {
		for (var i = 0; i < $scope.teams.length; i++) {
			if($scope.teams[i].name === name) {
				Teams.addMemberToTeam(name, member).then(addCb(i));
				break;
			}
		}
	};

	$scope.removeMember = function(member) {
		for (var i = 0; i < $scope.members.length; i++) {
			if($scope.members[i].id === member.id) {
				$scope.members.splice(i, 1);
				break;
			}
		}
	};

	$scope.removeMemberFromTeam = function(name, member) {
		for (var i = 0; i < $scope.teams.length; i++) {
			if($scope.teams[i].name === name) {
				for (var j = 0; j < $scope.teams[i].members.length; j++) {
					if($scope.teams[i].members[j].id === member.id) {
						Teams.deleteMemberFromTeam(name, member.id).then(removeCb(i, j, member));
						break;
					}
				}
				break;
			}
		}	
	};

	$scope.refreshMembers = function() {
		Teams.refreshTeam($scope.openedTeamName, $scope.selectedMembers).then(function(team) {
			for (var i = 0; i < $scope.teams.length; i++) {
				if($scope.teams[i].name === team.name) {
					$scope.selectedTeamMembers = angular.copy(team.members); 
					$scope.selectedMembers = [];
					break;
				}
			}
		});
	};

	$scope.$watch('selected', function(newValue, oldValue) {
		if (typeof newValue === 'object') {
			$scope.removeMember(newValue);
			$scope.selectedMembers.push(newValue);
			$scope.selected = undefined;
		}
   	});

	function addCb(i) {
		$scope.selectedTeamMembers = angular.copy($scope.teams[i].members);
	}

	function removeCb(i, j, member) {
		$scope.members.push(member);
		$scope.selectedTeamMembers = angular.copy($scope.teams[i].members);
	}

	function rollBackSelectedMembers() {
		while($scope.selectedMembers.length) {
			$scope.members.push($scope.selectedMembers.pop());
		}
	}

}]);