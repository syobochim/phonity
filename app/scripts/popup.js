'use strict';

var popup = angular.module('popup', ['ui.bootstrap', 'ngStorage']);

popup.controller('PopupCtrl', ['$scope', '$http', '$filter', '$localStorage', function($scope, $http, $filter, $localStorage) {
  $scope.$storage = $localStorage;
  $scope.predicate = 'mailAddress';
  $scope.alerts = [];
  $http.get('http://terra.intra.tis.co.jp/aqua/atypes/userdir/view?exa=namelist-groupdir').success(function(data) {
    if ($(data).find("form[name=loginForm]").size() > 0) {
      $scope.alerts.push({ type: 'warning', msg: 'Terraにログインしてください。' })
    } else {
      $scope.$storage.members = $scope.$storage.members || [];
      if($scope.$storage.members.length == 0) {
        var membersDom = $(data).find("div#node_item div.section-body.stripe").children();
        $.each(membersDom, function(index, member) {
          var memberData = $(member).find(".tab-text");
          $scope.$storage.members.push({ initial: $(memberData[1]).text().charAt(0), name: $(memberData[0]).text().trim(), mailAddress: $(memberData[1]).text(), extNumber: $(memberData[2]).text()});
        });
        console.log("fetched data from web page");
      }
    }
  }).
  error(function(){
    $scope.alerts.push({ type: 'danger', msg: 'Terraにアクセスできません' })
  });

  // alertのclose用 ex: close="closeAlert($index)"
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
