'use strict';

var options = angular.module('options', ['ui.bootstrap', 'ngStorage']);

options.controller('OptionsCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
  $scope.alerts = [];
  $scope.$storage = $localStorage;

  $scope.updateData = function() {
    $http.get('http://terra.intra.tis.co.jp/aqua/atypes/userdir/view?exa=namelist-groupdir').success(function(data) {
      // 取得したページがログイン画面だったらアラートを表示
      if ($(data).find("form[name=loginForm]").size() > 0) {
        $scope.alerts.push({ type: 'warning', msg: 'Terraにログインしてください。' })
      } else {
        // DOMからデータを抽出してlocalstorageに保存する
        $scope.$storage.members = [];
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
  };

  $scope.clearData = function() {
    localStorage.clear();
  }

  $scope.addData = function() {
    $scope.$storage.members = $scope.$storage.members || [];
    $scope.$storage.members.push({ initial: "a", name: "tenten0213", mailAddress: "takehito.0213@gmail.com", extNumber: "84-12345"});
  }

  // alertのlcose用 ex: close="closeAlert($index)"
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
