'use strict';

var popup = angular.module('popup', ['ui.bootstrap']);

popup.controller('PopupCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://terra.intra.tis.co.jp/aqua/atypes/userdir/').success(function(data) {
    var membersDom = $(data).find("div#node_item[indent='3'] div.section-body.stripe").children();
    $scope.members = [];
    $.each(membersDom, function(index, member) {
      var memberData = $(member).find(".tab-text");
      $scope.members.push({ name: $(memberData[0]).text().trim(), extNumber: $(memberData[2]).text()});
    });
  }).
  error(function(){
    $scope.alerts = [];
    $scope.alerts.push({ type: 'danger', msg: 'Terraにログインしてください。' })
  });

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
