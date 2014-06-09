'use strict';

var popup = angular.module('popup', ['ui.bootstrap']);

popup.controller('PopupCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $scope.predicate = 'mailAddress';
  $scope.alerts = [];
  $http.get('http://terra.intra.tis.co.jp/aqua/atypes/userdir/').success(function(data) {
    if ($(data).find("form[name=loginForm]").size() > 0) {
      $scope.alerts.push({ type: 'warning', msg: 'Terraにログインしてください。' })
    } else {
      var membersDom = $(data).find("div#node_item[indent='3'] div.section-body.stripe").children();
      $scope.members = [];
      $.each(membersDom, function(index, member) {
        var memberData = $(member).find(".tab-text");
        $scope.members.push({ initial: $(memberData[1]).text().charAt(0), name: $(memberData[0]).text().trim(), mailAddress: $(memberData[1]).text(), extNumber: $(memberData[2]).text()});
      });
    }
  }).
  error(function(){
    $scope.alerts.push({ type: 'danger', msg: 'Terraにアクセスできません' })
  });

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
