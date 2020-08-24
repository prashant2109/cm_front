app.controller("compCntrl", function($scope, $rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService, uiGridConstants, uiGridTreeBaseService){
        $('#body_wrapper').show();
        $scope.Object = Object;
        var socket = io.connect();
        $scope.font_list = font_list;
        $scope.company_info = {parent_scope:$scope}

        $scope.tas_alert_section_close = function(){
             tasAlert.hide();
        }
});
