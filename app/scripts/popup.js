'use strict';

function PopupCtrl($scope) {
  // TODO: スクレイピングしてデータを取得するように変更する
  $http.get('url').success(data) {
    console.log(data);
  }
  $scope.members = [
    {name: 'てんてん', extNumber: '84-37750', status: '在席中'},
    {name: 'うがちゃん', extNumber: '84-11111', status: '離席中'},
    {name: 'わだ', extNumber: '84-22222', status: '休み'}
  ];
}
