'use strict';

/* Controllers */

function CharacterController($scope, $http) {
	//source: http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/65073
 $http.get('data/characters.json').success(function(data) {
    $scope.characters = data;
  });

  $http.get('data/jobs.json').success(function(data) {
     $scope.jobs = data;
   });

  $scope.spent_points = 0;

  $scope.abilities = [
  ];

  $scope.current_build ={
  	"Warrior":0,
  	"Monk":0,
  	"Thief":0,
  	"Red Mage":0,
  	"White Mage":0,
  	"Summoner":0,
  	"Dragoon":0,
  	"Bard":0,
  	"Memorist":0,
  	"Paladin":0,
  	"Seer":0
  };
}