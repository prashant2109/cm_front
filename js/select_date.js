var app = angular.module('tas.Date', [])
app.controller('date_ctrl', function($scope, $rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService){
    /***********************************/
      window.scope = $scope
    /***********************************/
     $scope.Object = Object
     $scope.config.scope = $scope
    /***********************************/
     $scope.select_default = function(res, v){
           console.log('res::::::::::::::::', res)
           var dates = res.split('-')
           var sel_date = new Date(dates[2], dates[1], dates[0])
           console.log('sleted new dates:::::::::::::::', sel_date)
           $scope.dt = sel_date
     }
    /***********************************/
     $scope.toggleMin = function() {
	    //$scope.minDate = $scope.minDate ? null : new Date();
            $scope.minDate = new Date(1990, 1, 1)
            console.log('selected datee:::::::::::::::::::::::::::::::',$scope.config.selected)
            if ($scope.config.selected != ''){
               $scope.select_default($scope.config.selected, '')
            }
            console.log('min date::::::::::::::',  $scope.minDate)
            var position_left = document.getElementsByClassName('date_picker_selector')[0].offsetLeft
            var position_top = document.getElementsByClassName('date_picker_selector')[0].offsetTop
            var position_he = document.getElementsByClassName('date_picker_selector')[0].offsetHeight
            var position_height =  position_top+position_he
            $('.sel_vals').css({left: position_left, top:position_height})
            
     };
    /***********************************/ 
     $scope.get_data = function(date){
            var dat = date.getDate()
            var mon = date.getMonth()+1
            var year = date.getFullYear()
            return String(dat)+'-'+String(mon)+'-'+String(year)
     }
    /***********************************/
     $scope.toggleMin();
     $scope.pop_selected = false ;
     $scope.selected_date = function(date, ev){
          $scope.selected = {'n':'', 'k':'date'} ;
          var class_names = $(ev.target).attr('class')
          var get_tag_nme = ev.target.tagName
          var parent_classes = $(ev.target).parents().eq(0).attr('class')
          console.log('parent clas::::::::::::', parent_classes)

          if (class_names != undefined){
		  var date_sel = class_names.includes('btn-info')
		  if (date_sel == true && date != undefined){
		     $scope.pop_selected = ! $scope.pop_selected
		  }else if(date != undefined && get_tag_nme == 'SPAN' &&  parent_classes.includes('btn-info')){
                     $scope.pop_selected = ! $scope.pop_selected
                  }else{return}
                  var sel_date = $scope.get_data(date)
                  console.log('date::::::::::', sel_date)
                  $scope.selected['n'] = sel_date
                  if("callBack_fun" in $scope.config){              
                    $scope.config.callBack_fun($scope.selected, $scope.config);
                    }else{               
                      if("callBack" in $scope.config)
                         $scope.config.parent_scope[$scope.config.callBack]($scope.selected, $scope.config);
                  }
          }
          
     }
    /***********************************/
      $scope.window_heights = 0
      $scope.toggle_div = function(){
            $scope.pop_selected = ! $scope.pop_selected
            if($scope.pop_selected == false){
              return
             } 
            var position_left = document.getElementsByClassName('date_picker_selector')[0].offsetLeft
            var position_top = document.getElementsByClassName('date_picker_selector')[0].offsetTop
            var position_he = document.getElementsByClassName('date_picker_selector')[0].offsetHeight
            var position_height =  position_top+position_he            
            console.log('pffset positions::::::::::::', position_left, position_top, position_he, position_height)
 
            var date_picker_container = document.getElementById('date_picker')
            var contanier_width = date_picker_container.offsetWidth;
            var contanier_height = date_picker_container.offsetHeight;
             
              
            /*$scope.window_heights = window.screen
            var screen_width  = window.screen.availWidth
            var screen_height  = window.screen.availHeight*/
            /*var screen_width  = $(window).width()
            var screen_height  = $(window).height()*/
            var screen_width  =  window.innerWidth;
            var screen_height =  window.innerHeight;
            
            if ((screen_width - position_left) < contanier_width && (screen_width - contanier_width)>0){
               //console.log('(screen_width - position_left)::::::::::::::', screen_width - position_left, contanier_width)
               position_left = screen_width - contanier_width
            }
            console.log('positions:::::::::::::::', screen_height, position_height, contanier_height)
            if ((screen_height - position_height) < contanier_height && (position_top - contanier_height) >0){
              // console.log('(screen_height - position_height)::::::::::', (screen_height - position_height), contanier_height)
               position_height = position_top - contanier_height
               //console.log('screen height - container height:::::::::::', position_height)
            }
                 console.log('final positions:::::::::::::::::', position_left, position_height) 
                 $('.sel_vals').css({left: position_left, top:position_height})
           //$("#date_picker").toggle();
     }
    /***********************************/

});

