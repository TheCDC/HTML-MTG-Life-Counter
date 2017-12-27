app.controller("myCtrl", ["$scope", function($scope) {
    $scope.message = "Hello"
    $scope.players = Array();
    $scope.starting_life = 20;

    var create_player = function(name, life, colors) {
        return {
            name: name,
            life: life,
            colors: colors
        };
    }

    var default_player = function() {
        return create_player("Default Player " + ($scope.players.length + 1), 20, 'wubrg');
    }

    var add_player = function(p) {
        $scope.players.push(p);
        console.log($scope.players);
    }
    var get_num_players = function() {
        return $scope.players.length;
    };
    $scope.utils = {
        create_player: create_player,
        default_player: default_player,
        add_player: add_player,
        get_num_players: get_num_players,
    }

}]);