"use strict";
var app = angular.module("tas.dropdown",[]);
app.controller("Dropdown",function($http, $scope, $timeout, tasAlert, tasService){
    $scope.Object = Object;
    $scope.config.scope = $scope;
    if(!('data' in $scope.config ))
    	$scope.config.data = [{'n':'Item1','k': '1'},{'n':'Item2','k': '2'},{'n':'Item 3','k': '3'}];
    /******************************************/
    $scope.show = false;
    $scope.show_drop = function(){

          if("hideDropdown" in $scope.config && $scope.config["hideDropdown"] == true){
               return;
          }

          $scope.show = !$scope.show;
          if($scope.show){
               $timeout(function(){
                    var input = document.querySelector("#fl_focus");
                    if(input){
                        input.focus();
                    }
                    var myDiv = document.querySelector('.drop_all');
                    var prnt_height = myDiv.offsetHeight;
                    var child = document.querySelector('.active');

                    if(child){
                    var scrl_height = child.offsetTop;
                    var scrol_mins = prnt_height - child.offsetHeight;
                        if(scrl_height > scrol_mins || 0 < myDiv.scrollTop){
                            scrl_height = scrl_height - scrol_mins;
                            myDiv.scrollTo(0,scrl_height)
                        }
                    }
               });
          }
    }
    /******************************************/
    $scope.change = function(obj){
        console.log('selected:::::::', obj)
        $scope.selected = obj;
        console.log('selected:::::::', obj)
        $scope.show = false;
        if("callBack_fun" in $scope.config){
             $scope.config.callBack_fun(obj, $scope.config);
        }else{
             if("callBack" in $scope.config)
                  $scope.config.parent_scope[$scope.config.callBack](obj, $scope.config);
        }
    }
    /******************************************/
    $scope.arrindexfind = function(element){
        return element['k'] ==  this.k;	
    }
    /******************************************/
    $scope.dataprenext = function(opt){

        var kyblk = true;
        if(!$scope.selected){
             if($scope.config.data.length){
                  $scope.change($scope.config.data[0]);
                  kyblk = false;
             }
        }
            
        var index = $scope.config.data.findIndex($scope.arrindexfind,$scope.selected);
        var length = $scope.config.data.length;
        if(opt == "preview" && kyblk){
              index = index - 1;
        }else if(opt == "next" && kyblk){
              index = index + 1;
        }

        var unclickObj = angular.copy($scope.config.data[index]);
        if(unclickObj && 'disable' in unclickObj && unclickObj["disable"] == true){
              index = $scope.findUnclickNext(unclickObj,index,'al');
        }

        if(0 <= index && index < length){
              $scope.change($scope.config.data[index]);
        }
    }
    /******************************************/
    $scope.filterItems = {"data":[]};
    $scope.arrowChange = function(event){

        var length = $scope.filterItems['data'].length;
        var kyent = true;
        
        if(length == 0){
            return 
        }
        if($scope.keyupSelection){
            var index =  $scope.filterItems["data"].findIndex($scope.arrindexfind,$scope.keyupSelection);
        }else{
               if(!$scope.selected){
                    var index = 0;
                    kyent = false;
               }else{
                    var index = $scope.filterItems["data"].findIndex($scope.arrindexfind,$scope.selected);
               }
        }

        if(event.keyCode == 38 && kyent){
            index = index - 1;
        }else if(event.keyCode == 40 && kyent){
            index = index + 1;
        }
       
        var unclickObj = angular.copy($scope.filterItems['data'][index]);
        if(unclickObj && 'disable' in unclickObj && unclickObj["disable"] == true){
                  index = $scope.findUnclickNext(unclickObj,index,'fl');
        }
       
        if(0 <= index && index < length && (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)){
             var myDiv = document.querySelector('.drop_all');
             var prnt_height = myDiv.offsetHeight;
             var child = document.querySelector('.move');

             if(child){
                  var scrl_height = child.offsetTop;
                  var scrol_mins = prnt_height - child.offsetHeight;
                  if(scrl_height > scrol_mins || 0 < myDiv.scrollTop){
                      scrl_height = scrl_height - scrol_mins;
                      myDiv.scrollTo(0,scrl_height)
                  }
             }

             $scope.keyupSelection = angular.copy($scope.filterItems['data'][index]);
             if(event.keyCode == 13){
                 $scope.change($scope.keyupSelection);
             }
        }
    }
    /******************************************/
     $scope.findUnclickNext = function(obj,ind,opt){
           if(opt == "fl"){
                var index =  ind + 1;//$scope.filterItems["data"].findIndex($scope.arrindexfind,obj);
                var unclickObj = angular.copy($scope.filterItems['data'][index]);
           }else if(opt == "al"){
                var index =  ind + 1;//$scope.filterItems["data"].findIndex($scope.arrindexfind,obj);
                var unclickObj = angular.copy($scope.config.data[index]);

            }
             if(unclickObj && 'disable' in unclickObj && unclickObj["disable"] == true){
                  return $scope.findUnclickNext(unclickObj,index,opt);
             }else{
                 return index ;
             }
     }
    /******************************************/
         $scope.show_data_info = function(){
             console.log('data:::::::')
         }
    /******************************************/
    
});
app.directive('bindHtmlCompile', ['$compile', function ($compile) 
    { return {     restrict: 'A',     
                   link: function (scope, element, attrs) { 	
                   scope.$watch(function () {
                         return scope.$eval(attrs.bindHtmlCompile); 		}, 
                   function (value) { 			
                         element.html(value); 	    		
                         $compile(element.contents())(scope); 		
                   });     	
                 }       
             }; 
}])

