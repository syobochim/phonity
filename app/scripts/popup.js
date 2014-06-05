'use strict';
var html;

function PopupCtrl($scope, $http) {
  // TODO: スクレイピングしてデータを取得するように変更する
  $http.get('http://terra.intra.tis.co.jp/aqua/atypes/userdir/').success(function(data) {
  	html = $(data).find("div#node_item[indent='3'] div.section-body.stripe");
  });
  $scope.members = [
    {name: 'てんてん', extNumber: '84-37750', status: '在席中'},
    {name: 'うがちゃん', extNumber: '84-11111', status: '離席中'},
    {name: 'わだ', extNumber: '84-22222', status: '休み'}
  ];
}