app.directive('dateSelector', function(){
    return {
      restrict: 'AE',
      template: `
                 <div class="div_sel" >
                    <div type="text"  ng-click="toggle_div()" class="btn btn-primary btn-sm date_picker_selector">
                       Select
                    </div>
                   <!-- <div ng-init="OpenAvailableDate()" uib-datepicker-popup  uib-datepicker-popup="{{dateFormat}}" ng-model="AvailableDate" name="availabledate" is-open="availableDatePopup.opened"  ng-required="true"   placeholder="Available Date"  ng-change="changeDate(AvailableDate)">-->
 
                   <!-- <datepicker ng-model="AvailableDate" min-date="minDate" show-weeks="true" class="well well-sm"></datepicker>-->
                 <!--   </div>-->
                 <!-- 	<input type="text"  uib-datepicker-popup="{{dateFormat}}" ng-model="AvailableDate" name="availabledate" is-open="availableDatePopup.opened"  ng-required="true" close-text="Close" ng-click="OpenAvailableDate()" placeholder="Available Date" style="width:180px; border-radius:0px; height:30px"  ng-change="changeDate(AvailableDate)" ng-keydown="editDate($event)">-->
                <!-- </div>-->

                   <div class="sel_vals"  id="date_picker" ng-class="{hide: pop_selected ==true}">
                       <datepicker ng-model="dt" min-date="minDate" show-weeks="true" class="well well-sm"  ng-click="selected_date(dt, $event)" ></datepicker>
                  </div>



                 <style>
                   .div_sel {width:100%; height:100%; position: relative;min-width: 100px;}
                   .div_sel .sel_vals{display:inline-block; min-height:290px; position: absolute; z-index: 1000;}
                   .div_sel .sel_vals.hide{display:none;}
                   .div_sel .date_picker_selector{position:relative}
                   .div_sel .btn-secondary{color: #6c757d !important;background-color: #ffffff !important; border-color: #bec3c6 !important; border: 1px solid black;padding: 5px 10px; margin:0px;}
                   .div_sel .btn-default{color: #000000 !important;background-color: #ffffff !important; border-color: #bec3c6 !important; border: 1px solid black;padding: 5px 10px; margin:0px;}
                   .div_sel .btn.btn-default.active{color: #fff !important; background-color: #2cc0e2 !important;}
                   .div_sel .btn-info.active{color: #fff !important;background-color: #c35656 !important; box-shadow: none;}
                   .div_sel .text-info {color: #330fea !important;}
                   .div_sel .btn.btn-sm {padding: 5px 10px;font-size: 12px;border: 1px solid #fff0f0;margin: 0px; box-shadow: none;}
                   .div_sel .btn.btn-sm.active {color: #fff !important;background-color: #2cc0e2 !important; }
                   .div_sel  table th {font-size: 15px;font-weight: bold;padding: 5px; color: #000000;}
                   .div_sel .well{background-color:white; border: 1px solid rgba(0,0,0,.15); border-radius: 3px;}
                   .div_sel .small, small {font-weight: bolder;}
                   //:focus {outline: 1px solid red;}
                 </style>
                `,
      controller:'date_ctrl',
      scope: {
            'config' : '='
      },
      link : function(scope, elm, attrs, controller){
      },
    }
});