app.directive('dropDown',function(){
    return {
        restrict: 'AE',
        template:`<div class="dropModule">
            <div class="drop_header">
                <div class="drop_preview" ng-click="dataprenext('preview')" ng-if="config.options['arrow'] != false" ng-class="{'clk_disble': config.data[0]['k'] == selected['k'],'brdl':config.options['border-left'] != false,'brdt':config.options['border-top'] != false,'brdb':config.options['border-bottom'] != false}"><i class="fa fa-chevron-left"></i></div>
                <div class="drop_selected" ng-click="show_drop()" ng-class="{'brdt':config.options['border-top'] != false,'brdb':config.options['border-bottom'] != false,'slt-full': config.options['arrow'] == false}">
                    <div class="cnt_txts">
                        <i class="fa fa-file" ng-if="config.options['icon'] != false"></i>
                        <span class="drop_slct_txt" title="{{selected['n']}}" ng-bind-html="selected['n']"></span>
                    </div>
                </div>
                <div class="drop_next" ng-click="dataprenext('next')" ng-if="config.options['arrow'] != false" ng-class="{'clk_disble': config.data[config.data.length - 1]['k'] == selected['k'],'brdr':config.options['border-right'] != false,'brdt':config.options['border-top'] != false,'brdb':config.options['border-bottom'] != false}"><i class="fa fa-chevron-right"></i></div>
            </div>
            <div class="drop_body" ng-if="show">
                <div class="drop_search" ng-show="config.options['filter'] != false">
                    <input type="text" ng-model="item_filter['n']" class="form-control" id="fl_focus" ng-keyup="arrowChange($event)" autocomplete="off">
                </div>
                <ul class="drop_all" ng-class="{'wtout_fltr': config.options['filter'] == false}">
                    <!--<li class="drop_items" ng-repeat="list in (filterItems['data'] = ( config.data | filter:item_filter)) track by $index" ng-click="list['disable'] != true && change(list)" ng-class="{'active': list['k'] == selected['k'],'move':list['k'] == keyupSelection['k'],'clk_disble': list['disable'] == true}" title="{{list['n']}}" bind-html-compile="list['tmp']?list['tmp']:list['n']"></li>-->
                    <li class="drop_items" ng-repeat="list in (filterItems['data'] = ( config.data | filter:item_filter)) track by $index" ng-click="list['disable'] != true && change(list)" ng-class="{'active': list['k'] == selected['k'],'move':list['k'] == keyupSelection['k'],'clk_disble': list['disable'] == true}" title="{{list['n']}}" bind-html-compile="list['n']"></li>
                </ul>
            </div>	
        </div>
        <style>
        .dropModule{width: 100%;height: 100%;position: relative;min-width: 100px;}
        .dropModule .drop_header{width: 100%;height: 100%;{{(config['bg']) ? 'background:'+config['bg'] : ''}};}
        .dropModule .drop_header .drop_preview, .dropModule .drop_header .drop_next{width: 40px;height: 100%;float: left;text-align: center;cursor: pointer;display: flex;justify-content: center;flex-direction: column;}
        .dropModule .brdl{border-left: 1px solid #ddd;}
        .dropModule .brdr{border-right: 1px solid #ddd;}
        .dropModule .brdt{border-top: 1px solid #ddd;}
        .dropModule .brdb{border-bottom: 1px solid #ddd;}
        .dropModule .drop_header .drop_selected{width: calc(100% - 80px);height: 100%;float: left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;cursor: pointer;position: relative;min-width: 100px;border-left: 1px solid #ddd;border-right:1px solid #ddd;display: flex;justify-content: center;flex-direction: column;}
        .dropModule .drop_header .drop_selected.slt-full{width: 100%;}
        .dropModule .drop_selected .drop_slct_txt{padding-left: 5px;}
        .dropModule .drop_header i{font-size: 16px;}
        .dropModule .drop_body{min-width: 300px;max-width: 500px;height: 250px;background: #fff;top: 100%;position: absolute;z-index: 100;border-radius: 3px;border: 1px solid #ddd;}
        .dropModule .drop_search{padding: 5px;height: 40px;}
        .dropModule .drop_search input{height: 30px;font-size:14px;}
        .dropModule .drop_search input:focus{box-shadow: none;}
        .dropModule .drop_all{height: calc(100% - 40px);overflow: hidden;overflow-y: auto;}
        .dropModule .wtout_fltr{height: 100%;}
        .dropModule .drop_all .drop_items{line-height: normal;padding: 7px 10px;list-style: none;cursor:pointer;border-bottom: 1px solid #ebebeb;display: block;white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis;}
        .dropModule .drop_all .drop_items:hover, .dropModule .drop_all .drop_items.active, .dropModule .drop_all .drop_items.move{background: #dae8f1;color: #343a40;font-weight: bold;border-radius: 3px;}
        .dropModule .clk_disble {pointer-events: none; cursor: default;}
        .dropModule .clk_disble i{color: #ddd;}
        .dropModule .drop_items.clk_disble {color: #ced0cd;}
        .dropModule .drop_selected .cnt_txts{position: relative;padding: 0 15px 0 10px;text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;}
        .dropModule .drop_selected .cnt_txts:after{content: "\\f0d7";font-family:'FontAwesome';position: absolute;top:0;right: 4px;}
        <style>`,
        controller: 'Dropdown',
            scope: {
                'config': '=',
            },
            link: function (scope, elm, attrs, controller) {
                $(document).bind('click', function(event){
                    var isClick = elm.find(event.target).length > 0;
                    if (isClick)
                        return;

                    scope.$apply(function(){
                        scope.show = false;
                    });
                });
            },
    }
});
