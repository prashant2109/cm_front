var app = angular.module('popupModule', ['ui.grid', 'ui.grid.cellNav', 'ui.grid.pinning', 'ui.grid.edit', 'ui.grid.treeView', 'ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.pagination', 'ui.grid.selection',  'ui.grid.infiniteScroll', 'ui.bootstrap'])
app.controller('popup_controller', function($scope,$rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService){
    $scope.Object = Object
    $scope.config.scope = $scope
    console.log('scope.config.scope:::::::::::::',$scope.config.parent_scope.basic_info_disp_dict)
    $scope.sl_c_dic_meta ={} 
    $scope.selected_frequency = {}
    $scope.display_data_vals =[]
    $scope.cl_bk_module_meta_data = function(res){
           if (res['message'] == 'done'){
                  $scope.sl_c_dic_meta['meta'] = res['data']
                  $scope.update_information = res['recent_updates']
                  $scope.display_data_vals1 = res['filing_frequency']
                  m = res['company_mgmt']
                  $scope.holding_data = res['honding']
                  $scope.subsidary_data = res['subsidary']
           if (Object.keys($scope.display_data_vals1).length >0){
               $scope.selected_data=true
               for (var day_v in $scope.display_data_vals1){
                  for (v in $scope.display_data_vals1[day_v]){
                     $scope.display_data_vals.push($scope.display_data_vals1[day_v][v])
               }
               }
           }
           for (data_vals in $scope.basic_info_disp_dict){
                      if ($scope.basic_info_disp_dict[data_vals]['k'] == 'company_name'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m.company_name
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'country'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m.country
                             $scope.basic_info_disp_dict[data_vals]['v1'] = m.country
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'ticker'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m.ticker
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'accessors_standard'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['account_standard']['n']
                             $scope.basic_info_disp_dict[data_vals]['v1'] = m['account_standard']['k']
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'industry'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['industry_info']['n']
                             $scope.basic_info_disp_dict[data_vals]['v1'] = m['industry_info']['k']
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'financial_year_end'){
                             console.log('finanacial year::::::::::::::::', m['fye']['n'] )
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['fye']['n'] || ''
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'reporting_start_period'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['rsp']['n']
                             $scope.basic_info_disp_dict[data_vals]['v1'] = m['rsy']['n']
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'financial_year_start'){
                             console.log('finanacial year::::::::::::::::', m['rsp']['n'] )
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['rsp']['n'] ||''
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'currency'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['rsp']['n'] || ''
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'sec_cik'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = m['sec_cik']
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'holding_company'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = $scope.holding_data['n']||''
                      }else if ($scope.basic_info_disp_dict[data_vals]['k'] == 'subsidary_company'){
                             $scope.basic_info_disp_dict[data_vals]['v'] = $scope.subsidary_data 
                      }

               }
    }
     }

    $scope.show_selected_company_info = function(){
           $scope.config.parent_scope.preview_data = false;
           $scope.config.parent_scope.module_click_func($scope.selected_company_data)
    }

    $scope.basic_info_disp_dict = [{'n':'Name', 'k':'company_name', 'v':'','typ': 'txt'},{'n':'Ticker', 'k':'ticker', 'v':''},{'n':'SEC_CIK', 'k':'sec_cik', 'v':''},{'n':'Country', 'k':'country', 'v':'','v1':''},{'n':'Logo', 'k':'comp_logo', 'v':''},{'n':'Filing Frequency', 'k':'filing_frequency', 'v':''},{'n':'Accounting Standard', 'k':'accessors_standard', 'v':'','v1':''},{'n':'Currency', 'k':'currency', 'v':''},{'n':'Industry', 'k':'industry', 'v':'','v1':''}, {'n':'Financial Year Start', 'k':'financial_year_start', 'v':''},  {'n':'Financial Year End', 'k':'financial_year_end', 'v':'','up_st':0}, {'n':'Reporting Start Period', 'k':'reporting_start_period', 'v':'','v1':'', 'up_st':0, 'up_st1':0}, {'n':'Holding Company', 'k':'holding_company', 'v':'','v1':'', 'up_st':0, 'up_st1':0}, {'n':'Subsidary Company', 'k':'subsidary_company', 'v':[],'v1':'','typ':'drp','up_st':0, 'up_st1':0}]

    $scope.selected_company_data ={}
    $scope.fetchall_data = function(objs, company_id){
           $scope.selected_company_data = objs
           console.log('selected doc_id:::::::::::::::', objs)
           var post_data = {'cmd_id': 52, 'rid':company_id}
           $scope.config.parent_scope.ps   = true;
           tasService.ajax_request(post_data, 'POST', $scope.cl_bk_module_meta_data)
    }
});

