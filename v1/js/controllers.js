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

  $http.get('data/abilities.json').success(function(data) {
     $scope.abilities = data;
   });

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
    var total = 0;
    angular.forEach($scope.jobs, function(job) {
      for (var i = 1; i < $scope.current_build.jp[job.name]; i++) {
        total += job.levels[i].ap;
      }
    });
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

  $scope.levelTowards = function(name,target) {
    if ((target < $scope.current_build.jp[name]) && ($scope.current_build.jp[name] > MIN_JLV))
      $scope.current_build.jp[name]--;
    else if ((target > $scope.current_build.jp[name]) && ($scope.current_build.jp[name] < MAX_JLV))
      $scope.current_build.jp[name]++;
  }

  $scope.getLevelClass = function(name,level) {
    var result = [];
    if (level <= $scope.current_build.jp[name]) 
      result.push('spent');
    if (level <= 3)       
      result.push('free');
    return result;
  }

  $scope.alerts = [
    { type: 'info', msg: "Click on any cells higher than your current level to spend levels in that job's row.  Click on cells lower than your current level to decrease levels spent in that job's row." }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.isAcquired = function(ability){
    var isAcquired = false;
    angular.forEach($scope.jobs, function(job) {
      for (var i = 1; i <= $scope.current_build.jp[job.name]; i++) {
        try {
          var bool = (job.levels[i-1].ability == ability.id);
        if (bool) 
          isAcquired = true;
        } catch (e) {
          //temporary until I have all skills populated
        }
      }
    });
    return isAcquired;
  };

}
