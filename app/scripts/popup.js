'use strict';

var popup = angular.module('popup', ['ui.bootstrap', 'ngStorage']);

popup.controller('PopupCtrl', ['$scope', '$http', '$filter', '$localStorage', function($scope, $http, $filter, $localStorage) {
  $scope.predicate = 'mailAddress';
  $scope.alerts = [];
  $scope.$storage = $localStorage;
  $scope.$storage.members = $scope.$storage.members || [];

  if($scope.$storage.members.length == 0) {
    // localstorageにデータがなかったらTerraからデータを取得する
    $http.get('http://terra.intra.tis.co.jp/aqua/atypes/userdir/view?exa=namelist-groupdir').success(function(data) {
      // 取得したページがログイン画面だったらアラートを表示
      if ($(data).find("form[name=loginForm]").size() > 0) {
        $scope.alerts.push({ type: 'warning', msg: 'Terraにログインしてください。' })
      } else {
        // DOMからデータを抽出してlocalstorageに保存する
        var members = $(data).find("div#node_item div.section-body.stripe").children();
        $.each(members, function(index, member) {
          var memberDataList = $(member).find(".tab-text");
          $scope.$storage.members.push({ initial: $(memberDataList[1]).text().charAt(0), name: $(memberDataList[0]).text().trim(), mailAddress: $(memberDataList[1]).text(), extNumber: $(memberDataList[2]).text()});
        });
        console.log("fetched data from web page");
      }
    }).error(function(){
      $scope.alerts.push({ type: 'danger', msg: 'Terraにアクセスできません' })
    });
  }

  // alertのclose用 ex: close="closeAlert($index)"
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
