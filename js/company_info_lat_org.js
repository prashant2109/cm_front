var app = angular.module("companyInfo", ['ui.grid', 'ui.grid.cellNav', 'ui.grid.pinning', 'ui.grid.edit', 'ui.grid.treeView', 'ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.pagination', 'ui.grid.selection',  'ui.grid.infiniteScroll', 'ui.bootstrap'])
app.controller("company_info", function($scope,  $rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService){
        $('#body_wrapper').show();
        $scope.Object = Object
        $scope.config.scope = $scope
        $scope.font_list = font_list;
	$scope.side_menu_active = true;
        $scope.selected_rad = 'url';

         
        /***********************************/
         $scope.popup_data = {parent_scope: $scope}
        /***********************************/
        $scope.color_map = {'insert':'green', 'delete':'red', 'update':'orange'}
        /***********************************/
        $scope.table_header_lists = [{'n':'CompanyName', 'k':'company_name'}, {'n':'DocType', 'k':'doc_type'},{'n': 'FiligType', 'k':'filing_type'}, {'n':'Period', 'k':'period'},{'n': 'Financial Year', 'k':'finantial_year'},{'n': 'Document Name', 'k':'document_name'}, {'n':'Document Release Date','k':'document_release_date'},{'n':'Document From', 'k':'document_form'},{'n':'Document To', 'k':'document_to'},{'n': 'Document Download Date', 'k':'document_download_date'},{'n':'Previous Release Date', 'k':'previous_release_date'},{'n':'FYE', 'k':'fye'}, {'n':'Language', 'k':'language'}, {'n':'Browse', 'k':'browse'}]
        /***********************************/
         $scope.display_data = [{'doc_id':'new','company_name':'', 'doc_type':'', 'filing_type':'', 'period':'', 'finantial_year':'', 'document_name':'', 'document_release_date':'', 'document_form':'', 'document_to':'', 'document_download_date':'', 'previous_release_date':'', 'fye':'', 'language':'', 'browse':''}]
        /***********************************/
         $scope.data_dict_doc = {'company_name':'', 'doc_type':'', 'filing_type':'', 'period':'', 'finantial_year':'', 'document_name':'', 'document_release_date':'', 'document_form':'', 'document_to':'', 'document_download_date':'', 'previous_release_date':'', 'fye':'', 'language':'', 'add_new':''}
        /***********************************/
         $scope.doc_type_lst =[{'k':'', 'n':''},{'k':'PeriodicFinancialStatement', 'n':'PeriodicFinancialStatement'}]
        /***********************************/
         $scope.filing_type_lst= [{"k":"","n":""},{"k":"1","n":"1"},{"k":"1-A","n":"1-A"},{"k":"1-E","n":"1-E"},{"k":"1-K","n":"1-K"},{"k":"1-N","n":"1-N"},{"k":"1-SA","n":"1-SA"},{"k":"1-U","n":"1-U"},{"k":"1-Z","n":"1-Z"},{"k":"2-E","n":"2-E"},{"k":"3","n":"3"},{"k":"3","n":"3"},{"k":"4","n":"4"},{"k":"4","n":"4"},{"k":"5","n":"5"},{"k":"5","n":"5"},{"k":"6-K","n":"6-K"},{"k":"7-M","n":"7-M"},{"k":"8-A","n":"8-A"},{"k":"8-K","n":"8-K"},{"k":"8-M","n":"8-M"},{"k":"9-M","n":"9-M"},{"k":"10","n":"10"},{"k":"10-D","n":"10-D"},{"k":"10-K","n":"10-K"},{"k":"10-M","n":"10-M"},{"k":"10-Q","n":"10-Q"},{"k":"11-K","n":"11-K"},{"k":"12b-25","n":"12b-25"},{"k":"13F","n":"13F"},{"k":"13H","n":"13H"},{"k":"15","n":"15"},{"k":"15F","n":"15F"},{"k":"17-H","n":"17-H"},{"k":"18","n":"18"},{"k":"18-K","n":"18-K"},{"k":"19b-4","n":"19b-4"},{"k":"19b-4(e)","n":"19b-4(e)"},{"k":"19b-7","n":"19b-7"},{"k":"20-F","n":"20-F"},{"k":"24F-2","n":"24F-2"},{"k":"25","n":"25"},{"k":"40-F","n":"40-F"},{"k":"144","n":"144"},{"k":"ABS DD-15E","n":"ABS DD-15E"},{"k":"ABS-15G","n":"ABS-15G"},{"k":"ABS-EE","n":"ABS-EE"},{"k":"ADV","n":"ADV"},{"k":"ADV-E","n":"ADV-E"},{"k":"ADV-H","n":"ADV-H"},{"k":"ADV-NR","n":"ADV-NR"},{"k":"ADV-W","n":"ADV-W"},{"k":"ATS","n":"ATS"},{"k":"ATS-N","n":"ATS-N"},{"k":"ATS-R","n":"ATS-R"},{"k":"BD","n":"BD"},{"k":"BD-N","n":"BD-N"},{"k":"BDW","n":"BDW"},{"k":"C","n":"C"},{"k":"CA-1","n":"CA-1"},{"k":"CB","n":"CB"},{"k":"CFPORTAL","n":"CFPORTAL"},{"k":"CUSTODY","n":"CUSTODY"},{"k":"D","n":"D"},{"k":"F-1","n":"F-1"},{"k":"F-3","n":"F-3"},{"k":"F-4","n":"F-4"},{"k":"F-6","n":"F-6"},{"k":"F-7","n":"F-7"},{"k":"F-8","n":"F-8"},{"k":"F-10","n":"F-10"},{"k":"F-80","n":"F-80"},{"k":"F-N","n":"F-N"},{"k":"F-X","n":"F-X"},{"k":"ID","n":"ID"},{"k":"MA","n":"MA"},{"k":"MA","n":"MA"},{"k":"MA-I","n":"MA-I"},{"k":"MA-NR","n":"MA-NR"},{"k":"MA-W","n":"MA-W"},{"k":"MSD","n":"MSD"},{"k":"MSDW","n":"MSDW"},{"k":"N-1A","n":"N-1A"},{"k":"N-2","n":"N-2"},{"k":"N-3","n":"N-3"},{"k":"N-4","n":"N-4"},{"k":"N-5","n":"N-5"},{"k":"N-6","n":"N-6"},{"k":"N-6EI-1","n":"N-6EI-1"},{"k":"N-6F","n":"N-6F"},{"k":"N-8A","n":"N-8A"},{"k":"N-8B-2","n":"N-8B-2"},{"k":"N-8B-4","n":"N-8B-4"},{"k":"N-8F","n":"N-8F"},{"k":"N-14","n":"N-14"},{"k":"N-17D-1","n":"N-17D-1"},{"k":"N-17f-1","n":"N-17f-1"},{"k":"N-17f-2","n":"N-17f-2"},{"k":"N-18f-1","n":"N-18f-1"},{"k":"N-23c-3","n":"N-23c-3"},{"k":"N-27D-1","n":"N-27D-1"},{"k":"N-54A","n":"N-54A"},{"k":"N-54C","n":"N-54C"},{"k":"N-CEN","n":"N-CEN"},{"k":"N-CR","n":"N-CR"},{"k":"N-CSR","n":"N-CSR"},{"k":"N-LIQUID","n":"N-LIQUID"},{"k":"N-MFP","n":"N-MFP"},{"k":"N-PORT","n":"N-PORT"},{"k":"N-PX","n":"N-PX"},{"k":"N-Q","n":"N-Q"},{"k":"NRSRO","n":"NRSRO"},{"k":"NRSRO","n":"NRSRO"},{"k":"PF","n":"PF"},{"k":"PILOT","n":"PILOT"},{"k":"R31","n":"R31"},{"k":"S-1","n":"S-1"},{"k":"S-3","n":"S-3"},{"k":"S-4","n":"S-4"},{"k":"S-6","n":"S-6"},{"k":"S-8","n":"S-8"},{"k":"S-11","n":"S-11"},{"k":"S-20","n":"S-20"},{"k":"SBSE","n":"SBSE"},{"k":"SBSE-A","n":"SBSE-A"},{"k":"SBSE-BD","n":"SBSE-BD"},{"k":"SBSE-C","n":"SBSE-C"},{"k":"SBSE-W","n":"SBSE-W"},{"k":"SCI","n":"SCI"},{"k":"SD","n":"SD"},{"k":"SDR","n":"SDR"},{"k":"SE","n":"SE"},{"k":"SF-1","n":"SF-1"},{"k":"SF-3","n":"SF-3"},{"k":"SIP","n":"SIP"},{"k":"T-1","n":"T-1"},{"k":"T-2","n":"T-2"},{"k":"T-3","n":"T-3"},{"k":"T-4","n":"T-4"},{"k":"T-6","n":"T-6"},{"k":"TA-1","n":"TA-1"},{"k":"TA-2","n":"TA-2"},{"k":"TA-W","n":"TA-W"},{"k":"TCR","n":"TCR"},{"k":"TH","n":"TH"},{"k":"WB-APP","n":"WB-APP"},{"k":"X-17A-5 Part I","n":"X-17A-5 Part I"},{"k":"X-17A-5 Part II","n":"X-17A-5 Part II"},{"k":"X-17A-5 Part II","n":"X-17A-5 Part II"},{"k":"X-17A-5 Part IIA","n":"X-17A-5 Part IIA"},{"k":"X-17A-5 Part IIA","n":"X-17A-5 Part IIA"},{"k":"X-17A-5 Part IIB","n":"X-17A-5 Part IIB"},{"k":"X-17A-5 Part III","n":"X-17A-5 Part III"},{"k":"X-17A-5 Schedule I","n":"X-17A-5 Schedule I"},{"k":"X-17A-19","n":"X-17A-19"},{"k":"X-17F-1A","n":"X-17F-1A"},{"k":"n/a","n":"n/a"},{"k":"n/a","n":"n/a"},{"k":"n/a","n":"n/a"},{"k":"n/a","n":"n/a"},{"k":"n/a","n":"n/a"},{"k":"n/a","n":"n/a"}]
        /***********************************/
         $scope.years_list =[];       
         var min_year = 2000;
         var d = new Date();
         var max_year = d.getFullYear();
         for(var i = 0; i <= max_year - min_year; i++) {
            var dicts ={}
            dicts['n'] = String(i + min_year)
            dicts['k'] = String(i + min_year)
            $scope.years_list.push(dicts)
         }
         $scope.years_list.splice(0, 0, {'k':'', 'n':''})
        /***********************************/
         $scope.address_type = [{'k':1, 'n':'Business Address'}, {'k':2, 'n':'Mailing Address'}]
        /***********************************/
        $scope.dropDowns= {parent_scope:  $scope,options: {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true},  'callBack': 'update_years'}
        $scope.dropDowns.data=   $scope.years_list
        //$timeout(function(){$scope.dropDowns.scope.selected ={'n':'Name', 'k':'company_name', 'v':'', 'typ': 'txt'}});
        /***********************************/

        $scope.selected_frequency = {}
        /***********************************/
         window.scope_vars = $scope
	/***********************************/
	$scope.do_resize = function(){
        	$timeout(function(){
                	window.dispatchEvent(new Event('resize'));
        	});
    	}
	/***********************************/
         window.delete_contents = function(ev) {
           $scope.$apply(function(){
             if (ev.keyCode == 13) {
                $scope.add_meta_func()
             }
           });
         }
	/***********************************/
	$scope.logout_func = function(){
		window.location.href = "/login";
	}
	/***********************************/
         function getFirstData() {
            var newData = getPage($scope.company_infos, $scope.lastPage);
            $scope.data = $scope.data.concat(newData);
         }
	/***********************************/
         $scope.max_length =0
         
         $scope.cl_bk_init_func_comp_new = function(res){
                if (res['message'] == 'done'){
                    $scope.company_infos = $scope.company_infos.concat(res['data'])
                    if (res['data'].length >0){
                           $scope.max_length = $scope.lastPage+1
                    }
                    $scope.lrid  = res['lrid']
                    $scope.t_cnt  = res['t_cnt']
                    var newData = getPage($scope.company_infos, $scope.lastPage);
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.data = $scope.data.concat(newData);
                    return $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < $scope.max_length);
                  
                }
         }
	/***********************************/
         $scope.firstPage = 0;
         $scope.lastPage = 0
         function getDataDown() {
             
             $scope.lastPage++;
             var post_data = {'cmd_id': 36, 'lrid': $scope.lrid ,'t_cnt':$scope.t_cnt};
             tasService.ajax_request(post_data, 'POST', $scope.cl_bk_init_func_comp_new);
        }
 
	/***********************************/
        function getPage(data, page) {
                 var res = [];
                  for (var i = (page * $scope.row_count); i < (page + 1) *  $scope.row_count && i <  data.length; ++i) {
                         res.push(data[i]);
                  }
                 return res;
         }
	/***********************************/
         $scope.gridOptionsDoc = {
               infiniteScrollRowsFromEnd: 20,
               rowHeight:80,
               infiniteScrollUp: true,
               infiniteScrollDown: true,
               enableFiltering:true,
               showTreeExpandNoChildren:false,
               showTreeRowHeader: false,
               enableColumnMenus: false,
               columnDefs: [],
               data:'data',
               onRegisterApi: function(gridApi){
      	                gridApi.infiniteScroll.on.needLoadMoreData($scope, getDataDown);
      	                //gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, getDataUp);
                        $scope.gridApi = gridApi;
               }
         }
	/***********************************/
         $scope.data = []
	/***********************************/
         $scope.gridOptionsDoc.data = []
         $scope.gridOptionsDoc.columnDefs = [
          {
            field: 'sn',
            displayName: 'S.No',
            width: 40,
            pinnedLeft: false,
            pinnedRight: false,
            cellEditableCondition:false,
            headerCellClass: 'hdr_cntr',
            cellTemplate:
                     `<div class="ui-grid-cell-contents row_col_grid_cell project" title="{{COL_FIELD}}" ng-click="grid.appScope.module_click_func(row.entity)" ng-class="{active: grid.appScope.sel_data_drop['sel']['sn'] == row.entity.sn}">
                           <div style="padding-right:10px;padding-top: 20px; padding-left:7px; font-weight: bold; color: #343a40;">
                             {{COL_FIELD}}
                           </div>
                     </div>`
          },       
          {
            field: 'n',
            displayName: 'Company Info',
            width: '*',
	    minWidth: 80,
            pinnedLeft: false,
            pinnedRight: false,
            cellEditableCondition:false,
	    headerCellClass: 'hdr_cntr',
            cellTemplate:
                     `<div class="ui-grid-cell-contents row_col_grid_cell project" title="{{COL_FIELD}}" ng-click="grid.appScope.module_click_func(row.entity)" ng-class="{active: grid.appScope.sel_data_drop['sel']['sn'] == row.entity.sn}">
                                <div class="mtr_card__widget_content_ui">
								<i class="fa fa-building metismenu-icon_data" aria-hidden="true"></i>
								<div class="mtr_card__widget_heading"  > {{COL_FIELD}}</div>
								<div class="mtr_card__widget_subheading">
                                                                       <div class="mtr_card__widget_subheading_ticker" ng-bind-html = 'row.entity.ticker'></div>
                                                                       <div class="mtr_card__widget_subheading_country" ng-bind-html = 'row.entity.sel_country["n"]'></div>
                                                                </div>
                                </div>
                     </div>`
        }]
	/***********************************/
         show_data_info = function(){
             console.log('data:::::::', data)
         }
	/***********************************/
         $scope.add_buttons = function(company_lists){
             var lists_data = []
             for(var data in company_lists){
                 var lsts = `<div class='div_v' style = 'width:100%; height:100; position:relative'>
                               <div class='div_val'>`+company_lists[data]['n']+`</div>
                                    <span class='div_info' ng-click='config.parentScope.show_data_info(); event.stopPropogation()' >
                                        <i   class='fa fa-info' aria-hidden='true'></i>
                                    </span>
                             </div>`
                 var dict_d ={'n': lsts, 'k': company_lists[data]['k']} 
                 lists_data.push(dict_d)
             }
             return lists_data

         }
	/***********************************/
	/***********************************/
        $scope.company_details =[]
        $scope.cl_bk_load_company = function(res){
         if(res["message"] == 'done'){
           $scope.company_infos          =   res['data']
           var columnDefs = $scope.create_headers_doc()
           $scope.gridOptionsDoc.data = res['data']
           $scope.lrid                   =   res['lrid']
           $scope.t_cnt                  =   res['t_cnt']
           $scope.row_count              =   res['row_cnt']
           $scope.company_details        =   res['data']
           $scope.basic_info_disp_dict.forEach(function(r){
            if(r.k == 'subsidary_company' || r.k == 'holding_company'){
                r.drp_lst   = {'data':res['data'], 'options': {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true},'callBack': 'update_data', 'id_val':r.k ,parent_scope:  $scope}
              }
            })
             $scope.sel_d = true 
             $scope.new_module_func()
         }
     }
	/***********************************/
         $scope.update_year = function(type_key , results){
             $scope.basic_info_disp_dict.forEach(function(res){
                      if (res.k == 'reporting_start_period'){
                         res.v1 = type_key
                      }
               });
         }

	/***********************************/
         $scope.load_state_drop = function(ress){
                var country = Number(ress['k'])
                console.log('country::::::::::::::::', country)
                var states  =  $scope.country_state_dict[country]
                console.log('states::::::::::::', states)
                $timeout(function(){
                $scope.basic_info_disp_dict.forEach(function(r){
                   console.log('r.k::::::::::::::::::', r.k)
                   if(r.k == 'address'){
                      
                     console.log('load states::::::::::::::', r) 
                     r.drp_lst2['data'] = states
                     //$scope.$apply()
                     console.log('drp lats::::::::::', r)
                    }
                })
               })
        }
           
	/***********************************/
         $scope.update_address = function(res, eve){
                var event_index = eve['ev']
                if (eve.id_val == 'address'){
                   $scope.company_address[event_index]['country']['v'] = res
                }else{$scope.company_address[event_index][eve.id_val]['v'] = res}
                $scope.basic_info_disp_dict.forEach(function(r){
                       if (r.k == 'address'){
                            r.v = res
                       }
                });
                
                 
         }
	/***********************************/
         $scope.update_data = function(objs, dd){
                $scope.basic_info_disp_dict.forEach(function(r){
                       
                       if (r.k == dd.id_val){
                         if (r.k == 'accessors_standard' || r.k == 'currency' || r.k == 'subsidary_company'){
                           var chk_flg = false
                           $scope.cmp_info['company_mgmt'][r.k].forEach(function(res){
                                  if (res.k == objs.k){
                                     chk_flg = true
                                  }
                           });
                           if (chk_flg == true){
                             tasAlert.show('Please enter company name.', 'warning', 1000);
                             return;
                           }
                             $scope.cmp_info['company_mgmt'][r.k].push(objs)
                             r.v = $scope.cmp_info.company_mgmt[r.k]
                            }
                         else{
                             r.v =  objs
                             if (dd.id_val == "address"){
                                $scope.load_state_drop(objs)
                                $scope.update_address(objs, dd)
                              }
                            }
                       }
                       
                })
         }
	/***********************************/
	$scope.init_func = function(){
		var post_data = {'cmd_id': 62};
		tasService.ajax_request(post_data, 'POST', $scope.cl_bk_default_settings);
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
  	                                                                'drp_lst1': {'data':$scope.years_list, 'options': {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true}, parent_scope:  $scope, 'id_val':'reporting_start_period', 'callBack': 'update_year' }
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
                                                                        'typ': 'list_data',
                                                                        'def_k': 'country',
  	                                                                'drp_lst1': {'data':$scope.address_type, 'options': {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true}, parent_scope:  $scope, 'id_val':'type', 'callBack': 'update_address' },
  	                                                                'drp_lst2': {'data':[], 'options': {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true}, parent_scope:  $scope, 'id_val':'state', 'callBack': 'update_address' },
                                                                }
                                                               ];
        //$scope.company_address = [{'type':{'k':'type', 'n':'Type',  'v':{}}, 'address':{'k':'address', 'n':'Address', 'v':''},'country':{'k':'country', 'n':'Country', 'v':{}}, 'state':{'k':'state', 'n':'State', 'v':{}}, 'pincode':{'k':'pincode', 'n':'Pincode',  'v':''}}]
        $scope.company_address = []
	$scope.languages = []
        $scope.acc_std = []
	$scope.cl_bk_default_settings	= function(res){
           console.log('res data:::::::::::::::', res)
           if(res["message"] == 'done'){
			$scope.basic_info_disp_dict.forEach(function(r){
				if(r.def_k in  res){
                                        r.drp_lst       = {'data':res[r.def_k], 'options': {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true}, 'callBack': 'update_data',parent_scope:  $scope, 'id_val':r.k}
                                        //r.scope.selected = {'n':'Name', 'k':'company_name', 'v':'', 'typ': 'txt'}
                                }

				if(r.def_k1 in  res){
                                        r.drp_lst1       = {'data':res[r.def_k1], 'options': {filter: true, arrow: false, icon: false, 'border-top': true, 'border-bottom': true,'border-left': true, 'border-right': true}, 'callBack': 'update_data',parent_scope:  $scope, 'id_val':r.k}
                                        //r.scope.selected = {'n':'Name', 'k':'company_name', 'v':'', 'typ': 'txt'}
                                }
                                if ('languages' in res){$scope.languages = res['languages']}
                                if ('filing' in res){$scope.acc_std = res['filing']}
                                if ('states' in res){$scope.country_state_dict = res['states']}
			});
                         
			var post_data = {'cmd_id': 63};
			tasService.ajax_request(post_data, 'POST', $scope.cl_bk_load_company);
        }
	}
	$scope.set_init_value	= function(res){
	}
	$scope.init_func();
	$scope.sl_c_dic = {};
	/***********************************/
         $scope.company_add_dicts = {'type':{'k':'type', 'n':'Type',  'val':{}}, 'address':{'k':'address', 'n':'Address', 'val':''}, 'state':{'k':'state', 'n':'State', 'val':{}}, 'country':{'k':'country', 'n':'Country', 'val':{}}, 'pincode':{'k':'pincode', 'n':'Pincode',  'val':''}}
         $scope.add_new_address = function(){
                 //var sdicts = {'type':{'k':'type', 'n':'Type',  'val':{}}, 'address':{'k':'address', 'n':'Address', 'val':''}, 'state':{'k':'state', 'n':'State', 'val':{}}, 'country':{'k':'country', 'n':'Country', 'val':{}}, 'pincode':{'k':'pincode', 'n':'Pincode',  'val':''}}
                 $scope.company_address.push($scope.company_add_dicts)
         }
	/***********************************/
	$scope.save_company_details  = function(){
		var meta_info			= $scope.sl_c_dic_meta['meta'] ||{}
		var filing_frequency	= $scope.display_data_vals
		var save_data			= {}
		$scope.basic_info_disp_dict.forEach(function(data){
			if (data.up_st != 1)return
			
		});
	}
	/***********************************/
        
         $scope.module_save_func = function(){
                row_id = $scope.cmp_info['company_mgmt']['rid']
                $scope.save_vals = {}
                $scope.update_client_details = []
                //var sdicts_others = {'ticker':[], 'user_relation_url': [], 'currency': [], 'accessors_standard': [], 'filing_frequency':[], 'holding_company': {}, 'subsidary_company':[], 'company_url': '', 'user_relation_url':[]}
                var sdicts_others = {}
                $scope.basic_info_disp_dict.forEach(function(res){
                       if (res.v || res.v1){
                          if (res.typ == 'txt'){
                            if (res.k == 'ticker'){ 
                                  sdicts_others[res.k] = res.v1
                            }else if(res.k == 'company_url'){
                                  var data_vals = res.v
                                  data_vals['n'] = encodeURIComponent(data_vals['n'])
                                  sdicts_others[res.k] = data_vals
                            }else if(res.k == 'user_relation_url'){
                                if (res.v1){
                                  $scope.url_data = res.v1
                                  if ($scope.url_data.length > 0){
					  $scope.url_data.forEach(function(r){
					      r['n'] = encodeURIComponent(r.n)
					  })
                                  }
                                  sdicts_others[res.k] = $scope.url_data
                                }
                            }else if(res.k == 'id'){
                                  $scope.update_client_details  = $scope.cmp_info['company_mgmt']['client_info']
                            }else{
                                 $scope.save_vals[res.k] = encodeURIComponent(res.v)
                            }
                          }else if (res.typ == 'drp'){
                             if (res.k == 'accessors_standard'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'accessors_standard'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'filing_frequency'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'currency'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'holding_company'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'subsidary_company'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'company_url'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'user_relation_url'){
                                        sdicts_others[res.k] = res.v
                             }else if(res.k == 'financial_year_start'){
                                        $scope.save_vals[res.k] = res.v['n']
                             }else if(res.k == 'financial_year_end'){
                                        $scope.save_vals[res.k] = res.v['n']
                             }else if(res.k == 'reporting_start_period'){
                                        if(res.v){$scope.save_vals[res.k] = res.v['n']}
                                        if(res.v1){$scope.save_vals['reporting_start_year'] = res.v1['n']}
                             }
                             else{
                                $scope.save_vals[res.k] = res.v['k']
                             }

                          } if (res.k == 'filing_frequency'){
                            sdicts_others[res.k] = res.v
                          } if (res.k == 'address'){
                            console.log('ADDRES:::::::::::::::::::')
                            sdicts_others[res.k] = $scope.company_address
                          }  
                      }
                });
            if ($scope.meta_updated_staus ==1){
               $scope.save_vals['meta_data'] = $scope.cmp_info.company_mgmt['meta_info']
            }
            if (row_id == 'new'){
               if (!('company_name' in $scope.save_vals)){
                  tasAlert.show('Please enter company name','success', 1000)
                  return
               }
            }
            var post_data = {'cmd_id': 65, 'cmp_mgmt': $scope.save_vals, 'table_data': sdicts_others,'client_info': $scope.update_client_details, 'row_id':row_id}
            console.log('json datta::::::::::::::', JSON.stringify(post_data))
            //tasService.ajax_request(post_data, 'POST', $scope.cl_bk_init_update_or_save)
         }
	/***********************************/
         //DELETED.............
         $scope.cl_bk_init_delete = function(res){
                if (res['message'] == 'done'){
                   var index_val = $scope.data.indexOf($scope.sel_data_drop['sel'])
                   if (index_val  > -1) {
                      $scope.data.splice(index_val, 1);
                   } 
                   $scope.update_information = []
                   $scope.sel_data_drop={}
                   $scope.sl_c_dic_meta ={'meta':{}}
                   tasAlert.show('Company info deleted successfully','success', 1000)
                   return
                }
         }
	/***********************************/
         $scope.company_del_func = function(){
              if ((Object.keys($scope.sel_data_drop)).length == 0){
                 tasAlert.show('No company is selected to delete','warning', 1000)
                 return
              }
              var con = confirm("Are you sure that you want to delete selected company details?")
              if (!con){
                 return
              }
              var row_id =  $scope.sel_data_drop['sel']['rid'] || 'no rid'
              if (row_id == 'no rid'){
                 tasAlert.show('Row id is not present','warning', 1000)
                 return
              }
              var post_data = {'cmd_id': 51, 'rid': row_id};
              tasService.ajax_request(post_data, 'POST', $scope.cl_bk_init_delete)
         }
	/***********************************/
         $scope.remove_meta_func_company = function(k, v){
                $scope.meta_updated_staus = 1;
                if ((Object.keys($scope.cmp_info['company_mgmt']['meta_info'])).length == 0){
                   tasAlert.show("nothing is there to delete", "warning", 1000)
                   return
                }
                var con = confirm('Are you sure that you want to delete metadata?')
                if (!con){
                   return
                }
                delete $scope.cmp_info['company_mgmt']['meta_info'][k]
         }
	/***********************************/
         $scope.updated_user = ''
         $scope.updated_time = ''
         $scope.cl_bk_init_update_or_save = function(res){
               if (res['message'] == 'done'){
                   tasAlert.show("Information saved sucessfully", "success", 1000)
                   $scope.basic_info_disp_dict.forEach(function(res){
                          delete res.v
                          delete res.v1
                   });
                 
               }
         }
        /**********************************/
        $scope.update_value = function(type_key, results){
               $scope.basic_info_disp_dict.forEach(function(res){
                      if (type_key == res.k){
                         res.v = results
                      }
               });
        }
        /**********************************/
         $scope.company_add_dicts = {'type':{'k':'type', 'n':'Type',  'val':{}}, 'address':{'k':'address', 'n':'Address', 'val':''}, 'state':{'k':'state', 'n':'State', 'val':{}}, 'country':{'k':'country', 'n':'Country', 'val':{}}, 'pincode':{'k':'pincode', 'n':'Pincode',  'val':''}}
         $scope.update_comp_address = function(){
                $scope.company_address = []
                if ($scope.cmp_info['address'].length > 0){
                   console.log('addres:::::::::::', $scope.cmp_info['address'])
                   $scope.cmp_info['address'].forEach(function(r){
                          var data_dicts = angular.copy($scope.company_add_dicts)
                          console.log('k::::::::',data_dicts)
                          data_dicts['address']['v'] = r['address']
                          data_dicts['country']['v'] = r['country']
                          data_dicts['state']['v'] = r['state']
                          data_dicts['pincode']['v'] = r['pincode']
                          $scope.company_address.push(data_dicts)
                })
           console.log('d::::::::::::', $scope.company_address)
         }}
        /**********************************/
        $scope.update_information = []
        $scope.company_ticker = []
        $scope.currency_lists =[]
        $scope.account_standard = []
	$scope.cmp_info	= {}
        $scope.cl_bk_edit_company = function(res){
               $scope.sel_d = true  
               $scope.config.parent_scope.ps   = false;
               var m = ''
               if (res['message'] == 'done'){
		  $scope.cmp_info	= res
                  $scope.update_comp_address()
		  $timeout(function(){$scope.$apply()});
		}
                $scope.basic_info_disp_dict.forEach(function(res){
                       if (res.drp_lst && res.k != 'filing_frequency' && res.k != 'reporting_start_period'){
                          if ($scope.cmp_info['company_mgmt'][res.k])
                          res.drp_lst.scope.selected = $scope.cmp_info['company_mgmt'][res.k]
                       }
                       if (res.drp_lst && res.k == 'reporting_start_period'){
                          res.drp_lst.scope.selected =  $scope.cmp_info['company_mgmt'][res.k]
                          res.drp_lst1.scope.selected = $scope.cmp_info['company_mgmt']['reporting_start_year']
                       }
                })
                $timeout(function(){$scope.$apply()})
                
	}
    
        /**********************************/
        $scope.sel_data_drop = {}
	$scope.module_edit_flg = false;
	$scope.module_click_func = function(m){
                //$scope.basic_info_disp_dict = angular.copy($scope.basic_info_disp_dict1)
                $scope.selected_data = false
                $scope.selected_frequency  =  {}
                $scope.display_data_vals   =  []
                $scope.lsts                =  []
                $scope.sel_data_drop       =  {}
                $scope.sl_c_dic_meta       =  {'meta':{}}
                
                var post_data = {'cmd_id': 64, 'rid':m.rid}
                $scope.sl_c_dic_meta ={'meta':{}}
                $scope.sel_data_drop['sel'] = m
		$scope.module_edit_flg = true;
		$timeout(function(){$scope.$apply()});
                tasService.ajax_request(post_data, 'POST', $scope.cl_bk_edit_company)
	}
	/***********************************/
	$scope.s_tab = 'company';
	/***********************************/
	/***********************************/
         $scope.add_new_website = function(url){ 
                if (url == ''){
                   tasAlert.show('insert url', 'warning', 1000);
                   return
                }
                $scope.cmp_info.company_mgmt['user_relation_url'].forEach(function(res){
                       if (res['n'] == url){
		          tasAlert.show('url already exists', 'warning', 1000);
                          return
                       }
                })
                $scope.cmp_info.company_mgmt['user_relation_url'].push({'k':'new', 'n':url})
                $scope.basic_info_disp_dict.forEach(function(r){
                   if (r.k == 'user_relation_url'){
                      r.v1 = $scope.cmp_info['company_mgmt']['user_relation_url']
                   }
               });
         }
	/***********************************/
         $scope.new_module_func = function(){ 
                $scope.company_address = []
                $scope.module_edit_flg = false;
                $scope.cmp_info = {}
                var company_mgmt = {'rid': 'new', 'company_id': '', 'company_name':'', 'industry':{}, 'country': {}, 'financial_year_end':{}, 'reporting_start_period': {}, 'rsy': {}, "meta_info": {}, 'financial_year_start': {},  'sec_cik': '', 'logo': '', 'ticker': [], 'currency':  [], 'accessors_standard':[], 'entity_type': {},'user_relation_url': '','company_url': '', 'holding_company':[], 'subsidary_company':[], 'filing_frequency': [], 'company_url':'', 'user_relation_url':[], 'client_info':[], 'filing_company':''}
                $scope.cmp_info['company_mgmt'] = company_mgmt
                $scope.cmp_info['filing_frequency'] = []
                $scope.cmp_info['filing_frequency_d'] = {}
                $scope.company_address.push($scope.company_add_dicts)
                $scope.sel_data_drop['sel'] = {}
                $scope.basic_info_disp_dict.forEach(function(r){
                       if ( r.typ ==  "drp" && r.drp_lst){
                            r.drp_lst.scope.selected = {}
                       }if ( r.typ ==  "drp" && r.drp_lst1){
                            r.drp_lst1.scope.selected = {}
                       }
                       $timeout(function(){$scope.$apply()})
                })
         }
	/***********************************/
	$scope.show_icon_flg = false;
	$scope.show_all_icons_func = function(){
		$scope.show_icon_flg = !$scope.show_icon_flg;
	}
	/***********************************/
	$scope.cls_fnt_pop_func = function(){
		$scope.show_icon_flg = false;
	}
	/***********************************/
	$scope.slct_font_func = function(i){
		$scope.sl_c_dic['fi'] = i;
	}
	/***********************************/
	$scope.icon_filter = '';
	/***********************************/
         $scope.parent_data = ''
         $scope.check_parent = function(from_key, to_key){
                var parent_data_to = $scope.modules['p_dict'][to_key] 
                
                if (to_key == 'root'){
                   return 0
        
                }else if (from_key == parent_data_to){
                   tasAlert.show('Move not applicable', 'warning', 1000); 
                   return 1
                }else {$scope.check_parent(from_key, parent_data_to)}
             
               
         }
	/***********************************/
         $scope.sl_c_dic_meta ={'meta':{}}
        /***********************************/
	$scope.meta_dic = {'k': '', 'v': ''};
        $scope.meta_updated_staus = 0 
	$scope.add_meta_func = function(){
                $scope.meta_updated_staus = 1;
		if($scope.meta_dic['k'] == ''){
			if(!$scope.edit_flg_on){
				tasAlert.show('Please fill the key.', 'warning', 1000);
			}
			$scope.edit_flg_on = false;
			return;
		}
		if($scope.meta_dic['k'] in  $scope.cmp_info['company_mgmt']['meta_info']){
			cflg    = confirm('Are you sure you want to overwrite the same key?');
                        if(!cflg)
                            return;	
		}	
                
		$scope.cmp_info['company_mgmt']['meta_info'][$scope.meta_dic['k'].replace(' ', '_').toLocaleLowerCase()] = $scope.meta_dic['v'];
		$scope.meta_dic = {'k': '', 'v': ''};
	}
	/***********************************/
         $scope.client_dict = {'id': '', 'Name': ''};
         $scope.add_client_details = function(id_val){
                if($scope.client_dict['id'] == ''){
                        tasAlert.show('Please fill the key.', 'warning', 1000);
                        return;
                }

                //$scope.cmp_info['company_mgmt']['client_info'][$scope.meta_dic['k'].replace(' ', '_').toLocaleLowerCase()] = $scope.meta_dic['v'];
                $scope.cmp_info['company_mgmt']['client_info'].push($scope.client_dict)
                $scope.basic_info_disp_dict.forEach(function(data){
                       if (data.k == id_val){
                          data.v = $scope.cmp_info['company_mgmt']['client_info']
                       }
                })      
                $scope.client_dict = {'id': '', 'Name': ''};
         }
	/***********************************/
         $scope.remove_client_info = function(data, id_val){
                delete data['$$hashKey']
                var index = $scope.cmp_info['company_mgmt']['client_info'].indexOf(data)
                $scope.cmp_info['company_mgmt']['client_info'].splice(index, 1)
                $scope.basic_info_disp_dict.forEach(function(data){
                       if (data.k == id_val){
                          data.v = $scope.cmp_info['company_mgmt']['client_info']
                       }
                })   
         }
	/***********************************/
	$scope.edit_flg_on = false;
	$scope.edit_meta_func = function(k, v){
                $scope.meta_updated_staus = 1;
                $scope.edit_flg_on = false;
		if($scope.edit_flg_on){
			tasAlert.show('Please save edited pair.', 'warning', 1000);
			return;
		}
		$scope.meta_dic = {'k': k, 'v': v};
		delete $scope.cmp_info['company_mgmt']['meta_info'][k];
		$scope.edit_flg_on = true;
	}
	/***********************************/
        $scope.selected_data = false
        $scope.display_data_vals = []
        $scope.lsts =[]
        $scope.filing_freq_up_status = 0
        $scope.add_or_remove_filing_frequency = function(data){
               if (data.n in  $scope.cmp_info['filing_frequency_d']){
                   $scope.cmp_info['filing_frequency'].forEach(function(res){
                          if (res[0] == data.n){
                             var index_val =  $scope.cmp_info['filing_frequency'].indexOf(res)
                             $scope.cmp_info['filing_frequency'].splice(index_val, 1)
                             //$scope.cmp_info['filing_frequency'].remove(res)
                          }
                   });
                   delete $scope.cmp_info['filing_frequency_d'][data.n] 
               }else {
                     $scope.cmp_info['filing_frequency_d'][data.n] = data.n
                     var lists =[]
                     lists.push(data.n)
                     lists.push({})
                     lists.push({})
                     $scope.cmp_info['filing_frequency'].push(lists)
               }
               $scope.basic_info_disp_dict.forEach(function(r){
                       if (r.k == 'filing_frequency'){
                            r.v = $scope.cmp_info['filing_frequency']
                       }
                })

        }
	/***********************************/
         $scope.inser_from_and_to_data = function(row, ev, pos){
                var index= $(ev.target).closest('tr').index()
                if (pos == 'from'){
                   var res = $scope.cmp_info['filing_frequency'][index]
                   res[1] = row
                   $scope.cmp_info[index] = res
                }else{
                   var res = $scope.cmp_info['filing_frequency'][index]
                   res[2] = row
                   $scope.cmp_info['filing_frequency'][index] = res
                }
                $scope.basic_info_disp_dict.forEach(function(r){
                       if (r.k == 'filing_frequency'){
                            r.v = $scope.cmp_info['filing_frequency']
                       }
                })
         }
	/***********************************/
         $scope.add_new_row_to_table = function(row, index){
              var lists =[]
              lists.push(row)
              lists.push('')
              lists.push('')
              $scope.cmp_info['filing_frequency'].splice(index+1,0, lists)
         }
	/***********************************/
         $scope.store_selected_data = function(rw, data, type) {
                 for (data_val in $scope.basic_info_disp_dict){
                     if ($scope.basic_info_disp_dict[data_val]['k'] == data['k']){
                        if (type == 'year'){
                               $scope.basic_info_disp_dict[data_val]['v1'] = rw
                         }else{$scope.basic_info_disp_dict[data_val]['v'] = rw}
                    }
                 }
         }
        $scope.selected_rad = 'url'
	/***********************************/
        $scope.selected_button = function(res){
           if (res == 'url'){$scope.selected_rad = 'url'}
           else{$scope.selected_rad = 'Browse'}
        }
	/***********************************/
         $scope.update_contents_on_modifiction = function(data, key, key1){
                for (data_val in $scope.basic_info_disp_dict){
                  if ($scope.basic_info_disp_dict[data_val]['k'] == key1){
                       $scope.basic_info_disp_dict[data_val]['up_st'] = 1
                  }
                }
        }
         /***********************************/
         $scope.do_resize = function(){
               $timeout(function(){
                    window.dispatchEvent(new Event('resize'));
               });
         }

	/***********************************/
         $scope.side_bar_status = false
         $scope.show_or_hide_side_bar = function(){
              $scope.side_bar_status = !$scope.side_bar_status
              $timeout(function(){
                $scope.do_resize()
              })
         }
	/***********************************/
         $scope.ck_back_grid_data = function(res){
                if (res['message'] == 'done'){
                   $scope.db_grid.grid_coldef = res['col_defs']
                   $scope.db_grid.grid_data = res['data']
                    $scope.db_grid.scope.init_grid($scope.db_grid);
                }
         }
	/***********************************/
         $scope.show_docs = false
         $scope.show_doc_ids = function(){
                if ($scope.sel_data_drop['sel'] == undefined){
                   tasAlert.show('Please select company', 'warning', 1000);
                    return;
                }
                $scope.show_docs = !$scope.show_docs 
                var row_id = $scope.sel_data_drop.sel['rid'] || ''
                if (row_id == '' || $scope.sel_data_drop.sel['rid'] == undefined){
                    tasAlert.show('Please select company', 'warning', 1000);
                    return;
                }
                var post_data = {'cmd_id': 54, 'rid': row_id}
                tasService.ajax_request(post_data, 'POST', $scope.ck_back_grid_data)

                
         }
	/***********************************/
         $scope.db_grid = {
                grid_id: 'data_grid_1',							    
                grid_map_data: [],							    
                grid_data: [],							    
                parent_scope:  $scope,							    
                grid_cb:  'grid_evt_call',
                ref_opt:  true,  // Optional 
                row_height:  30,  // Optional 							    
                grid_coldef: [],
            }
	/***********************************/
         $scope.download_generate_excel = function(res){
              if (res['message'] == 'done'){
                var path = "ex_file_path/"+res['file_name']
                var dwn_name = '';
                var dom = document.getElementById('dwn_load_id');
                dom.setAttribute('href', path);
                $timeout(function(){
                        dom.click();
                });
             }
         }
	/***********************************/
         $scope.download_metadata_sheet = function(){
                var row_id = $scope.sel_data_drop.sel['rid'] || ''
                var post_data = {'cmd_id': 55, 'rid': row_id}
                tasService.ajax_request(post_data, 'POST', $scope.download_generate_excel)

         }
	/***********************************/
        $scope.convert_data = function(date){
             var data_vals = date.split('-')
             var date = data_vals[1]+'-'+data_vals[0]+'-'+data_vals[2]
             var from_d = new Date(date)
             return from_d
        }
          /********************************************/
    /********************************************/
	/***********************************/
        $scope.max_sn_no = 0
        $scope.doc_id_dict = {}
        $scope.display_doc_ids = function(res){
             $scope.gridOpSetT_dic ={}
             $scope.save_new_row_dic = {}
             $scope.config.parent_scope.ps   = false;
             if (res['message'] == 'done'){
                 var columnDefs = $scope.create_headers_doc() 
                  $scope.gridOptionsDocIds.columnDefs = columnDefs
                 // $scope.display_data[0]['company_name'] =  $scope.sel_data_drop['sel']['company_name']
                  $scope.display_data = angular.copy(res['data'])
                  $scope.max_sn_no    = res['max_sn']
                  for (dat_val in $scope.display_data){
                      res['data'][dat_val]['company_name'] =  $scope.cmp_info.company_mgmt['company_id']
                      $scope.doc_id_dict[$scope.display_data[dat_val]['doc_id']]  = res['data'][dat_val] 
                       //$scope.display_data[dat_val]['company_name'] =   $scope.sel_data_drop['sel']['company_name']
                       $scope.display_data[dat_val]['company_name'] =  $scope.cmp_info.company_mgmt['company_id']
                       var from_date = $scope.display_data[dat_val]['document_form']
                       var from_to   = $scope.display_data[dat_val]['document_to']
                       var fye       = $scope.display_data[dat_val]['fye']
                       var down_date = $scope.display_data[dat_val]['document_download_date']
                       var prev_rel  = $scope.display_data[dat_val]['previous_release_date']
                       var doc_rel   = $scope.display_data[dat_val]['document_release_date']
                       if (from_date != ''){
                          var from_d = $scope.convert_data(from_date)
                          $scope.display_data[dat_val]['document_form'] = from_d
                       }if(from_to != ''){
                          var to_d =  $scope.convert_data(from_to)
                          $scope.display_data[dat_val]['document_to']   = to_d
                       }if(fye != ''){
                          var fy = $scope.convert_data(fye)
                          $scope.display_data[dat_val]['fye']           = fy
                       }if(down_date != ''){
                          var dwn_d =  $scope.convert_data(down_date)
                          $scope.display_data[dat_val]['document_download_date'] = dwn_d
                       }if(prev_rel != ''){
                          var prv_r = $scope.convert_data(prev_rel)
                          $scope.display_data[dat_val]['previous_release_date']  = prv_r
                       }  if(doc_rel != ''){
                           var d_r = $scope.convert_data(doc_rel)
                           $scope.display_data[dat_val]['document_release_date'] = d_r
                        }
                      //$scope.doc_id_dict[$scope.display_data[dat_val]['doc_id']]  = $scope.display_data[dat_val]  
                  }     
                  
                 $scope.gridOptionsDocIds.data = $scope.display_data
             }
        }
	/***********************************/
         $scope.add_doc_ids = false
         $scope.upload_doc_ids = function(){
               //$scope.save_new_row_dic = [] 
               $scope.save_new_row_dic = {}
               var row_id =  $scope.sel_data_drop['sel']['rid'] || 'no rid'
                  if (row_id == 'no rid' || row_id == 'new'){
                    tasAlert.show('Row id is not present','warning', 1000)
                    return
                  }
               $scope.add_doc_ids = !$scope.add_doc_ids
               if ($scope.add_doc_ids){
                 /* var columnDefs = $scope.create_headers_doc() 
                  $scope.gridOptionsDocIds.columnDefs = columnDefs
                  $scope.display_data[0]['company_name'] =  $scope.sel_data_drop['sel']['company_name']
                  $scope.gridOptionsDocIds.data = $scope.display_data*/
                 /* var row_id =  $scope.sel_data_drop['sel']['rid'] || 'no rid'
                  if (row_id == 'no rid' || row_id == 'new'){
                    tasAlert.show('Row id is not present','warning', 1000)
                    return
                  }*/
                  $scope.config.parent_scope.ps   = true;
                  var post_data = {'cmd_id': 57, 'rid': row_id}
                  tasService.ajax_request(post_data, 'POST', $scope.display_doc_ids)
               }

         }
	/***********************************/
         $scope.hide_load_cgi_pop_func = function(){
               $scope.add_doc_ids   = false
               $scope.preview_data  = false
         }
	/***********************************/
         $scope.add_new_row = function(index){
                $scope.display_data.splice(index+1, 0 ,$scope.data_dict_doc)
         }
	/***********************************/
         $scope.update_content = function(rw, index, key){
                $scope.display_data[index][key] = rw['n']
         }
	/***********************************/
         $scope.datepickerOptions = {
                maxDate: new Date(2020, 1, 1),
                minDate: new Date(2010, 1, 1)
         };
	/***********************************/
         $scope.enter_data = function(ev){
             console.log('yes::::::::::::::::')
             console.log('event::::::::::::',ev)
           
        }
	/***********************************/
         $scope.generate_doc_name = function(ev, row){
             var comp_nm = $scope.cmp_info.company_mgmt['company_id'] ||''
             var doc_typ = row["doc_type"] || ''
             var filing_type = row["filing_type"] || ''
             var finantial_year = row["finantial_year"] || ''
             var period = row["period"] || ''
             var doc_name = ''
            /* if (comp_nm == ''){
                 //tasAlert.show('Please enter company name.', 'warning', 1000);
                 return; 
              }else if(doc_typ == ''){
                 //tasAlert.show('Please enter doc_typ', 'warning', 1000);
                 return;   
              }else if(filing_type == ''){
                // tasAlert.show('Please enter filing Type', 'warning', 1000);
                 return;
              }else if(period == ''){
                 //tasAlert.show('Please enter period', 'warning', 1000);
                 return;
              }else if(finantial_year == ''){
                 //tasAlert.show('Please enter finantial year', 'warning', 1000);
                 return;
              }*/
             doc_name = comp_nm+'_'+doc_typ+'_'+filing_type+'_'+period+'_'+finantial_year+'.pdf'
             for (var row_d in $scope.display_data){
                  
                  if ($scope.display_data[row_d]['sn'] == row.sn){
                     $scope.display_data[row_d]['document_name'] = doc_name
                 }
            }
          // $scope.gridOptionsDocIds.data = $scope.display_data    
           return doc_name 
            
        }
	/***********************************/
         $scope.flag_data = 0
         $scope.showCurrentDate = function(){
               $scope.flag_data = 1
          }
	/***********************************/
        $scope.toggleCheckerAll = function(select_all) {
           $scope.sfa = select_all;
           
          $scope.filteredRows = $scope.gridApiMD.core.getVisibleRows($scope.gridApiMD.grid);
           for (var  i = 0; i < $scope.filteredRows.length; i++) {
             $scope.filteredRows[i]['entity']['sf']= select_all;
           }
         };
        /***********************************/
        $scope.toggleSelectRow = function(row_date){
                console.log('row_data::::::::::::::', row_date)
        }
        /***********************************/
        $scope.delete_row_func = function(rw_d){
               var row_id =  $scope.sel_data_drop['sel']['rid'] || 'no rid'
               if (rw_d["doc_id"] == 'new'){
                  for (var lst_d in $scope.display_data){
                      if($scope.display_data[lst_d]['sn'] == rw_d['sn']){
                        $scope.display_data.splice(lst_d , 1)
                        
                        $scope.gridOptionsDocIds.data = $scope.display_data
                        return
                       }
                  }
               } 
               var del_dict = {}
               del_dict[rw_d['sn']] = rw_d
               var txt = "are you sure you want to delete this document details?"
               cflg    = confirm(txt);
               if(!cflg)
                 return;
               $scope.config.parent_scope.ps   = true;
               var post_data = {'cmd_id': 58, 'data': del_dict, "rid": row_id}
               tasService.ajax_request(post_data, 'POST', $scope.display_doc_ids)
  

        }
        /***********************************/
        $scope.download_pdf_file = function(row_data){
             var row_id =  $scope.sel_data_drop['sel']['rid'] || 'no rid'
             var path = "pdf_file_path/"+"input/"+String(row_id)+'/'+row_data["document_name"]
             var dom = document.getElementById('dwn_load_id');
             dom.setAttribute('href', path);
             $timeout(function(){
                 dom.click();
             });

        }
        /***********************************/
        $scope.gridOpSetT_dic = {}
        $scope.gridOpSetT_dic_func = function(t){
          var k = t;
          if(k in $scope.gridOpSetT_dic)
               delete $scope.gridOpSetT_dic[k];
          else {
               $scope.gridOpSetT_dic[k] = $scope.display_data[k];
          }
        }
        /***********************************/
        $scope.toggleCheckerAll_dic={}
        $scope.toggleCheckerAll_dic['val'] = false
        $scope.toggleCheckerAll = function(flg){
              $scope.row_chck_dic = {};
              flg = !flg;
              $scope.toggleCheckerAll_dic['val'] = flg
              if(flg){
                 $scope.display_data.forEach(function(row){
                  $scope.gridOpSetT_dic[row['sn']] = row;
                });
              }else{
                $scope.gridOpSetT_dic = {}; 
              }
        }
        /***********************************/
         $scope.delete_group_doc_id = function(){
            var row_id =  $scope.sel_data_drop['sel']['rid'] || 'no rid'
            var txt = "are you sure you want to delete selected document details?"
            if (Object.keys($scope.gridOpSetT_dic).length == 0){
               tasAlert.show('No row is selecte do delete', 'warning', 1000);
               return
            }
            cflg    = confirm(txt);
            if(!cflg)
               return;
            $scope.config.parent_scope.ps   = true;
            var post_data = {'cmd_id': 58, 'data': $scope.gridOpSetT_dic, "rid": row_id}
            tasService.ajax_request(post_data, 'POST', $scope.display_doc_ids)
         }
        /***********************************/
         $scope.show_select_button = function(row_data){
               var doc_id = row_data["doc_id"]
               if (row_data["show_flg"] == 1){
                  return
               }
               row_data["show_flg"] = 1
               
               for (var lst_d in $scope.display_data){
                   if($scope.display_data[lst_d]['sn'] == row_data['sn']){
                     
                     $scope.display_data[lst_d]['show_flg'] = 1
                     $scope.gridOptionsDocIds.data = $scope.display_data
                     return
                   }
               }
         }
        /***********************************/
        // [{'company_name':'', 'doc_type':'', 'filing_type':'', 'period':'', 'finantial_year':'', 'document_name':'', 'document_release_date':'', 'document_form':'', 'document_to':'', 'document_download_date':'', 'previous_release_date':'', 'fye':'', 'language':'', 'add_new':''}]         
        var saveTemp = '<div ng-click="grid.appScope.row_save_func(row.entity)" class="md_info_save">Save</div>';
        //var htstr = '<div><input type="checkbox" ng-model="sfa" style="margin:18px;"  ng-change="grid.appScope.toggleCheckerAll(sfa);" class="header_chk_bx"></div>';
        var htstr = `<div class="ui-grid-header-cell ui-grid-clearfix" style="padding: 0px; cursor: pointer;background-color: #f0f0ee;">
                        <div class="ui-grid-cell-contents" ng-click="grid.appScope.toggleCheckerAll(grid.appScope.toggleCheckerAll_dic['val'])" style="padding-right: 4px;">
                                <div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{'ui-grid-row-selected': grid.appScope.toggleCheckerAll_dic['val']}" style="margin-top:6px;">&nbsp;</div>
                        </div>
                </div>`;
        var ctr = `<div class="ui-grid-cell-contents" style="padding: 0px; cursor: pointer;background-color: #f0f0ee;"  >
                        <div class="ui-grid-cell-contents">
                                <div ng-click ='grid.appScope.gridOpSetT_dic_func(row.entity.sn)' class="ui-grid-selection-row-header-buttons ui-grid-icon-ok"   ng-class="{'ui-grid-row-selected':  grid.appScope.gridOpSetT_dic[row.entity.sn]}" style=" margin-top:6px;" >&nbsp;
                                </div>
                        </div>
                </div>`;
        //var ctr = '<div  class="ui-grid-cell-contents" ><input type="checkbox" ng-model="row.entity.sf" style="margin: 6px 18px;"  ng-change="grid.appScope.toggleSelectRow(row.entity.sf);" class="header_chk_bx"></div>';
        var ctrDivTitle = '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{ COL_FIELD }}</div>'
        var document_browse =`<div class="ui-grid-cell-contents"  title="browse" mid={{row.entity.document_name}}> 
                                     <input type="file"  onchange="fileNameChanged(event)" ng-if="row.entity.show_flg == 1"><div ng-if="row.entity.show_flg == 0" ng-click="grid.appScope.show_select_button(row.entity)">{{row.entity.document_name}}</div>
                              </div>`;
        var links_paste = '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}" ng-click ="grid.appScope.generate_doc_name(event, row.entity)">{{COL_FIELD}}</div>'
        var generate_doc       = '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}" >{{grid.appScope.generate_doc_name(event, row.entity)}}</div>';
        var ctrds       = '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}" ng-click="grid.appScope.showCurrentDate()"><form name="inputForm"><div ui-grid-edit-datepicker datepicker-options="datepickerOptions" ng-class="\'colt\' + col.uid"></div></form></div>';
        var delete_cntents = '<div class="ui-grid-cell-contents" > <div  ng-click="grid.appScope.delete_row_func(row.entity)" style=" color:red; font-size: large; margin-left: 4px;">x</div></div>'
        var download_file = '<div class="ui-grid-cell-contents" ><div ng-click="grid.appScope.download_pdf_file(row.entity)" class="download_file"><i </div><i class="fa fa-download" style="color:#e4a5ab;"></i></div>'
        $scope.create_headers_doc = function(){
          var columnDefs = [
        //    { field: 'company_name', displayName: 'CompanyName', enableSorting: true, width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', 'cellTemplate': ctrDivTitle},
            //{ field: 'doc_type', displayName: 'DocType', enableSorting: true, width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left' , 'cellTemplate': ctrDivTitle},
            { field: 'sf', displayName: '', enableSorting: true, width:'30', headerCellClass:'kve_header', cellClass:'grid-align_center', 'headerCellTemplate':htstr, 'cellTemplate':ctr, 'cellEditableCondition':false,  pinnedLeft:true},
            { field: 'doc_id', displayName: 'doc_id', enableSorting: true, width:'50', headerCellClass:'kve_header', cellClass:'grid-align_left', editable: false, allowEditing: false , enableCellEdit: false,  pinnedLeft:true},
            { field: 'doc_type', displayName: 'DocType', enableSorting: true, width:'200', headerCellClass:'kve_header', cellClass:'grid-align_left' , editDropdownOptionsArray:$scope.doc_type_lst, editableCellTemplate:'ui-grid/dropdownEditor', editDropdownIdLabel:'n', editDropdownValueLabel:'n', 'cellTemplate': ctrDivTitle,  pinnedLeft:true},
            //{ field: 'filing_type', displayName: 'FiligType', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left' , 'cellTemplate': ctrDivTitle},
            { field: 'filing_type', displayName: 'FiligType', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left' , editDropdownOptionsArray:$scope.filing_type_lst, editableCellTemplate:'ui-grid/dropdownEditor', editDropdownIdLabel:'n', editDropdownValueLabel:'n', 'cellTemplate': ctrDivTitle,  pinnedLeft:true},
            { field: 'period', displayName: 'Period', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', editDropdownOptionsArray: $scope.acc_std, editableCellTemplate:'ui-grid/dropdownEditor', editDropdownIdLabel:'n', editDropdownValueLabel:'n', 'cellTemplate': ctrDivTitle,  pinnedLeft:true },
            { field: 'finantial_year', displayName: 'Financial Year', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', editDropdownOptionsArray:$scope.years_list, editableCellTemplate:'ui-grid/dropdownEditor', editDropdownIdLabel:'n', editDropdownValueLabel:'n', 'cellTemplate': ctrDivTitle},
            { field: 'language', displayName: 'Language', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', editDropdownOptionsArray:$scope.languages, editableCellTemplate:'ui-grid/dropdownEditor', editDropdownIdLabel:'n', editDropdownValueLabel:'n', 'cellTemplate': ctrDivTitle},
            { field: 'document_name', displayName: 'Document Name', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', 'cellTemplate': generate_doc},
            { field: 'assension_number', displayName: 'Assension Number', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left'},
            { field: 'source', displayName: 'Source', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left'},
            { field: 'document_release_date', displayName: 'Doc Release Date', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', cellFilter: 'textDate:"dd-MM-yyyy"', 'editableCellTemplate':ctrds},
            { field: 'document_form', displayName: 'Doc From', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', cellFilter: 'textDate:"dd-MM-yyyy"', 'editableCellTemplate':ctrds},
            { field: 'document_to', displayName: 'Doc To', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', cellFilter: 'textDate:"dd-MM-yyyy"', 'editableCellTemplate':ctrds},
            { field: 'document_download_date', displayName: 'Doc Download Date', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', cellFilter: 'textDate:"dd-MM-yyyy"', 'editableCellTemplate':ctrds},
            { field: 'previous_release_date', displayName: 'Prev Release Date', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', cellFilter: 'textDate:"dd-MM-yyyy"', 'editableCellTemplate':ctrds},
            { field: 'fye', displayName: 'FYE', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', cellFilter: 'textDate:"dd-MM-yyyy"', 'editableCellTemplate':ctrds},
        //    { field: 'browse', displayName: 'Browse', width:'200', headerCellClass:'kve_header', 'cellTemplate':document_browse, 'cellEditableCondition':false, enableCellEdit:false, allowCellFocus:false},
            { field: 'browse', displayName: 'Browse', width:'160', headerCellClass:'kve_header', 'cellTemplate':document_browse, ditableCellTemplate: 'ui-grid/fileChooserEditor', enableCellEdit:false, allowCellFocus:false, pinnedRight:true},
            { field: 'link', displayName: 'Link', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', 'cellTemplate':links_paste},
            { field: 'down', displayName: 'Download', width:'30', headerCellClass:'kve_header', cellClass:'grid-align_left' , enableSorting: false, cellTemplate: download_file, cellEditableCondition :false, enableFiltering : false, pinnedRight:true},
         //   { field: 'del', displayName: 'Delete', width:'30', headerCellClass:'kve_header', cellClass:'grid-align_left' , enableSorting: false, cellTemplate: delete_cntents, cellEditableCondition :false, enableFiltering : false, pinnedRight:true}
            //{ field: 'browse', displayName: 'Browse', width:'200', headerCellClass:'kve_header', 'cellTemplate':document_browse, ditableCellTemplate: 'ui-grid/fileChooserEditor', enableCellEdit:false, allowCellFocus:false},
            /*{ field: 'language', displayName: 'Language', width:'*', headerCellClass:'kve_header', cellClass:'grid-align_left', editDropdownOptionsArray:$scope.languages, editableCellTemplate:'ui-grid/dropdownEditor', editDropdownIdLabel:'n', editDropdownValueLabel:'n'},*/
        /*    { field: 'add_new', displayName: 'Add', width:'80', headerCellClass:'kve_header', cellClass:'grid-align_left' , enableSorting: false, cellTemplate: saveTemp, 'cellEditableCondition':false, enableFiltering : false },*/
          ];
          return columnDefs
        }
        window.scope = $scope
	/***********************************/
         $scope.gridOptionsDocIds = {
                rowHeight:35,
                enableGroupHeaderSelection: false,
                enableSorting : false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect : false,
                modifierKeysToMultiSelect : false,
                noUnselect : false,
                enableColumnMenus : false,
                enableFiltering : true,
                groupingShowCounts:false,
                modifierKeysToMultiSelectCells: true,
           /*     onRegisterApi: function(gridApiDoc){
                   $scope.gridApiDoc = gridApiDoc;
                },*/
  /*             onRegisterApi : function( gridapi ) {
        $scope.gridApiMD = gridapi; 
        $scope.gridApiMD.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
            var row       = newRowCol.row.entity;
            var colName   = newRowCol.col.colDef.name;
            $scope.gridApiMD.selection.selectRow(row);
            $scope.table_type       = row.table_type;
            $scope.taxonomy         = row.taxonomy;
            $scope.taxonomy_label   = row.taxonomy_label;
        });
        $scope.gridApiMD.edit.on.afterCellEdit($scope,function (rowEntity, colDef, newValue, oldValue) {
            var key = colDef['field'];
            var val = newValue;
            if(newValue != oldValue){
                $scope.save_new_row_dic[key] = newRowCol;
            }
        });*/
   // }

               
         }
	/***********************************/
        $scope.save_new_row_dic = {};
        $scope.gridOptionsDocIds.onRegisterApi = function( gridapi ) {
		$scope.gridApiMD = gridapi;
		$scope.gridApiMD.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
		    var row       = newRowCol.row.entity;
		    var colName   = newRowCol.col.colDef.name;
		    $scope.gridApiMD.selection.selectRow(row);
		    $scope.table_type       = row.table_type;
		    $scope.taxonomy         = row.taxonomy;
		    $scope.taxonomy_label   = row.taxonomy_label;
		}); 
		$scope.gridApiMD.edit.on.afterCellEdit($scope,function (rowEntity, colDef, newValue, oldValue) {
		    var key = colDef['field'];
		    var val = newValue;
		    if(newValue != oldValue){
			//$scope.save_new_row_dic.push(rowEntity);
			$scope.save_new_row_dic[rowEntity['sn']]= rowEntity;
		    }
		});     
        };      

	/***********************************/
          $scope.row_add_row_func = function(){
             var company_name = $scope.sel_data_drop['sel']['company_name'] ||''
             $scope.max_sn_no += 1
             var new_row =  {'doc_id':'new','company_name':company_name, 'doc_type':'', 'filing_type':'', 'period':'', 'finantial_year':'', 'document_name':'',  'assension_number':'', 'source':'','document_release_date':'', 'document_form':'', 'document_to':'', 'document_download_date':'', 'previous_release_date':'', 'fye':'', 'language':'', 'browse':'', 'sn': $scope.max_sn_no, 'sf':0, "show_flg": 1 };
             $scope.display_data.push(new_row)
             $scope.gridOptionsDocIds.data = $scope.display_data
             
         }
         /*$scope.gridOptionsDocIds.columnDefs = columnDefs
         $scope.gridOptionsDocIds.data = $scope.display_data*/
	/***********************************/
         var socketupload = io();
         var stream = ss.createStream();         
         fileNameChanged  = function(res, response){
                 var index= $(res.target).closest('.ui-grid-row').index()
                 var sel_file = res.target.files[0]
                 var names = sel_file.name
                 var type =  sel_file.type

                 var row = $scope.display_data[Number(index)]
                 var comp_nm = row["company_name"] ||''
                 var doc_typ = row["doc_type"] || ''
                 var filing_type = row["filing_type"] || '' 
                 var finantial_year = row["finantial_year"] || '' 
                 var period = row["period"] || ''
                    if (comp_nm == ''){
                    tasAlert.show('Please enter company name.', 'warning', 1000);
                    return; 
                    }else if(doc_typ == ''){
                    tasAlert.show('Please enter doc_typ', 'warning', 1000);
                    return;   
                    }else if(filing_type == ''){
                    tasAlert.show('Please enter filing Type', 'warning', 1000);
                    return;
                    }else if(period == ''){
                    tasAlert.show('Please enter period', 'warning', 1000);
                    return;
                    }else if(finantial_year == ''){
                    tasAlert.show('Please enter finantial year', 'warning', 1000);
                    return;
                    }

                  

                 ss(socketupload).emit('file_upload', stream, {'name':row.document_name, 'type':type, 'cmp_id': $scope.sel_data_drop['sel']['rid']});       
                 ss.createBlobReadStream(sel_file).pipe(stream); 
         } 
         
         //ss(socketupload).emit('file_upload', stream, {'name':document_name, 'type':file.type});        
	/***********************************/
         $scope.string_date = function(date_val){
              if (date_val != ''){
                var date  = date_val.getDate()
                var month = date_val.getMonth()+1
                var year  = date_val.getFullYear();
               // if(month < 10){month = '0'+String(month)}
                //if (date < 10){month = '0'+String(date)}
                //var full_date = String(year)+'-'+String(month)+'-'+String(date)
                //var full_date = String(month)+'-'+String(date)+'-'+String(year)
                var full_date = String(date)+'-'+String(month)+'-'+String(year)
                return full_date
              //}else{return "0000-00-00"}
              }else{return ""}
         }
	/***********************************/
         $scope.upload_files = function(){
               //$scope.save_doc_details = angular.copy($scope.display_data)
               //$scope.save_doc_details = angular.copy($scope.save_new_row_dic)
               $scope.save_doc_details = Object.values($scope.save_new_row_dic)
               for( var dat_val in $scope.save_doc_details){
                   var from_date = $scope.save_doc_details[dat_val]['document_form'] || ''
                   var from_to   = $scope.save_doc_details[dat_val]['document_to']   || ''
                   var fye       = $scope.save_doc_details[dat_val]['fye'] || ''
                   var down_date = $scope.save_doc_details[dat_val]['document_download_date'] || ''
                   var prev_rel  = $scope.save_doc_details[dat_val]['previous_release_date'] || ''
                   var doc_rel   = $scope.save_doc_details[dat_val]['document_release_date'] || ''
                   /*if (from_date != ''){*/
                       var from = $scope.string_date(from_date)
                       $scope.save_doc_details[dat_val]['document_form'] = from
                  /* }if (from_to != ''){*/
                      var to =  $scope.string_date(from_to)
                      $scope.save_doc_details[dat_val]['document_to'] = to 
                  /* }if (fye != ''){*/
                      var fy = $scope.string_date(fye)
                      $scope.save_doc_details[dat_val]['fye'] = fy
                  /* }if (down_date != ''){*/
                      var dow_date = $scope.string_date(down_date)
                      $scope.save_doc_details[dat_val]['document_download_date'] = dow_date
                  /* }if (prev_rel != ''){*/
                      var prv_d = $scope.string_date(prev_rel)
                      $scope.save_doc_details[dat_val]['previous_release_date'] = prv_d
                  /* }if (doc_rel != ''){*/
                      var dc_rl = $scope.string_date(doc_rel)
                      $scope.save_doc_details[dat_val]['document_release_date'] = dc_rl
                  //}
               }     
               $scope.config.parent_scope.ps   = true;
               
               var post_data = {'cmd_id': 56, 'data': $scope.save_doc_details, 'rid':  $scope.sel_data_drop['sel']['rid']};
               //tasService.ajax_request(post_data, 'POST', $scope.cl_bk_init_update_or_save)
               tasService.ajax_request(post_data, 'POST', $scope.display_doc_ids)
                
         }
	/***********************************/
         $scope.call_back_data_subsidary = function(obj){
            if(obj["message"] == 'done'){
              $scope.subsidary_company_lsts = obj["data"]
              for (data in $scope.basic_info_disp_dict){
                   if ($scope.basic_info_disp_dict[data]['k']  =='subsidary_company'){
                      $scope.basic_info_disp_dict[data]['v'] = $scope.subsidary_company_lsts
                      $scope.basic_info_disp_dict[data]['up_st'] = 0
                   }
               }
            }
         }
	/***********************************/
         $scope.delete_selected_susidary_data = function(comp_lst){
              var rid       = $scope.sel_data_drop['sel']['rid'] || ''
              var txt = "are you sure that you want to delete this subsidary company"
              cflg    = confirm(txt);
              if(!cflg)
                return; 
              var post_data = {'cmd_id': 59, 'rid': rid, 'data': comp_lst}
              tasService.ajax_request(post_data, 'POST', $scope.call_back_data_subsidary)
         }
	/***********************************/
          $scope.preview_data = false
          $scope.sel_details = {}
          $scope.display_subsidary_compant_details = function(comp_lst, type){
                $scope.preview_data  = !$scope.preview_data
                $scope.company_details.forEach(function(res){
                    if (comp_lst.k == res['k']){
                       $timeout(function(){$scope.popup_data.scope.fetchall_data(res, comp_lst.k)}, 200);
                    }
                });     
                //$timeout(function(){$scope.popup_data.scope.fetchall_data(comp_lst, comp_lst.k)}, 200);
          }
	/***********************************/
         $scope.display_company_details = function(res){
                $scope.selected_data = false
                $scope.selected_frequency  =  {}
                $scope.display_data_vals   =  []
                $scope.lsts                =  []
                $scope.sel_data_drop       =  {}
                $scope.sl_c_dic_meta       =  {'meta':{}}
                $scope.preview_data  = false
                var post_data = {'cmd_id': 52, 'rid':res['v']['k']}
                $scope.sl_c_dic_meta ={'meta':{}}
                $scope.sel_data_drop['sel'] = res['v']
                $scope.module_edit_flg = true;
                $scope.config.parent_scope.ps   = true;
                tasService.ajax_request(post_data, 'POST', $scope.cl_bk_module_meta_data)
         }
	/***********************************/
         
         $scope.add_new_ticker = function(objs){
            if (objs == ''){
               tasAlert.show('Field should not be empty', 'warning', 1000);
               return
            }
            var key_1  = 0
            for (var data  in  $scope.cmp_info['company_mgmt']['ticker']){
                key_1 = $scope.cmp_info['company_mgmt']['ticker'][data]['k']
                if ($scope.cmp_info['company_mgmt']['ticker'][data]['n'] == objs){
                    tasAlert.show('Please enter finantial year', 'warning', 1000);
                    
                    return
                }
            }
            var sdicts = {'k': 'new', 'n': objs}
            $scope.cmp_info['company_mgmt']['ticker'].push(sdicts)
            $scope.basic_info_disp_dict.forEach(function(r){
                   if (r.k == 'ticker'){
                      r.v1 = $scope.cmp_info['company_mgmt']['ticker']
                   }
            });
        }
	/***********************************/
         $scope.remove_selected_drp_data = function(res, data, type){
                $scope.cmp_info['company_mgmt'][type].forEach(function(results){
                       if (results.k == data.k){
                          var index_vals = $scope.cmp_info['company_mgmt'][type].indexOf(results)
                          $scope.cmp_info['company_mgmt'][type].splice(index_vals, 1)
                       }
                })
               $scope.basic_info_disp_dict.forEach(function(res){
                      if(res.k == type){
                           res.v = $scope.cmp_info['company_mgmt'][type]
                      }     
               })
         }
	/***********************************/
         $scope.remove_selected_data = function(version, vals, type){
                $scope.cmp_info['company_mgmt'][type].forEach(function(results){
                       if (results.n == vals.n){
                          var index_vals = $scope.cmp_info['company_mgmt'][type].indexOf(results)
                          $scope.cmp_info['company_mgmt'][type].splice(index_vals, 1)
                          
                       }
                    });
                    $scope.basic_info_disp_dict.forEach(function(res){
                      if(res.k == type){
                           res.v1 = $scope.cmp_info['company_mgmt'][type]
                      }
                    })
         }
	/***********************************/
 

});
app.directive('compInfo', function(){
                 return {
                   restrict: 'AE',
                   template:`			
			<div class="mod_inf">
                            <a href="" id="dwn_load_id" download class="clr_slct_btn cnvs_clr" style="display:none;">Download</a>
			    <div class="ts_box_menu app-sidebar" ng-class="{'active':side_bar_status }">
					<div class="app-sidebar__inner">
                                           <div class="app-sidebar__heading">
                                                 List of Companies <span ng-if="company_infos.length">({{company_infos.length}})</span>                                                                   
                                           </div> 
                                             
                                           <div ui-grid="gridOptionsDoc" class="grid_div"  ui-grid-auto-resize ui-grid-infinite-scroll></div>	 
					</div>
				</div>
				<div class="mtr_main" ng-class="{'active':side_bar_status }">
					<div class="mtr_card mtr_main__sb_sec">
						<div class="mtr_card__header" style="height: 40px;">
					<!--		 <div class="mtr_card__tab_f">
								<div class="mtr_card__tab" ng-class="{active: s_tab == 'company'}" >Company</div>
							 </div>-->
                                                         <div class="mtr_card__tab_f" style="margin-left:5px;">
                                                                    <div style = "float:right;margin-top: 3px;" ng-click="show_or_hide_side_bar()">
                                                                         <div class="bar"></div>
                                                                         <div class="bar"></div>
                                                                         <div class="bar"></div>
                                                                     </div>
                                                         </div>	
                                                         <div class="mtr_card__tab_f" style="margin-left:5px;">
                                                                 <div class="pull-right show_company_name" ng-if = "sel_data_drop['sel']" title="{{sel_data_drop['sel']['company_name']+' - '+ sel_data_drop['sel']['rid']}}">
                                                                    {{sel_data_drop['sel']['n']+' - '+ sel_data_drop['sel']['rid']}}
                                                                 </div>
                                                         </div>
                                                          <div class="pull-right logout-button" >
                                                            <a href='/login'>
                                                              <i class="fa fa-sign-out red-text" aria-hidden="true"></i>
                                                           </a>
                                                         </div>
                                                         <div class="btn btn-sm pull-right btn_del_sec waves-effect" ng-click="company_del_func()"   ng-class="{'highlight': active_data == true}"><i class="fa fa-trash-o" aria-hidden="true"></i>
                                                         </div>
							 <div class="btn btn-success btn-sm pull-right menu_sec_btn waves-effect" ng-click="module_save_func()" >Save</div>
							 <div class="btn btn-sm pull-right btn_nrml_sec waves-effect" ng-click="new_module_func()"  ng-class="{active_k: !module_edit_flg}">New Company</div>
							 <div class="btn btn-sm pull-right btn_nrml_sec  waves-effect" ng-click="upload_doc_ids()"  style="background-color:#93aec7; color: white;" ng-class="{active_data: show_docs}">Documents</div>

						</div>
                                          <div class="mtr_card_body_all" ng-class="{'active':show_docs }"> 
                                               <!-- <div class="mtr_card_header" ng-if = "sel_data_drop['sel']">
                                                     <center style="font-family: inherit;color: #3f51b5;font-width: 0.8rem;font-weight: bold;font-size: large; margin-top:20px;">{{sel_data_drop['sel']['n']+' - '+ sel_data_drop['sel']['rid']}}</center>
                                                </div>-->
						<div class="mtr_card__body"  style="height:calc(100% - 10px); margin-top:10px">
							<div  style="width:70%; position: relative; position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(26,54,126,0.125);border-radius: .25rem;box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);border-width: 0;transition: all .2s;" ng-if="sel_d">
								<div class="topic_header">
                                                                     <div class="header_contnets">Basic Information</div>
                                                                </div>
                                                                <div class="contents_div">
									<div class="clgbb_p"  ng-repeat="basic_in in basic_info_disp_dict  track by $index" >
                                                                                     
										<code class="clgbbn_p">{{basic_in['n']}}</code>
										<ng-include src="basic_in['k']" style="width: calc(100% - 200px);"></ng-include>
                                                                       </div>
							        </div>
                                                         </div>
                                                        <div style="margin-left:20px;width:calc(100% - 70%); position: relative;">
                                                          <div  style="width:100%; height: 49%; position: relative; position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(26,54,126,0.125);border-radius: .25rem;box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);border-width: 0;transition: all .2s;">
                                                              <div class="topic_header">
                                                                     <div class="header_contnets">Recent Update</div>
                                                              </div>
                                                              <div class="contents_div" >
                                                                 <ng-include src="'recent_updates'" ></ng-include>
                                                              </div>
                                                          </div>
                                                          <div style = "height: calc(100% - 50%); position: relative; width:100%; margin-top:2%;flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(26,54,126,0.125);border-radius: .25rem;box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);border-width: 0;transition: all .2s;">
                                                               <div class="topic_header">
                                                                     <div class="header_contnets">Other Information</div>
                                                               </div>
                                                               <div class="contents_div">
                                                                     <ng-include src="'meta_info'"></ng-include>  

                              <!-- <div class="clgbb_p1 edit" ng-repeat="(k, v) in sl_c_dic_meta['meta']">
                                        <code class="clgbbn_p1"><input type="text" ng-init="kk = k.replace('_', ' ')" ng-model="kk" class="form-control sl_cip" disabled style="text-transform: capitalize;"></code>
                                        <div class="clgbbt_p1"><input type="text" ng-model="v" class="form-control sl_cip" disabled></div>
                                        <i class="fa fa-pencil-square-o clgbbt_pfa" aria-hidden="true" ng-click="edit_meta_func(k, v)" title="Edit metdata"></i>
                                        <i class="fa fa-trash-o clgbbt_pfa" aria-hidden="true" ng-click="remove_meta_func_company(k, v)" title="Delete metdata" style="color:#ff6961;"></i>
                                </div>
                                <div class="clgbb_p1 edit">
                                        <code class="clgbbn_p1"><input type="text" ng-model="meta_dic['k']" placeholder="Key" class="form-control sl_cip"></code>
                                        <div class="clgbbt_p1"><input type="text" ng-model="meta_dic['v']" placeholder="Value" class="form-control sl_cip" onkeydown="delete_contents(event)"></div>
                                        <i class="fa fa-plus clgbbt_pfa" aria-hidden="true" ng-click="add_meta_func()"></i>
                                </div>-->
                                                     </div>
                                                              
                                                        </div>
                                                    </div>
						</div>
                                       </div>
                                   <div class="mtr_card_body_all_docs" ng-if ="show_docs">
                                      <div class="nav_bar_sec">
                                           <div class="down_ipl_icon"  ng-click="download_metadata_sheet()">
                                               <i class="fa fa-download" aria-hidden="true"></i>
                                           </div>
                                           <div class="down_ipl_icon" ng-click="upload_doc_ids()">
                                               <i class="fa fa-upload" aria-hidden="true"></i>
                                           </div>

                                      </div>
                                      <div class="grid_class">
                                         <grid-data gconfig="db_grid"> </grid-data> 
                                      </div>
                                   </div>
				</div>

                                <!--  popup div -->
                                <div class="show_popup_ps" ng-if="add_doc_ids">	
                                  <div class="drop_dwn_sec_body">
                                    <div class="drop_dwn_sec_cls" ng-click="hide_load_cgi_pop_func()">&times;</div>
                                    <div class="contnet_div">
                                        <div class="header_pop">
                                          <!-- <div class="pop_headr">Add Documents</div>-->
                                           <div class="pop_headr" style="width:300px"> {{cmp_info['company_mgmt']['company_name']}}</div>
                                           <div class="pop_headr_right" title="Ddd new row" ng-click="row_add_row_func()">
                                             <!--<div class="add_row" >+</div>-->
                                              <div class="btn btn-sm delete_button">
                                                    <i class="fa fa-plus"></i>
                                               </div>
                                           </div>
                                           <div class="pop_headr_right" title="Delete selected rows">
                                            <div class="btn btn-sm delete_button" ng-click="delete_group_doc_id()">
                                              Delete
                                            </div>
                                           </div>
                                        </div>
                                        <div class="table_div">
                                           <div class="table_content_div">
                                                <div ui-grid="gridOptionsDocIds" ui-grid-cellNav  ui-grid-resize-columns  ui-grid-auto-resize ui-grid-selection ui-grid-pinning ui-grid-edit class='ls_seq_grid_div' style="width: 100%; height: 100%;"></div>
                                           </div>
                                           <div class="nav_bar_div">
                                               <div class="btn btn-sm btn-success uplaod_files" ng-click="upload_files()">Save</div>
                                           </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <!--  popup div for review-->
                                <div class="show_popup_ps"  ng-if="preview_data">
                                  <div class="drop_dwn_sec_body" style="width:50%; left:25%">
                                    <div class="drop_dwn_sec_cls" ng-click="hide_load_cgi_pop_func()">&times;</div>
                                    <div class="contnet_div">
                                        <div class="popup_containers">
                                             <popup-display config="popup_data"></popup-display>
                                        </div>
                                    </div>
                                  </div>
                                </div>
 
			</div>

<style>
		       .module-info {width: 100%;height: 100%;float:left;}
                       .mod_inf {width:100%; height:100%; position: relative;}
                       .mod_inf .mtr_main{background: #f1f4f6;height: calc(100% - 0px);width: calc(100% - 420px);position: relative;flex: 1;flex-direction: column;display: flex;overflow: auto; float:right;}
                       .mod_inf .mtr_main.active{width: calc(100% - 0px)}
                       .mod_inf .mtr_main .mtr_main__inner {padding: 20px 20px 0;flex: 1;}
                       .mod_inf .mtr_card {position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(26,54,126,0.125);border-radius: .25rem;box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);border-width: 0;transition: all .2s;    /*min-height: calc(100% - 20px);*/}
                       .mod_inf .mtr_card .mtr_card__header {background-color: rgba(0,0,0,.03);border-bottom: 1px solid #dfdfdf;height: 35px;}
                       .mod_inf .mtr_card .mtr_card__body {display: flex;min-height: 100px;}
                       .mod_inf .mtr_card .mtr_card__header .mtr_card__title,.mod_inf  .mtr_card__title{line-height: 35px;padding-left: 10px;font-size: 14px;color: #3F51B5;font-weight: bold;float: left;}
                       .mod_inf .mtr_card .mtr_card__header .mtr_card__sub_title{line-height: 35px;padding-left: 10px;font-size: 13px;color: #8e8787;font-weight: bold;float: left;}
                       .mod_inf .mtr_card__doc_left{width: 500px; max-height:100%;background-color: #fff;border-right: 1px solid #dfdfdf;float:left;height:auto;}
                       .mod_inf .mtr_card__doc_right{width: calc(100% - 500px); height:auto;float: left;} 
                       .mod_inf .mtr_card__indicator{position: absolute;width: 4px;height: 40px;border-radius: .3rem;left: 10px;top: 15px;opacity: .6;transition: opacity .2s;background: #d1d1d1;}
                       .mod_inf .mtr_card__doc_left_inner{padding: .5rem!important;overflow: auto;width: 100%; height: 400px;}
                       .mod_inf .mtr_card__list_group{display: -ms-flexbox;display: flex;-ms-flex-direction: column;flex-direction: column;padding-left: 0;margin-bottom: 0;}
                       .mod_inf .mtr_card__list_group_item {position: relative;display: block;background-color: #fff;border-bottom: 1px solid #dfdfdf;height: 70px;padding: 10px 10px 10px 25px;border-right: 0;border-left: 0;border-radius: 0;-webkit-border-bottom-left-radius: .125rem;border-bottom-left-radius: .125rem;-webkit-border-bottom-right-radius: .125rem;border-bottom-right-radius: .125rem;}
                       .mod_inf .mtr_card__list_group_item.active{background-color: #dae8f1;}
                       .mod_inf .mtr_card__list_group_item:first-child {border-top: 0;}
                       .mod_inf .mtr_card__list_group_item:last-child {border-bottom: 0;}
                       .mod_inf .mtr_card__widget_heading {opacity: .8;font-weight: bold;line-height: 1.5;color: #343a40;white-space: nowrap;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow:hidden;font-size: 13px;width: calc(100% - 78px);float:left;}
                       .mod_inf .mtr_card__widget_subheading {margin-top: 10px;position: relative;white-space: nowrap;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;font-size: 12px;opacity: 0.5;font-style: italic;width: calc(100% - 75px);float:left;}
                       .mod_inf .mtr_card__widget_sn{float:left;height: 100%;width: 25px;line-height: 40px;font-weight: bold;color: #8e8787; opacity:.5;}
                       .mod_inf .mtr_card__widget_content{float: left;width: 100%;height: 100%;position: relative;}
                       .mod_inf .mtr_card__widget_desc{float:left;height: 100%; width: calc(100% - 25px);position: relative;}
                       .mod_inf .mtr_card__doc_right_top{float: left;width: 100%;height: 70px;border-bottom: 1px solid #dfdfdf;}
                       .mod_inf .mtr_card__doc_right_btm{height: calc(100% - 70px);position: relative;width: 100%;float: left;padding: 10px 10px;overflow: hidden;}
                       .mod_inf .progress {height: 10px;position: relative;transition: width 0.6s ease;}
                       /*.mod_inf .ts_box_menu{width: 420px;display: flex;overflow: hidden;min-width: 280px;flex: 0 0 280px;transition: all .2s;position: fixed;height: 100vh;box-shadow: 7px 0 60px rgba(0,0,0,0.05);background: #fff;}*/
                       .mod_inf .ts_box_menu{width: 420px;float: left;overflow: hidden;height: 100%;box-shadow: 7px 0 60px rgba(0,0,0,0.05);background: #fff;}
                       .mod_inf .ts_box_menu.active{width: 0px;}
                       .mod_inf .app-sidebar .app-sidebar__inner {padding: 2px 15px 20px;z-index: 15;width: 100%;height: 100%;}
                       .mod_inf .app-sidebar__heading {font-size: .8rem;font-weight: bold;color: #3f6ad8;white-space: nowrap;position: height:50px; position: relative; line-height: 50px}
		       .mod_inf .mtr_card__widget_heading a{color: #495057;}
		       .mod_inf	.mtr_card__widget_heading a:hover{color: ##007bff;}
		       .mod_inf .mtr_main__sb_sec{margin: 10px 10px;flex: 1;overflow: hidden;border-radius: .25rem;border: 1px solid rgba(26,54,126,0.125);}
		       .mod_inf .clgbbi {display: block;float: left;margin: 6px 0px;position: absolute;right: 5px;color: #3f6ad8;font-size: 16px;}
		       .mod_inf .inpt_src_sec{float: left;width: 100%;height: 50px;}
		       .mod_inf .clg_p{width: 100%;padding: 16px;float: left;max-height: 100%;overflow: auto;}
		       .mod_inf .clgh_p{margin: 0;padding: 0;margin-bottom: 16px;font-size: 19px;font-weight: 400;color: #3f6ad8;margin-top: 8px;margin-bottom: 16px;white-space: nowrap;overflow: hidden;}
		       .mod_inf .clgh_p:after {margin-left: 24px;content: '';display: inline-block;vertical-align: middle;width: 100%;height: 1px;background: linear-gradient(to right,rgba(116, 95, 181, 0.2),rgba(0, 0, 0, 0.05) 80%);}
		       .mod_inf .clgb_p{float: left;width: 100%;background: #fff;box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);border-radius: 2px;border: 1px solid rgba(187, 187, 187, 0.35);overflow: hidden;overflow-x: auto;border-top: 0px;margin: 0;padding: 16px; height:200px;}
		       .mod_inf .clgb_p1{float: left;width: 100%;background: #fff;box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);border-radius: 2px;border: 1px solid rgba(187, 187, 187, 0.35);overflow: hidden;overflow-x: auto;border-top: 0px;margin: 0;padding: 16px;}
		       .mod_inf .clgbbi_p {width: 12px;height: 12px;background: #77dab2;border-radius: 50%;margin: 0px 3px;margin-top: 14px;}
		       .mod_inf .clgbbi_p.in_act {background: #e97d75;}
		       .mod_inf .clgbb_p{width: 100%;float: left;line-height: 30px;display: flex;padding-right: 15px;margin-bottom: 6px;}
		       .mod_inf .clgbb_p.edit{margin-bottom: 10px;}
		       .mod_inf .clgbbn_p{float: left;line-height: 38px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 200px;text-transform: capitalize;user-select: none; font-weight:bold;font-family: 'Roboto', sans-serif;color: #343a40; opacity:0.8;}
		       .mod_inf .clgbbt_p{text-decoration: none;display: block;white-space: nowrap;float: left;text-overflow: ellipsis; width: calc(100% - 0px);font-family: cousine,sfmono-regular,Consolas,Menlo,liberation mono,ubuntu mono,Courier,monospace;letter-spacing: .03em;}
		       .mod_inf .sl_cip{margin: 2px;width: calc(100% - 10px);padding: 2px 6px;height: 34px;font-size: 12px;}
		       .mod_inf .clgbbt_pfa{font-size: 16px;color: #745fb5;margin-left: 3px;cursor: pointer;width: 20px;line-height: 38px;}
		       .mod_inf code {font-family: cousine,sfmono-regular,Consolas,Menlo,liberation mono,ubuntu mono,Courier,monospace;letter-spacing: .03em;color: #345;font-size: 12px;}
                       .mod_inf .form-control{border-radius: 0px}
		       .mod_inf .form-control:focus {color: #495057;background-color: #fff;border-color: transparent;outline: 0;box-shadow: 0 0 0 0.1rem rgba(149, 180, 206, 0.6) !important; -webkit-box-shadow:  0 0 0 0.1rem rgba(149, 180, 206, 0.6) !important;}
		       .mod_inf .form-control.disabled, .form-control[readonly] {background-color: #e9ecef;opacity: 1;}
		       .mod_inf input:-internal-autofill-selected {background-color: #fff !important;background-image: none !important;color: rgb(0, 0, 0) !important;}
		       .mod_inf .menu_sec_btn {padding: 5px 15px !important;}
		       .mod_inf .mtr_card__tab_f{float:left; width: auto;}
		       .mod_inf .mtr_card__tab{float:left;padding: 0px 10px;line-height: 39px;-webkit-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;transition: all .2s ease-in-out;}
		       .mod_inf .mtr_card__tab.active{background: #84a6c3 !important;font-size: 13px;box-shadow: 0px 0px 2px #8ca1ad;color: #fff !important;}
		       .mod_inf .btn_nrml_sec {color: #7ea0bc;border: 2px solid #b3c0c4;padding: 4px 15px !important;box-shadow: none;}
		       .mod_inf .btn_nrml_sec.active_k{color: #ffffff;background: #3f6ad8;border:2px solid #3553a2;}
		       .mod_inf .btn_nrml_sec.active_data{color: #ffffff;background: #3f6ad8;border:2px solid #3553a2;}
		       .mod_inf .fnt_icn_srch{width: 23px;text-align: center;height: 23px;line-height: 21px;color: #171717;font-size: 11px;border-radius: 3px;margin-top: 8px;margin-right: 6px;border: 1px solid #80a2bf;background: #eef6fc;}
		       .mod_inf .fnt_icn_list{position: absolute;bottom: 0px;height: 50%;width: 100%;background: #fff;z-index: 8;box-shadow: 0px -3px 5px rgb(228, 228, 228);border-top: 1px solid #e5e5e5;}
		       .mod_inf .fnt_icn_list_hdr{background-color: rgba(0,0,0,.0);border-bottom: 1px solid #dfdfdf;width: 100%;height: 35px;float: left;}
		       .mod_inf .fnt_icn_list_btm{width: 100%;height: calc(100% - 35px);float: left;overflow: auto;}
		       .mod_inf .fnt_icn_list_cls{width: 35px;line-height: 35px;text-align: center;color: #F44336;font-size: 26px;border-left: 1px solid #dfdfdf;}
		       .mod_inf .fnt_icns{width: 100px;float: left;background-color: #fff;height: 100px;padding: 10px;border-right: 1px solid #dfdfdf;border-bottom: 1px solid #dfdfdf;text-align: center;font-size: 10px;cursor: pointer;}
		       .mod_inf .fnt_icn_bx{font-size: 30px;color: #343a40;}
		       .mod_inf .fnt_icn_txt{color: #797979;margin-top: 10px;}
		       .mod_inf .fnt_icns.active{background: #dae8f1;font-weight: 500;}
		       .mod_inf .fnt_icns.active .fnt_icn_bx{color:#3f6ad8;}
		       .mod_inf .filter_input{height:28px;padding:2px 12px;border-radius: 0px;margin-right:3px;font-size:13px;border-bottom:2px solid #eaeaea!important;border:0;margin:-2px 7px;}
		       .mod_inf .filter_input::placeholder{color:#bbd3e8; height:20px;}
		       .mod_inf .filter_input:focus{box-shadow:none !important;border-bottom: 2px solid #95b4ce!important;}
		       .mod_inf .filter_input{width: 200px;margin-left: 20px;float: left;padding-left: 6px;margin-top: 2px;}
		       .mod_inf .clgbbi_handle{float: left;height: 100%;width: 20px;text-align: right;line-height: 49px;font-size: 16px;cursor: move;color: #6a6a6a;}
		       .mod_inf .clgbbi_handle_act {width: calc(100% - 20px);}
		       .mod_inf  .mtr_card__list_group_item.over{border: 2px dashed #81a2bf;}
                       .mod_inf .btn_del_sec {color: white;border: 2px solid transparent;;padding: 3px 15px !important; background-color: #ff6961; opacity: 0.8;}
                       .mod_inf .btn_del_sec.highlight{border : 2px solid #81a2bf;}
                      /*******************************************************************************************************/
                       .hdr_cntr {text-align: center !important;font-weight: 500;color: #333;background: #ffffff;font-size: 12px;border-color: #e4e4e4;}
                       .hdr_cntr input[type="text"].ui-grid-filter-input {border: 1px solid #e4e4e4;}
                       .hdr_cntr input[type="text"].ui-grid-filter-input:focus {border: 1px solid #42a5f5;outline: none;}
                       .hdr_cntr .ui-grid-invisible, .hdr_act .ui-grid-invisible {display: none;}
                       .grid_div_doc {border: 1px solid #dfdfdf;}
                       .mod_inf .grid_div {height: calc(100% - 50px)}
                       .mod_inf [ui-grid="node_values_grid"] .ui-grid-cell-focus,[ui-grid="node_template_grid"] .ui-grid-cell-focus{background: none !important;}
                       .mod_inf [ui-grid="node_values_grid"] .act_proup,[ui-grid="node_template_grid"] .act_proup{ background: #c9f4f3 !important;}
                       .mod_inf .ui-grid-cell-contents.active{background: #dae8f1 !important;}
                       .mod_inf .ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-cell:last-child {background-color: white;border-right-color: 1px solid #ddd !important;}
                       .mod_inf .ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-cell:last-child {border-right-color: 1px solid #ddd !important;}
                       .mod_inf .ui-grid-cell.ui-grid-coluiGrid-00EZ.ui-grid-row-header-cell{border-right-color: 1px solid #ddd !important;}
	               .mod_inf .ui-grid-row.ui-grid-tree-header-row{ border-right-color: 1px solid #ddd !important;}
                       .mod_inf .row-grid-header-cell-row{background-color: white !important;}
	               .mod_inf .ui-grid-top-panel{background-color: white !important;}
	               .mod_inf .ui-grid-pinned-container{border-right: 1px solid #e4e4e4;}
	               .mod_inf .ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-header-cell:last-child {border-right: 1px solid #e4e4e4;}
                       .mod_inf .ui-grid-pinned-container.ui-grid-pinned-container-left .ui-grid-cell:last-child {border-right-color: #e4e4e4 !important;}
                       .mod_inf .serarech_taxonomy{margin-right: 5px; margin-top: 10px;height: 30px;width: 200px;  border: 1px solid #ddd;border-radius:5px;padding-left: 5px; opacity: 0.7;}
                       .mod_inf .counticon{width: 15px; height: 14px; display: inline-block;border-radius: 2px;color: white;text-align: center;margin-right:5px; padding-top: 3px;background-color: #84a6c3;}
                       .mod_inf .ui-grid-row .ui-grid-cell.ui-grid-row-header-cell{border-bottom:solid 1px #e4e4e4 !important}
                       .mod_inf .mtr_card__widget_content_ui{float: left;width: 100%;height: 100%;position: relative; padding-top:10px;  padding-left:10px;  padding-bottom:10px;}
                       .metismenu-icon_data{text-align: center; width: 34px;height: 50px; line-height: 50px;position: relative;font-size: 1.5rem;opacity: .3;transition: color 300ms;float: left;margin-right: 15px;}
                       .mod_inf .ui-grid-cell-contents {border-bottom: 1px solid #ececec;}
                       .mod_inf .ui-grid-cell{border-color: #ececec; !important}
                       .mod_inf .hdr_cntr .ui-grid-cell-contents {border-bottom: none;}
                       .mod_inf .ui-grid-row:nth-child(even) .ui-grid-cell {background-color: #ffffff;}
                       .mod_inf .mtr_card__widget_subheading_country{float:right}
                       .mod_inf .mtr_card__widget_subheading_ticker{float:left}
                       .mod_inf .mtr_card_body_all{width:100%; height: calc(100% - 40px); position: relative; background-color: #f1f4f6}
                       .mod_inf .mtr_card_body_all.active{width:100%; height: 50%; position: relative; background-color: #f1f4f6}
                       .mod_inf .mtr_card_header{width: 100%; height:4%; position: relative;}
                       .mod_inf .contnet_data{width: 100%;height: 100%;position: relative:; position: relative; text-aling: center !importnat;top: 50%;left: 50%;font-family: inherit;color: #3f51b5;font-width: 0.8rem;font-weight: bold;font-size: large;}
                       .mod_inf .clgbb_p1{width: 100%;float: left;line-height: 30px;overflow: hidden;display: flex;padding-right: 15px;}
                       .mod_inf .clgbb_p1.edit{margin-bottom: 10px;}
                       .mod_inf .clgbbn_p1{float: left;line-height: 30px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 45%;text-transform: capitalize;}
                       .mod_inf .clgbbt_p1{color: #745fb5;text-decoration: none;display: block;white-space: nowrap;float: left;text-overflow: ellipsis;overflow: hidden;width: 50%;font-family: cousine,sfmono-regular,Consolas,Menlo,liberation mono,ubuntu mono,Courier,monospace;font-weight: bold;letter-spacing: .03em;}
                       .mod_inf .sl_cip{margin: 2px;width: calc(100% - 10px);padding: 2px 6px;height: 30px;font-size: 12px;}
                       .mod_inf .clgbbt_pfa{font-size: 16px;color: #745fb5;margin-left: 3px;cursor: pointer;width: 20px;line-height: 38px;}
                       .mod_inf .header-icon.c_btn{border: 1px solid #bbc7d0;height: 23px;line-height: 18px;margin: 0px 10px;margin-top: 10px;border-radius: 3px;background: #efeff5;}
                       .mod_inf .header-icon.c_btn.btn_act{border: 1px solid #4CAF50;background: #d7ffd8;}
                       .mod_inf .updated_user_info {opacity: .8;font-weight: bold;line-height: 1.5;color: #343a40;white-space: nowrap;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;font-size: 13px; width: calc(100% - 78px);}
                       .mod_inf .updated_user_data {opacity: .5;font-weight: bold;line-height: 1.5;color: #343a40;white-space: nowrap;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;font-size: 13px; width: calc(100% - 78px); font-style:italic; flaot:left}
                       .mod_inf .topic_header{width: 100%;height: 35px;background-color: rgba(0,0,0,.03);border-bottom: 1px solid #dfdfdf;}
                       .mod_inf .contents_div{width: 100%; height:calc(100% - 35px); background-color: #ffffff; padding-top:15px; padding-left:15px; overflow:auto;}
                       .mod_inf .header_contnets{line-height: 35px;padding-left: 10px;font-size: 14px;color: #3F51B5;font-weight: bold;float: left;}
                       .mod_inf .select_data{width: 120px;height: 20px;background-color: white; border:  1px solid #ced4da;}
                       .mod_inf .display_ff{width:50px; float:left;margin-top:3px;line-height: 20px;margin: 3px 5px !important;margin-right: 5px;margin-left: 5px;margin-left: 0px !important;margin-right: 10px !important; border:1px solid #ced4da;}
                       .mod_inf .display_ff.active{ background: #ddf1c6 !important;}
                       .mod_inf .display_ff.hide{display: none;}
                       .mod_inf .ff_data{color:#012b3b; font-weight:bold;}
                       .mod_inf .ui-grid-selection-row-header-buttons{color:#414141;}
                       .mod_inf .ui-grid-selection-row-header-buttons.active{color:#414141;}
                       .mod_inf .from_month{float:left}
                       .mod_inf .to_month{float:left}
                       .mod_inf .data_div{float:left}
                       .mod_inf .taxonomy_data_th_cls{background: #bac8f2;border-right:1px solid #d7def2 !important;color: #2d2d2d;font-family: Arial,Helvetica Neue,Helvetica,sans-serif;text-align: center;line-height: 15px;font-size: 12px;font-weight: bold;}
                       .mod_inf .taxonomy_data_th_cls.first{border-left:1px solid #d7def2}
                       .mod_inf .taxonomy_data_td_cls {background-color: #ffffff;border-bottom:1px solid #e3e3e3 !important;border-right:1px solid #e3e3e3;color: #222222;cursor: crosshair;font-family: Arial,Helvetica Neue,Helvetica,sans-serif;font-size: 11px;padding: 5px;line-height: 15px;text-align: -webkit-center;}
                       .mod_inf .taxonomy_data_td_cls.first {border-left:1px solid #e3e3e3;}
                       .mod_inf .header_icon_txt{float: left;height: 100%;text-align: left;width: calc(100% - 22px);white-space: nowrap;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;font-weight: 400;color:black;}
                       .mod_inf .dropdown-toggle::after {color: black !important}
                       .md-form.md-form-tas input[type=text]:focus:not([readonly]) {-webkit-box-shadow: 0 1px 0 0 #4b5256;box-shadow: 0 1px 0 0 #4b5256;border-bottom: 1px solid #4b5256;}
                       //.mod_inf .ui-grid-icon-ok.ui-grid-row-selected{color:#414141; background: #acff4b !important;}
                       .mod_inf .gridOptionsDocIds .ui-grid-row{clear: both;box-sizing: border-box;border-bottom: 1px solid;border-color: #e4e7ea;}

                       .mod_inf .ui-grid-icon-ok:before {content: '\\c362';}
                       .mod_inf .dropModule .drop_header .drop_selected.slt-full{ width: 180px !important}
                       .mod_inf .table_container{flex: 1 1 auto;padding: 1.25rem;}
                       .mod_inf .clgbb_p.table_cont {width: 100%; height:auto; position:relative; border:1px solid #ced4da; left: 0px;  padding-right:0px; box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border: 0; position: relative;display: -ms-flexbox;display: flex;-ms-flex-direction: column;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(0,0,0,.125);border-radius: .25rem;margin-top:20px;}
		       .mod_inf .drop_down_class{height:40px; float:left; margin-left:2px; color: #012b3b;}
                       .mod_inf .drop_down_class.active{background-color:  #e9ecef;}
                       .mod_inf .form-control.browse-button{border: none; margin-top:30px}
                       .mod_inf .form-control.sl_cip.active{ background-color: #e9ecef;}
                       .mod_inf .form-control.sl_cip.div_ticker{width:95%; float:left;}
                       .mod_inf .form-control.sl_cip.active.div_ticker{ background-color: #e9ecef; width:95%}
                       .mod_inf ::-webkit-file-upload-button {background: #3f6ad8 ;color: white;padding: 2px 4px; opacity:0.7}
                       .mod_inf .dropModule .drop_all .drop_items { height:40px;}
                       .mod_inf .bar{width:30px;height: 3px;background-color: #333;margin: 6px 0;transition: 0.4s;}
                       .mod_inf .mtr_card_body_all_docs{width: 100%; height: calc(100% - 50%) ; position: relative; border-radius: 5px; box-shadow: 0 0.4rem 2rem rgba(4,9,20,0.03), 0 0.9rem 0.40625rem rgba(4,9,20,0.03), 0 0.2rem 0.5rem rgba(4,9,20,0.05), 0 0.125rem 0.1em rgba(4,9,20,0.03);}
                       .mod_inf .logout-button{width:30px; padding:10px;height:100%; border-left:1px solid #dfdfdf;}
                       .mod_inf .show_company_name{width:auto; padding:10px;height:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; color: #5c69bf; font-size: larger; font-weight: bold;}
                       .mod_inf .grid_class{width:100%;height:calc(100% - 30px);position:relative;}
                       .mod_inf .nav_bar_sec{width:100%;height:30px;border-left:1px solid #ddd;border-right:1px solid #ddd;border-top:1px solid #ddd;position:relative; background-color: rgba(0,0,0,0.03)}
                       .mod_inf .down_ipl_icon{float:right;width:30px;height:100%;padding: 6px 6px;border-left:1px solid #ddd;}
                       .mod_inf .drop_dwn_sec_cls {position: absolute;text-align: center;font-size: 21px;cursor: pointer;width: 24px;height: 24px;background-color: rgba(244, 67, 54, 0.75);background-size: 10px 10px;color: #fff;top: -24px;right: 0px;}
                       .mod_inf .drop_dwn_sec_body {padding: 0px 0px;font-size: 12px;color: #212529;text-align: left;list-style: none;background-color: #fff;background-clip: padding-box;border: 0px solid rgba(0,0,0,.15);position: absolute;top: 30px;left: 0px;width: 100%;height: 95%;margin: auto;background-color: white;margin-left: 0px;box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);}
                       .mod_inf .show_popup_ps {position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);}
                       .mod_inf .contnet_div{width: 100%;height: 100%;position: relative;}
                       .mod_inf .header_pop{width: 100%;height: 40px;position: relative;background: #dae8f1;float:left}
                       .mod_inf .popup_data{width: 100%;height: calc(100% - 35px);position: relative;background:white}
                       .mod_inf .input_cat{width: auto;height: 30px;margin-top: 20px;margin-left: 10px;font-weight: 500;}
                       .mod_inf .input_txt_div{width: auto;height: 30px;margin-left: 10px;}
                       .mod_inf .btn_add_sec.new{width: 60px;color: white;background: #007bff;box-shadow: none;}
                       .mod_inf .table_div{width:100%; height: calc(100% - 40px); position: relative; float:left;}
                       .mod_inf .table_content_div{width: calc(100% - 20px) ; height: calc(100% - 50px); margin: 10px; border:1px solid #ddd;overflow:hidden;position: relative;}
                       .mod_inf .pop_headr{height:100%;width:120px;padding:10px;font-weight:700;float:left;}
                       .mod_inf .pop_headr_right{float:right;width:80px;height:100%;position: relative;}
                       .mod_inf .add_row{top: 10px;left: 10px;/* right: 0px; *//* bottom: 0px; */position: absolute;margin: auto;width: 40%;font-weight: 700;background: #003059;height: 40%; border-radius: 2px; padding: 0.1px 3px;color: white;}
                       //.mod_inf .button_div {margin-left: 30px;width: 70px;height: 20px;left: 10px;background-color: #caffca;border: 1px solid #ddd;padding-left: 10px;border-radius: 5px;font-weight: 500;}
                       .mod_inf .button_div {font-size: 12px;background: #caffcc !important;width: 50px;text-align: center;margin-left: 8px;border-radius: 3px;cursor: pointer;}
                       .mod_inf .nav_bar_div{width: calc(100% - 20px);height: 30px;position: relative;}
                       //.mod_inf .uplaod_files{float: right;height: 30px;background-color: #346989;position: relative;border: 1px solid #ddd;border-radius: 3px; color:white; text-align:center; margin-top: 0px;}
                       .mod_inf .uplaod_files{float:right;height:25px;position:relative;border:1px solid #ddd;border-radius:3px;text-align: center;padding:0px 25px !important;line-height:25px;margin:0px;}
                       
 
                      /*********************************************Drop Down ******************************************************/
                       /*.mod_inf .uib-datepicker-popup.dropdown-menu{top:100px !important;}
                       .mod_inf .uib-datepicker-popup.dropdown-menu {top: 100px !important;}*/
                       div.ui-grid-cell input.ng-valid{border: none;}
                       .datepicker-wrapper  .btn-secondary.btn-sm{padding:0px 0px;}
                       .mod_inf .uib-day button, .mod_inf .uib-month button, .mod_inf .uib-year button {}
                       .mod_inf .btn-secondary { background-color: black !important;  color: #fff!important; }
                       .btn-secondary { background-color: #ffffff !important;  color: #000000 !important; }
                       .uib-day button,  .uib-month button,  .uib-year button {min-width:0%; }
                       .uib-left, .uib-right{width:10%;}
                       .btn-group-sm>.btn, .btn-sm {font-size: 12px; line-height: 1.5;}
                       .btn.btn-sm {padding: 10px 10px;}
                       /*.uib-datepicker-popup.dropdown-menu{margin-left:300px; margin-top:100px;}*/

                       .mod_inf .download_file{padding: 4px 4px;}
                       //.mod_inf .delete_button{width:auto;height: 20px;background: #da9090; padding: 3px 3px;border-radius: 3px;color: white;font-weight: 700;}
                       .mod_inf .delete_button{width: 70px;height: 30px;background: #346989;/* padding: 3px 3px; */border-radius: 3px;color: #346989;font-weight: 700;margin: 5px;text-align: center;color: white; line-height:11px;}
                       .mod_inf .view_company_details{width: 50px;height: 30px;margin-left: 10px;float: left; background: #3f6ad8;margin-top: 5px;border-radius: 3px;color: white; text-align: center}
                                  
                       /********************************************************************************************************************/
                       .mod_inf .popup_containers{width:100%; height:100%; position: relative;}
                       .mod_inf .div_v{width:100%; height:100; position:relative}
                       .mod_inf .div_val{width:90%; height:100%; float:left; position:relative}
                       .mod_inf .div_info{width:calc(100% - 90%); height:100%; float:left; position:relative }
                       .mod_inf .displat-selected-version {width: 120px;height: 25px;margin-top: 7px;margin-left: 10px;background-color: #cccccc !important;border-radius: 2px;line-height: 25px;display: inline-block;}
                        .mod_inf .pop-ver-sel-cls-left {float: left;cursor: pointer;width: calc(100% - 20px);padding-left: 8px; white-space: nowrap;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;}
                       .mod_inf .pop-ver-del-cls-right {float: right;cursor: pointer;width: 20px;text-align: center;color: #F44336;font-size: 15px;}
                       .mod_inf .ls_seq_grid_div .ui-grid-row.ui-grid-row-selected >[ui-grid-row]>.ui-grid-cell{background-color: #c9dde1 !important; }

<style>`,
                   controller: 'company_info',
                   scope: {
                        'config': '='
                },
                link: function (scope, elm, attrs, controller) {
                },
       }
});

app.filter('textDate', ['$filter', function ($filter) {
    return function (input, format) {
        if (input != ''){
            var date = new Date(input);
            return $filter('date')(date, format);
        }else{
            return '';
            var date = new Date()
            return $filter('date')(date, format);
        }
    };
}]);
 
