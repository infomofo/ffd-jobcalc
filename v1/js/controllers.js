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

  $http.get('data/fusions.json').success(function(data) {
     $scope.fusions = data;
   });

  $http.get('data/spells.json').success(function(data) {
     $scope.spells = data;
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
    try {
    angular.forEach($scope.jobs, function(job) {
      for (var i = 0; i < $scope.current_build.jp[job.name]; i++) {
        total += job.levels[i].ap;
      }
    });
    } catch (e) {
      //catch error if jobs aren't loaded yet
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
    $http.get('data/build.json').success(function(data) {
       $scope.current_build = data;
    });
    $scope.updateUrl
  }

  $scope.levelTowards = function(name,target) {
      // if ((target < $scope.current_build.jp[name]) && ($scope.current_build.jp[name] > MIN_JLV))
      //   $scope.current_build.jp[name]--;
      // else if ((target > $scope.current_build.jp[name]) && ($scope.current_build.jp[name] < MAX_JLV))
      //   $scope.current_build.jp[name]++;
      $scope.current_build.jp[name] = target
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
    { type: 'info', msg: "Click on cells in the table to spend or refund job points." }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.filteredUnlockedAbilities = function() {
    var result = [];
    var unlockedAbilities = $scope.unlockedAbilities();
    angular.forEach(unlockedAbilities, function(unlockedAbility) {
      if ($scope.isNotImplied(unlockedAbility, unlockedAbilities))
        result.push(unlockedAbility);
    });
  return result;
  }

  $scope.isAcquired = function(ability){
    var isAcquired = false;
    try {
    angular.forEach($scope.selected_character.innate_abilities, function (innate_ability_id) {
      if (ability.id == innate_ability_id) 
        isAcquired = true;
    });
    } catch (e) {
      // handle case when no character is selected
    }
    if (!isAcquired)
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

  $scope.isImplied = function(ability, unlockedAbilities) {
    var implied = false;
    // an ability is implied if another unlocked ability replaces it
    angular.forEach(unlockedAbilities, function(unlockedAbility) {
      //console.log(ability.id + " compared to " + JSON.stringify(unlockedAbility) + " replaces " + unlockedAbility.replaces)
      if (unlockedAbility.replaces == ability.id) 
        implied = true;
    });
    return implied;
  }

  $scope.isNotImplied = function(ability, unlockedAbilities) {
    return !$scope.isImplied(ability, unlockedAbilities);
  }

  $scope.isInLevel = function(spell, level) {
    if (level.spells == undefined) {
      return false;
    } else 
    if (level.spells.indexOf(spell.name) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

  $scope.unlockedAbilities = function() {
    var result = [];
    angular.forEach($scope.abilities, function(ability) {
      if ($scope.canCast(ability.id)) {
        result.push(ability);
      }
    });
    //console.log(result);
    return result;
  }

  $scope.abilitiesForJobLevel = function(level) {
    //abilities|filter:{id:level.ability}
    var result = [];
    angular.forEach($scope.abilities, function(ability) {
      if (ability.id == level.ability) {
        result.push(ability);
      }
    });
    return result;
  }

  $scope.unlockedFusions = function() {
    
    var result = [];
    angular.forEach($scope.fusions, function(fusion) {
      var unlocked = true;

      angular.forEach(fusion.requirements, function(requirement) {
        var hasRequirement = $scope.canCast(requirement);

        if (!hasRequirement) {
          // console.log("does not have " + requirement);
          unlocked = false;
        }
      });
      if (unlocked) {
        result.push(fusion);
      }
    });
    return result;
  }

  $scope.canCast = function(requirement) {
    var hasRequirement = false;

    //check if requirement is an ability innate to the selected character
    try {
        angular.forEach($scope.selected_character.innate_abilities, function (innate_ability_id) {
          if (requirement == innate_ability_id) {
            hasRequirement = true;
          }
        });

        //check if requirement is a spell innate to the selected character
        if (!hasRequirement)
        angular.forEach($scope.selected_character.innate_spells, function (innate_spell_id) {
          if (requirement == innate_spell_id) {
            hasRequirement = true;
          }
        });

        //check if requirement is an ability that can be used by a level 0 job

        //check if requirement is a spell that can be used by a level 0 job

        //check if requirement is an ability or spell in the current build
        if (!hasRequirement)
        angular.forEach($scope.jobs, function(job) {
          for (var i = 0; i < $scope.current_build.jp[job.name]; i++) {
            // console.log("checking if " + requirement + " is in " + JSON.stringify(job.levels[i]));
            if (requirement == job.levels[i].ability) {
              hasRequirement = true;
            }
            if (typeof(job.levels[i].spells) != 'undefined') {
              // console.log(JSON.stringify(job.levels[i]) + " has spells " + job.levels[i].spells + " of which " + requirement + " is  " + job.levels[i].spells.indexOf(requirement));
                
              if (job.levels[i].spells.indexOf(requirement) >= 0) {
                 // console.log(JSON.stringify(job.levels[i]) + " has  " + requirement + " as a spell");
                // console.log(job.levels[i].spells.indexOf(requirement));
                hasRequirement = true;
              }
            }
          }
        });
    } catch (e) {
      //
    }
    return hasRequirement;
  }

  $scope.abilityTooltip = function(ability) {
    var tooltip = ability.description;

    // if (typeof(ability.spells) != 'undefined') {
    //   var abilityspells = [];
    //   angular.forEach($scope.spells, function(spell) {
    //     if ((ability.spells.indexOf(spell.type)>=0) &&($scope.canCast(spell.name)) ) {
    //       abilityspells.push(spell.name);
    //     }
    //   });
    //   if (abilityspells.length > 0) {
    //     tooltip = tooltip + " (" + abilityspells +")";
    //   }
    // }

    return tooltip;
  }

  $scope.otherRequirement = function(requirements,requirement) {

  }

  $scope.spellsTooltip = function(spells) {
    var tooltipBuild = [];
    angular.forEach(spells, function(spell) {
      var spellTooltip = spell;

      var spellFusionsBuild = [];

      angular.forEach($scope.fusions, function(fusion) {
        if (fusion.requirements.indexOf(spell) >= 0) {
          spellFusionsBuild.push(fusion.name);
        }
      });

      if (spellFusionsBuild.length > 0)
        spellTooltip += " (fusion " + spellFusionsBuild.join(", ") + ")";

      tooltipBuild.push(spellTooltip);
    });

    return tooltipBuild.join(", ");
  }

}
