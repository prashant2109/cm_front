var app = angular.module('popupModule', ['ui.grid', 'ui.grid.cellNav', 'ui.grid.pinning', 'ui.grid.edit', 'ui.grid.treeView', 'ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.pagination', 'ui.grid.selection',  'ui.grid.infiniteScroll', 'ui.bootstrap'])
app.controller('popup_controller', function($scope,$rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService){
    $scope.Object = Object
    $scope.config.scope = $scope
    $scope.sl_c_dic_meta ={} 
    $scope.selected_frequency = {}
    $scope.display_data_vals =[]
    $scope.cmp_info	= {}
    $scope.cl_bk_edit_company = function(res){
       if (res['message'] == 'done'){
	  $scope.cmp_info	= res
          $scope.basic_info_disp_dict.forEach(function(r){
                     r.v = $scope.cmp_info['company_mgmt'][r.k] 
          })
	}
    }

    $scope.show_selected_company_info = function(){
           $scope.config.parent_scope.preview_data = false;
           $scope.config.parent_scope.module_click_func($scope.selected_company_data)
    }

    $scope.basic_info_disp_dict = [{
									'n': 'Name',
									'k': 'company_name',
									'typ': 'txt',
                                                                        'keys': 'company_name',
                                                                }, {
                                                                        'n': 'Filing Company',
                                                                        'k': 'filing_company',
                                                                        'typ': 'txt',
								}, {
									'n': 'Ticker',
									'k': 'ticker',
									'typ': 'txt',
                                                                        
								}, {
									'n': 'SEC_CIK',
									'k': 'sec_cik',
									'typ': 'txt', 
                                                                        'keys': 'company_name',
								}, {
									'n': 'Country',
									'k': 'country',
									'typ': 'drp',
									'def_k': 'country',
								}, {
									'n': 'Logo',
									'k': 'logo',
									'typ': 'txt',
                                                                        'keys': 'logo', 
								}, {
									'n': 'Entity Type',
									'k': 'entity_type',
									'typ': 'drp',
									'def_k': 'entity_list',
                                                                        
								}, {
									'n': 'Filing Frequency',
									'k': 'filing_frequency',
									'typ': 'list_data',
									'def_k': 'filing', 
									'def_k1': 'month', 
 
								}, {
									'n': 'Accounting Standard',
									'k': 'accessors_standard',
									'typ': 'drp',
									'def_k': 'acc',
								}, {
									'n': 'Currency',
									'k': 'currency',
									'typ': 'drp',
									'def_k': 'currency_list',
								}, {
									'n': 'Industry',
									'k': 'industry',
									'typ': 'drp',
									'def_k': 'indust',
								}, {
									'n': 'Financial Year Start',
									'k': 'financial_year_start',
									'typ': 'drp',
									'def_k': 'month',
								}, {
									'n': 'Financial Year End',
									'k': 'financial_year_end',
									'typ': 'drp',
									'def_k': 'month',
								}, {
									'n': 'Reporting Start Period',
									'k': 'reporting_start_period',
									'typ': 'drp',
									'def_k': 'filing',
								}, {
									'n': 'Holding Company',
									'k': 'holding_company',
									'typ': 'drp',
								}, {
									'n': 'Subsidary Company',
									'k': 'subsidary_company',
									'typ': 'drp',
								},{
                                                                        'n': 'Company Website',
                                                                        'k': 'company_url',
                                                                        'typ': 'txt',
                                                                }, {
                                                                        'n': 'User Relation Website',
                                                                        'k': 'user_relation_url',
                                                                        'typ': 'txt',
                                                                }, {
                                                                        'n': 'Client Id',
                                                                        'k': 'id',
                                                                        'k1': 'Name',
                                                                        'typ': 'txt',
                                                                }, {
                                                                        'n': 'Address',
                                                                        'k': 'address', 
                                                                        'typ': 'drp',
                                                                        'def_k': 'country',
                                                                }, {
                                                                        'n': 'Sec Industry',
                                                                        'k': 'sec_industry',
                                                                        'typ': 'txt',
                                                                        'keys': 'company_name',
                                                                }, {
                                                                        'n': 'Sec Sector',
                                                                        'k': 'sec_sector',
                                                                        'typ': 'txt',
                                                                        'keys': 'company_name',
                                                                }, {
                                                                        'n': 'Sector',
                                                                        'k': 'sector',
                                                                        'typ': 'txt',
                                                                        'keys': 'company_name',
                                                                }
                                                               ];

    $scope.selected_company_data ={}
    $scope.fetchall_data = function(objs, company_id){
           $scope.selected_company_data = objs
           var post_data = {'cmd_id': 64, 'rid':company_id}
           $scope.config.parent_scope.ps   = true;
           tasService.ajax_request(post_data, 'POST', $scope.cl_bk_edit_company)
    }
});

