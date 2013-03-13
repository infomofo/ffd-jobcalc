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
      $scope.current_build = angular.fromJson(buildJson);
      if ($scope.current_build.jp["Warrior"] < 0) {
        throw exception;
      }
    } catch (e) {
      $http.get('data/build.json').success(function(data) {
         $scope.current_build = data;
         $scope.updateUrl 
      });
    }
  }

  $scope.validateBuild($location.search()['build']);

  $scope.spent_jp = function() {
    var total = 0, i;
    try {
      for (i in $scope.current_build.jp) {
        if ($scope.current_build.jp[i] > 3) {
          total += $scope.current_build.jp[i] - 3; 
        }
      }
    } catch (e) {
      //exception can be thrown when spent_jp is called before data model is loaded
    }
    return total;
  }
    
  $scope.spent_ap = function() {
    var total = 0, i, j;
      for (i in $scope.current_build.jp) {
        try {
          var job = $scope.jobs.filter(function (el) {
            return el.name == i;
          });

          for (j=0; j<$scope.current_build.jp[i]; j++) {
              total += job.levels[j].ap;
          }

        } catch (e) {
          if (e instanceof TypeError) {
           // specific error
          } else {
            throw e; // let others bubble up
          }
        }
        //alert(job);
      }
    return total;
  }
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
