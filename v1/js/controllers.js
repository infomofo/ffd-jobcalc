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

  $scope.current_build ={
    "jp":{
      "Warrior":0,
      "Monk":0,
      "Thief":0,
      "Red Mage":0,
      "White Mage":0,
      "Black Mage":0,
      "Summoner":0,
      "Ranger":0,
      "Dark Knight":0,
      "Dancer":0,
      "Ninja":0,
      "Magus":0,
      "Dragoon":0,
      "Bard":0,
      "Memorist":0,
      "Paladin":0,
      "Seer":0
    }
  };

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

  $scope.updateUrl = function() {
    if ($scope.characters != null)
      $location.search({"character":$scope.characters.indexOf($scope.selected_character)});
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
}
