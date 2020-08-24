app.controller("dateCntrl", function($scope, $rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService, uiGridConstants, uiGridTreeBaseService){
        $('#body_wrapper').show();
        $scope.Object = Object;
        var socket = io.connect();
        $scope.font_list = font_list;
        $scope.select_date = {parent_scope:$scope, 'selected': ''}
      
       /***********************************/
        $scope.callBack_fun = function(re){
        }
});
