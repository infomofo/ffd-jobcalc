'use strict';

/* Controllers */

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

  $scope.current_build =[
    {"class":"Warrior",
    "jlv":0},
    {"jlv":2},
    {"jlv":4}
  ];

  $scope.spent_jp = function() {
    var total = 0, i;

    for (i = 0; i < $scope.current_build.length; i++) {  
      if ($scope.current_build[i].jlv > 3) {
        total += $scope.current_build[i].jlv - 3; 
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
}
