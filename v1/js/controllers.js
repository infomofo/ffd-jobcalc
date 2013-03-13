'use strict';

/* Controllers */
var MAX_JLV = 20;
var MIN_JLV = 0;

function CharacterController($scope, $http, $location) {
	//source: http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/65073
 $http.get('data/characters.json').success(function(data) {
    $scope.characters = data;
    $scope.selected_character = $scope.characters[$location.search()['character']];
  });

  $http.get('data/jobs.json').success(function(data) {
     $scope.jobs = data;
   });

  $scope.abilities = [
  ];

  $scope.validateBuild = function(buildJson) {
    var build;
    try {
      build = angular.fromJson(buildJson);
      build.jp;
    } catch (e) {
      $http.get('data/build.json').success(function(data) {
         build = data;
      });
    }
    return build;
  }

  $scope.current_build = $scope.validateBuild($location.search()['build']);

  $scope.spent_jp = function() {
    var total = 0, i;
    for (i in $scope.current_build.jp) {
      if ($scope.current_build.jp[i] > 3) {
        total += $scope.current_build.jp[i] - 3; 
      }
    }
    return total;
  }
    
  $scope.spent_ap = 0;

  $scope.onCharacterSelect = function() {
    $scope.updateUrl();
  }

  $scope.updateUrl = function() {
    if ($scope.characters != null)
      $location.search({"character":$scope.characters.indexOf($scope.selected_character),"build":angular.toJson($scope.current_build)});
  }

  $scope.reset = function() {
    $scope.selected_character = null;
    $location.search();
  }

  $scope.increment = function(name) {
    if ($scope.current_build.jp[name] < MAX_JLV)
    $scope.current_build.jp[name]++;
  }

  $scope.decrement = function(name) {
    if ($scope.current_build.jp[name] > MIN_JLV)
    $scope.current_build.jp[name]--;
  }

  $scope.getLevelClass = function(name,level) {
    var result = [];
    if (level <= $scope.current_build.jp[name]) 
      result.push('spent');
    if (level <= 3)       
      result.push('free');
    return result;
  }
}