app.directive('popupDisplay', function(){
    return {
       restrict: 'AE',
       template: `<div  style="width:100%; position: relative; position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(26,54,126,0.125);border-radius: .25rem;box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);border-width: 0;transition: all .2s;" >
								<div class="topic_header">
                                                                     <div class="header_contnets">Basic Information</div>
                                                                   <!--  <div class="btn btn-sm btn-success uplaod_files" style="margin-top: 5px;margin-right: 10px;" ng-click="show_selected_company_info()">View</div>-->
                                                                </div>
                                                                <div class="contents_div">
									<div class="clgbb_p"  ng-repeat="basic_in in basic_info_disp_dict  track by $index" >
                                                                                     
										<code class="clgbbn_p">{{basic_in['n']}}</code>
										<div class="clgbbt_p">
                                                                                   <!-- Group of material radios - option 1 -->

									          <input type="text" ng-model="basic_in['v']" placeholder="{{basic_in['n']}}" class="form-control sl_cip" ng-if="basic_in['k'] != 'filing_frequency' && basic_in['k'] != 'subsidary_company'" readonly>
									          <div ng-model="basic_in['v']" placeholder="{{basic_in['n']}}" class="form-control sl_cip browse-button" ng-class="{disabled: edit_c_flg}" ng-if="(basic_in['k'] == 'comp_logo' && selected_rad == 'Browse') ">
                                                                                       <input type="file">
                                                                                  </div>
                                                                                    <div class="clgbb_p table_cont" ng-if="basic_in['k'] == 'subsidary_company' && subsidary_company_lsts.length >0"  style="width:auto">
                                                                                     <div class="table_container" > 
                                                                                      <table style="width:100%; ">
                                                                                         <tr style="height:30px;"><th class="taxonomy_data_th_cls first">Subsidary Companies</th><th class="taxonomy_data_th_cls first">Delete</th></tr>
                                                                                           <tbody>
                                                                                               <tr ng-repeat = "comp_lst in subsidary_company_lsts track by $index" style="height:35px">
                                                                                                  <td class="taxonomy_data_td_cls first" ng-click="display_subsidary_compant_details(comp_lst)" style="cursor:pointer">{{comp_lst['n']}}</td>
                                                                                                  <td class="taxonomy_data_td_cls first" style="color:red" ng-click="delete_selected_susidary_data(comp_lst)" style="cursor:pointer">x</td>
                                                                                                </tr>
                                                                                           </tbody>
                                                                                       </table>
                                                                                    </div> 
                                                                                   </div> 
                                                                                  <div class="display_ff" ng-repeat ="data in basic_in['drp_lst']" ng-class="{active: selected_frequency[data['n']]== data['n'] ,'hide': data['n'] == ''}"  ng-if="basic_in['typ'] == 'list_data' ">
                                                                                    
                                                                                         <div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok"  style="user-select: none; float: left;"   ng-class="{'ui-grid-row-selected': selected_frequency[data['n']]}" ng-click="add_or_remove_filing_frequency(data)" ng-if="selected_frequency[data['n']] != ''">&nbsp;</div>
                                                                                         <div class="ff_data"> {{data['n']}}</div>
                                                                                    </div>
                                                               <div class="clgbb_p table_cont"  ng-if="selected_data && basic_in['k'] == 'filing_frequency'">                                                        
                                                                    <div class="table_container" > 
                                                                     
                                                                          <table style="width:100%; ">
                                                                               <tr style="height:30px;"><th class="taxonomy_data_th_cls first">Period</th><th  class="taxonomy_data_th_cls">From Month</th><th  class="taxonomy_data_th_cls">To Month</th><!--<th  class="taxonomy_data_th_cls">Del Row</th>--></tr>                                
                                                                               <tbody>
                                                                                 <tr ng-repeat = "data_vals in display_data_vals track by $index">
                                                                                     <td class="taxonomy_data_td_cls first">{{data_vals[0]}}</td>
                                                                                     <td class="taxonomy_data_td_cls">
                                                                                           {{data_vals[1]['n']}}
                                                                                     </td>
                                                                                     <td class="taxonomy_data_td_cls">
                                                                                           {{data_vals[2]['n']}}
                                                                                     </td>
                                                                                 </tr>
                                                                               </tbody>

                                                                          </table> 
                                                                    </div>
                                                                         </div>
										</div>
                                                                               
									</div>
                                                                 </div>`,
       controller: 'popup_controller',
       scope:{
                'config': '='
       },
       link: function(scope, elm, attrs, controller){
       },
   }
});