app.directive('popupDisplay', function(){
    return {
       restrict: 'AE',
       template: `<div  style="width:100%; position: relative; position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(26,54,126,0.125);border-radius: .25rem;box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);border-width: 0;transition: all .2s;" >
								<div class="topic_header">
                                                                     <div class="header_contnets">Basic Information</div>
                                                                         <div class="btn btn-sm btn-success uplaod_files" style="margin-top: 5px;margin-right: 10px;" ng-click="show_selected_company_info()">View</div>
                                                                </div>
                                                                <div class="contents_div">
								   <div class="clgbb_p"  ng-repeat="basic_in in basic_info_disp_dict  track by $index" >
                                                                        <code class="clgbbn_p">{{basic_in['n']}}</code>
									          <input type="text" ng-model="basic_in['v']" placeholder="{{basic_in['n']}}" class="form-control sl_cip" ng-if="basic_in['k'] != 'filing_frequency' && basic_in['k'] != 'subsidary_company' &&  basic_in['k'] != 'ticker' &&  basic_in['k'] != 'currency' && basic_in['k'] != 'accessors_standard' && basic_in['k'] != 'country' &&  basic_in['k'] != 'entity_type' && basic_in['k'] != 'holding_company' && basic_in['k'] != 'financial_year_end' && basic_in['k'] != 'financial_year_start'  && basic_in['k'] != 'company_url' && basic_in['k'] != 'reporting_start_period' && basic_in['k'] != 'industry' && basic_in['k'] != 'user_relation_url'  && basic_in['k'] != 'id' && basic_in['k'] != 'sector' && basic_in['k'] != 'sec_sector' && basic_in['k'] != 'sec_industry'" readonly>
									          <input type="text" ng-model="basic_in['v']['n']" placeholder="{{basic_in['n']}}" class="form-control sl_cip" ng-if="basic_in['k'] == 'country' || basic_in['k'] == 'entity_type' || basic_in['k'] == 'company_url' || basic_in['k'] == 'holding_company' || basic_in['k'] == 'financial_year_end' || basic_in['k'] == 'financial_year_start' || basic_in['k'] == 'reporting_start_period' ||  basic_in['k'] == 'industry' || basic_in['k'] == 'sector' || basic_in['k'] == 'sec_sector' || basic_in['k'] == 'sec_industry'" readonly>

         <div class="clgbb_p table_cont" style="width:100% !important; box-shadow: none; border :none ; margin-top:0px; flex-direction: row" ng-if="basic_in['k'] == 'ticker' ">
        <div ng-repeat="(version, vals)  in cmp_info['company_mgmt']['ticker']" class= "displat-selected-version" title="{{vals['n']}}">
                <div class="pop-ver-sel-cls-left">
                  {{vals['n']}}
                </div>
        </div>
        </div>

            
      <div class="clgbb_p table_cont" style="width:100% !important; box-shadow: none; border :none ; margin-top:0px; flex-direction: row" ng-if="basic_in['k'] == 'currency'">
        <div ng-repeat="(version, vals)  in cmp_info['company_mgmt']['currency']" class= "displat-selected-version" title="{{vals['n']}}">
                <div class="pop-ver-sel-cls-left">
                  {{vals['n']}}
                </div>
        </div>
        </div>


         <div class="clgbb_p table_cont" style="width:100% !important; box-shadow: none; border :none ; margin-top:0px; flex-direction: row" ng-if="basic_in['k'] == 'accessors_standard'">
        <div ng-repeat="(version, vals)  in cmp_info['company_mgmt']['accessors_standard']" class= "displat-selected-version" title="{{vals['n']}}">
                <div class="pop-ver-sel-cls-left">
                  {{vals['n']}}
                </div>
        </div>
        </div>


       <div class="clgbb_p table_cont" style="width:100% !important; box-shadow: none; border :none ; margin-top:0px; flex-direction: row" ng-if="basic_in['k'] == 'user_relation_url'">
        <div ng-repeat="(version, vals)  in cmp_info['company_mgmt']['user_relation_url']" class= "displat-selected-version" title="{{vals['n']}}">
                <div class="pop-ver-sel-cls-left">
                  {{vals['n']}}
                </div>
        </div>
        </div>




         <div class="clgbb_p table_cont" ng-if="cmp_info['filing_frequency'].length > 0 && basic_in['k'] == 'filing_frequency' ">                                                                              
               <div class="table_container" > 
			  <table style="width:100%; ">
			       <tr style="height:30px;"><th class="taxonomy_data_th_cls first">Period</th><th  class="taxonomy_data_th_cls">From Month</th><th  class="taxonomy_data_th_cls">To Month</th></tr>                                
			       <tbody>
				 <tr ng-repeat = "data_vals in cmp_info['filing_frequency'] track by $index">
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

            <!-- subsidary company modifications -->
            <div class="clgbb_p table_cont" ng-if="cmp_info['company_mgmt']['subsidary_company'].length > 0 && basic_in['k'] == 'subsidary_company' ">                   
               <div class="table_container" >
                          <table style="width:100%; ">
                               <tr style="height:30px;"><th class="taxonomy_data_th_cls first">Subsidary Companies</th></tr>
                               <tbody>
                                 <tr ng-repeat = "data_vals in cmp_info['company_mgmt']['subsidary_company']  track by $index">
                                     <td class="taxonomy_data_td_cls first">{{data_vals['n']}}</td>
                                 </tr>
                               </tbody>

                          </table>
               </div>
            </div>

           <div class="clgbb_p1 edit" ng-repeat="data in cmp_info['company_mgmt']['client_info']" ng-if="cmp_info['company_mgmt']['client_info'].length > 0 && basic_in['k'] == 'id' ">
		<code class="clgbbn_p1"><input type="text" ng-model="data['id']" class="form-control sl_cip" disabled style="text-transform: capitalize;"></code>                                          
		<div class="clgbbt_p1"><input type="text" ng-model="data['Name']" class="form-control sl_cip" disabled></div>
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
