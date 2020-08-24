app.controller("DocumentCntrl", function($scope, $rootScope, $http, $timeout, $location, $filter, $sce, tasAlert, tasService){
	$scope.Object = Object;
	$scope.menu_showing = {};
	/***********************************/
	$scope.bk_get_menu = function(res){
		$scope.ps = false;
		$scope.side_menu_list = res['data'];
		//$scope.side_menu_list = menu_list;
	}
	/**********************************/
	$scope.cl_bk_init_func = function(res){
		$scope.ps = false;
		if(res['message'] == 'done'){
			$scope.gbl_cmp_data = res['data'];
		}else{
			tasAlert.show(res['message'], 'error', 1000);
		}
		setTimeout(function(){
			$scope.slt_cmp($scope.gbl_cmp_data[0])
		});
		var post_data = {'cmd_id': 33}
		$scope.ps = true;
		tasService.ajax_request(post_data, 'POST',$scope.bk_get_menu);
	}
	/***********************************/
	$scope.init_func = function(){
		var post_data = {'cmd_id': 2};
                $scope.ps = true;
                tasService.ajax_request(post_data, 'POST', $scope.cl_bk_init_func);
		$('#body_wrapper').show();
	};
	$scope.init_func();
	/***********************************/
	$scope.editorOption = false;
	$scope.slt_cmp = function(obj){
		$scope.add_in_show = true;
		$scope.slct_all_checkbox = false;
		sessionStorage['slcted_indus_p_id']= obj['project_id'];
		$scope.slcted_indus_dic = obj;
		$scope.editorOption = false;
		$scope.click_save_data();
		setTimeout(function(){
			$scope.cmp_details($scope.slcted_indus_dic["info"][0]);
		});	
	}
	/***********************************/
	$scope.cmp_details_view = {};
	$scope.cmp_details = function(obj){
		sessionStorage['slcted_comp_c_id']= obj['company_id'];
		$scope.cmp_details_view = obj;
	}
	/***********************************/
	$scope.side_menu_click_func = function(menu, mmenu_k){
		sessionStorage['project_info']= JSON.stringify(menu);
		sessionStorage['mmenu_k']= mmenu_k;
		window.location.href = '/monitor';
	}
	/***********************************/
	$scope.cb_save_data = function(res){
		$scope.ps = false;
		if(res['message']){
			if(res['message'] == 'done'){
				$scope.menu_showing = res['data'];
			}else{
				tasAlert.show(res['message'], 'error', 1000);
			}
		}
	}
	/***********************************/
	$scope.click_save_data = function(res){
		var post_data = {'cmd_id': 9,'project_id': $scope.slcted_indus_dic['project_id']};	
		$scope.ps = true;
                tasService.ajax_request(post_data, 'POST', $scope.cb_save_data);
	}
	/***********************************/
	$scope.cb_npc_func = function(res){
		$scope.ps = false;
		if(res['message']){
			if(res['message']=='done'){
				tasAlert.show(res['message'], 'success', 1000);
				if('project_id' in res){
					$scope.new_slcted_indus_dic['project_id'] = res['project_id'];
					$scope.add_in_show = false;
					$scope.gbl_cmp_data.push($scope.new_slcted_indus_dic);
					$scope.slt_cmp($scope.new_slcted_indus_dic);
					$scope.new_slcted_indus_dic = {};	
				}
			}else{
				tasAlert.show(res['message'], 'error', 1000);
			}
		}
	}
	/***********************************/
	$scope.add_new_save = function(){
		var getMenuCheck_list = []
		if(!$scope.add_in_show){
			var sl = [];
			$scope.new_slcted_indus_dic['info'].forEach(function(r){
                        	if(r['flg']){
					sl.push(r);
				}
                	});
			if($scope.new_slcted_indus_dic['project_name'] == undefined || $scope.new_slcted_indus_dic['project_name'] == ""){
				tasAlert.show('Please enter project name.', 'warning', 1000);
				return;
			}else if(!(sl.length)){
				tasAlert.show('Please select company.', 'warning', 1000);
                                return;
			}
			if(!(Object.keys($scope.menu_showing).length)){
                                tasAlert.show('Nothing is selected from Project Builder Menu.', 'warning', 1000);
                                return;
                        }
			pc_data = angular.copy($scope.new_slcted_indus_dic);
			pc_data['info'] = sl;
			var post_data = {'cmd_id': 12, 'data': $scope.menu_showing, 'pc_data': pc_data};
        	        $scope.ps = true;
	                tasService.ajax_request(post_data, 'POST', $scope.cb_npc_func);	
		}else{
			if(!(Object.keys($scope.menu_showing).length)){
				tasAlert.show('Nothing is selected.', 'warning', 1000);
				return;
			}
			//iterate(visible, $scope.side_menu_list, []);
			$scope.ps = true;
			var post_data = {'cmd_id': 8, 'project_id': $scope.slcted_indus_dic['project_id'], 'data': $scope.menu_showing};
			tasService.ajax_request(post_data, 'POST', function(res){
				$scope.ps = false;
				if(res['message']){
					if(res['message'] == 'done'){
						$scope.slt_cmp($scope.slcted_indus_dic);
					}else{
						tasAlert.show(res['message'], 'error', 1000);
					}
				}
			});
		}
	}
	/***********************************/
	/*function iterate(visible, ar, p_ar){
		ar.forEach(function(r){
			if(r.visible[$scope.slcted_indus_dic.project_id]){
				visible[r.k]	= 'Y'
				p_ar.forEach(function(p){
					if(!(p in visible)){
						visible[p] ="N"	
					}
				})
			}
			var child	= r.submenu || []
			if(child.length)
				iterate(visible, child, p_ar.concat([r.k]));
		})
	}*/
	/***********************************/
	$scope.add_in_show = true;
	$scope.ch_op_cm_all = false;
	$scope.div_height = function(){
		$scope.new_slcted_indus_dic = {'project_id': 'new', 'project_name': '', 'desc': '', 'db_name': '', 'info': []};
		$scope.add_in_show = !$scope.add_in_show;
		if($scope.add_in_show){
			$scope.editorOption = false;
			$scope.slcted_indus_dic = $scope.old_slcted_indus_dic;
			$scope.slt_cmp($scope.slcted_indus_dic);
		}else{
			if($scope.slcted_indus_dic['project_id'] !='new'){
				$scope.old_slcted_indus_dic =  $scope.slcted_indus_dic;
			}
			$scope.slcted_indus_dic =  $scope.new_slcted_indus_dic;
			$scope.editorOption = true;
			$timeout(function(){
                        	var getInput = document.querySelector("#newProject");
                        	getInput.focus();
                	});
			$scope.menu_showing = {};
			$scope.side_menu_list.forEach(function(r){
				$scope.menu_showing[r['k']] = 'Y';
                        	var chld = r.submenu || [];
				chld.forEach(function(c){
					$scope.menu_showing[c['k']] = 'Y';
				})
                	});
			$scope.ps = true;
			var post_data = {'cmd_id': 11};
			tasService.ajax_request(post_data, 'POST', function(res){
				$scope.ps = false;
				if(res['message']){
					if(res['message'] == 'done'){
						$scope.new_slcted_indus_dic['info'] = res['data'];
						$scope.ch_op_cm_all = true;
					}else{
						tasAlert.show(res['message'], 'error', 1000);
					}
				}
			});
		}
	}
	/***********************************/
	$scope.checked_option = function(obj, p_obj= {}){
		var flg = 'Y';
		if((obj['k'] in $scope.menu_showing) && $scope.menu_showing[obj['k']] == 'Y')
			flg = 'N';
		$scope.menu_showing[obj['k']] = flg;
		if(Object.keys(p_obj).length){
                        if(!(p_obj['k'] in $scope.menu_showing))
                        	$scope.menu_showing[p_obj['k']] = 'N';
		}
	}
	/***********************************/
	$scope.menu_sec_show_func = function(r){
		var child = r.submenu || [];
		if(r['k'] in $scope.menu_showing){
			if($scope.menu_showing[r['k']] == 'Y'){
				return true;
			}else if($scope.menu_showing[r['k']] == 'N' && child.length){
				for(var a=0, a_l=child.length; a<a_l; a++){
					var c = child[a];
					if(c['k'] in $scope.menu_showing && $scope.menu_showing[c['k']] == 'Y'){
						return true;		
					}
                                }
			}
		}	
		return false;
	}
	/***********************************/
	$scope.checked_option_comp = function(r){
		r['flg'] = !r['flg'];
	}
	/***********************************/
	$scope.checked_option_comp_all = function(){
		$scope.ch_op_cm_all = !$scope.ch_op_cm_all;
		$scope.new_slcted_indus_dic['info'].forEach(function(r){
			r['flg'] = $scope.ch_op_cm_all;
		});
	}
	/***********************************/
	$scope.cmp_edit = false;
	$scope.cmp_edit_option = function(){
		$scope.cmp_edit = true;
		var post_data = {"cmd_id": 11}
		tasService.ajax_request(post_data, 'POST', function(res){
			if(res['message'] == 'done'){
				var fl_arr = [];
				res['data'].forEach(function(r){
					var match = true;
					$scope.slcted_indus_dic['info'].forEach(function(r2){
						if(r['company_name'] == r2['company_name']){
							match = false;	
						}
					});
					if(match){
						fl_arr.push(r)
					}
				})
				$scope.alv_cmp = fl_arr;
			}else{
				tasAlert.show(res['message'], 'error', 1000);
			}
				
		});
		var post_data = {"cmd_id": 21,"project_id": $scope.slcted_indus_dic['project_id'],"db_name": $scope.slcted_indus_dic['db_name']};
		$scope.ps = true;
		tasService.ajax_request(post_data, 'POST', $scope.clbk_process_doc);
		$scope.get_doc_cmp($scope.slcted_indus_dic['info'][0])
	}
	/***********************************/
	$scope.pop_close = function(){
		$scope.cmp_edit = false;
		$scope.avcmp = false;
	}
	/***********************************/
	$scope.infield = false;
	$scope.show_input = function(){
		$scope.infield = !$scope.infield;
		$timeout(function(){document.querySelector("#cmp_fcus").focus();})
	}
	/***********************************/
	$scope.doc = {
		enableRowSelection: true,rowHeight:30, enableFiltering:true, noUnselect : false, enableSorting:false,
		showTreeExpandNoChildren:false, enableHorizontalScrollbar: 1, showTreeRowHeader: false,
		enableRowHeaderSelection: false, enableGroupHeaderSelection: false, enableColumnMenus: false,
		columnDefs:[],
		onRegisterApi: function (gridApi) {
		    $scope.ApiDoc = gridApi;
		}
    	}
	/***********************************/
	var doc_check_1 ={
		field: '#',
                displayName: '#',
                width: 30,
		pinnedLeft: true,
                cellEditableCondition:false,
		'headerCellTemplate':`
			<div class="ui-grid-header-cell" style="padding: 0px; cursor: pointer;">
                        <div class="ui-grid-cell-contents"  style="padding-right: 4px;">
                                <div class="demo_check" ng-class="{'active': grid.appScope.doc_slc_all == 'Y'}" ng-click="grid.appScope.doc_all_check(grid.appScope.doc_slc_all)"></div>
                        </div>
                </div>`,
		cellTemplate:
		`<div class="ui-grid-cell-contents" style="padding: 0px; cursor: pointer;" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
                        <div class="ui-grid-cell-contents">
				<div class="demo_check" ng-class="{'active': row.entity.checked == 'Y'}" ng-click="grid.appScope.doc_check(row.entity)"></div>
                        </div>
                </div>`
          };	
	/***********************************/
	function gridOptionsDoccolumnDefs_func(){
		var gridOptions_columnDef = [
		    {
				field: '#',
				displayName: 'S.No',
				width: 60,
				pinnedLeft: false,
				pinnedRight: false,
				cellEditableCondition:false,
				headerCellClass: 'hdr_cntr',
				cellTemplate:
					`<div class="ui-grid-cell-contents row_col_grid_cell" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
						{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}
					</div>`,
		},
			{
		    field: 'd',
		    displayName: 'Doc Id',
		    width: '80',
		    pinnedLeft: false,
		    pinnedRight: false,
		    cellEditableCondition:false,
				headerCellClass: 'hdr_cntr',
		    cellTemplate:
				`<div class="ui-grid-cell-contents row_col_grid_cell did" ng-class="{hold_status: row.entity.holdstatus, pub_stst_cl: row.entity.pub_sts=='Y', 'doc_edit': row.entity.edit == 'Y'}">
						{{COL_FIELD}}
				</div>`
		},
			{
		    field: 'doc_name',
		    displayName: 'Doc Name',
		    width: '*',
		    minWidth: 100,
		    pinnedLeft: false,
		    pinnedRight: false,
		    cellEditableCondition:false,
				headerCellClass: 'hdr_cntr',
		    cellTemplate:
			     `<div class="ui-grid-cell-contents row_col_grid_cell project" title="{{COL_FIELD}}" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
						{{COL_FIELD}}
			     </div>`
		},
		{
                    field: 'status',
                    displayName: 'Status',
                    width: 100,
                    minWidth: 80,
                    pinnedLeft: false,
                    pinnedRight: false,
                    cellEditableCondition:false,
                    headerCellClass: 'hdr_cntr',
                    cellTemplate:
                             `<div class="ui-grid-cell-contents row_col_grid_cell market" style="text-align: center;padding: 0px;" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
				<span class="status_circle" ng-class="{'status_y': row.entity.status == 'Y'}"></span>
                             </div>`
                },
		{
		    field: 'FYE',
		    displayName: 'FYE',
		    width: 100,
		    minWidth: 80,
		    pinnedLeft: false,
		    pinnedRight: false,
		    cellEditableCondition:false,
		    headerCellClass: 'hdr_cntr',
		    cellTemplate:
			     `<div class="ui-grid-cell-contents row_col_grid_cell market" style="text-align: center;padding: 0px;" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
						{{COL_FIELD}}
			     </div>`
		},
		{
		    field: 'Year',
		    displayName: 'Year',
		    width: 100,
		    minWidth: 80,
		    pinnedLeft: false,
		    pinnedRight: false,
		    cellEditableCondition:false,
		    headerCellClass: 'hdr_cntr',
		    cellTemplate:
			     `<div class="ui-grid-cell-contents row_col_grid_cell market" style="text-align: center;padding: 0px;" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
						{{COL_FIELD}}
			     </div>`
		},
		{
                    field: 'periodtype',
                    displayName: 'Period Type',
                    width: 100,
                    minWidth: 80,
                    pinnedLeft: false,
                    pinnedRight: false,
                    cellEditableCondition:false,
                    headerCellClass: 'hdr_cntr',
                    cellTemplate:
                             `<div class="ui-grid-cell-contents row_col_grid_cell market" style="text-align: center;padding: 0px;" ng-class="{'doc_edit': row.entity.edit == 'Y'}">
                                                {{COL_FIELD}}
                             </div>`
                },
		];
		return gridOptions_columnDef; 
	}
	/***********************************/
	$scope.cl_bk_get_doc_cmp = function(res){
		if(res['message'] == 'done'){
			$scope.ps = false;
			$scope.doc.columnDefs = gridOptionsDoccolumnDefs_func();
			$scope.doc.columnDefs.unshift(doc_check_1);
			res['data'].forEach(e => e["checked"] = "Y");
			$scope.doc.data = res["data"];
		}else{
			tasAlert.show(res['message'], 'error', 1000);
		}
	}
	/***********************************/
	$scope.get_doc_cmp = function(obj){console.log(obj)
		$scope.cmp_detls_view = obj;
		if("edit" in $scope.cmp_detls_view && $scope.cmp_detls_view["edit"] == "Y"){
			$scope.doc.data = $scope.cmp_detls_view['edit_data']; 
		}else{
			var post_data = {"cmd_id": 4,"project_id": $scope.slcted_indus_dic['project_id'],"crid": obj['crid']};
			$scope.ps = true;
			tasService.ajax_request(post_data, 'POST', $scope.cl_bk_get_doc_cmp);
		}
	}
	/***********************************/
	var process_check_1 ={
		field: '#',
                displayName: '#',
                width: 30,
		pinnedLeft: true,
                cellEditableCondition:false,
		'headerCellTemplate':`
			<div class="ui-grid-header-cell" style="padding: 0px; cursor: pointer;">
                        <div class="ui-grid-cell-contents"  style="padding-right: 4px;">
                                <div class="demo_check" ng-class="{'active': grid.appScope.process_slc_all == 'Y'}" ng-click="grid.appScope.process_all_check(grid.appScope.process_slc_all)"></div>
                        </div>
                </div>`,
		cellTemplate:
		`<div class="ui-grid-cell-contents" style="padding: 0px; cursor: pointer;">
                        <div class="ui-grid-cell-contents">
				<div class="demo_check" ng-class="{'active': row.entity.checked == 'Y'}" ng-click="grid.appScope.process_check(row.entity)"></div>
                        </div>
                </div>`
          };	
	/***********************************/
	var cmp_name =	{
		    field: 'Company',
		    displayName: 'Company Name',
		    width: 100,
		    minWidth: 80,
		    pinnedLeft: false,
		    pinnedRight: false,
		    cellEditableCondition:false,
		    headerCellClass: 'hdr_cntr',
		    cellTemplate:
			     `<div class="ui-grid-cell-contents row_col_grid_cell market" style="text-align: center;padding: 0px;">
						{{COL_FIELD}}
			     </div>`
		};
	/***********************************/
	$scope.process_doc = {
		enableRowSelection: true, rowHeight:30, enableFiltering:true, noUnselect : false, enableSorting:false,
		showTreeExpandNoChildren:false, enableHorizontalScrollbar: 1, showTreeRowHeader: false,
		enableRowHeaderSelection: false, enableGroupHeaderSelection: false, enableColumnMenus: false,
		columnDefs:[],
		onRegisterApi: function (gridApi) {
		    $scope.processDoc = gridApi;
		}
    	} 
	/***********************************/
	$scope.clbk_process_doc = function(res){
		if(res["message"] == "done"){
			$scope.ps = false;
			var colDef = [];
			var getcolDef = gridOptionsDoccolumnDefs_func();
			getcolDef.forEach(function(r,inx){
				if(inx ==0){
					colDef.push(process_check_1);
				}
				if(inx == 1){
					colDef.push(cmp_name)
				}
				colDef.push(r)
			});	
			$scope.process_doc.columnDefs = colDef;//gridOptionsDoccolumnDefs_func();
			$scope.process_doc.data = res['data'];
		}else{
			tasAlert.show(res['message'], 'error', 1000);
			$scope.process_doc.columnDefs = [];
			$scope.process_doc.data = res['data'];
		}
	}
	/***********************************/
	$scope.doc_check = function(obj){
		var arr = [];
		var flg ="Y";
		if('checked' in obj && obj['checked'] == "Y"){
			flg = "N";
		}
		obj['checked'] = flg;
		obj['edit'] = "Y";
		$scope.doc_slc_all = "N";
		$scope.cmp_detls_view["edit"] = "Y";
		var Rows = $scope.ApiDoc.core.getVisibleRows($scope.ApiDoc.grid);
		Rows.forEach(function(r){
				arr.push(r.entity)
		})
		$scope.cmp_detls_view["edit_data"] = arr;
	}
	/***********************************/
	$scope.doc_slc_all = "Y";
	$scope.doc_all_check = function(flg){
		var arr =[]
		var Rows = $scope.ApiDoc.core.getVisibleRows($scope.ApiDoc.grid);
		var ch_flg = "N";
		if(flg == "N"){
			ch_flg = "Y";
		}
		Rows.forEach(function(r){
			r.entity['checked'] = ch_flg;
			arr.push(r.entity)
		})
		$scope.doc_slc_all = ch_flg;
		$scope.cmp_detls_view["edit_data"] = arr;
	}
	/***********************************/
	$scope.process_slc_all = "N";
	$scope.process_all_check = function(flg){
		var Rows = $scope.processDoc.core.getVisibleRows($scope.processDoc.grid);
		var ch_flg = "N";
		if(flg == "N"){
			ch_flg = "Y";
		}
		Rows.forEach(function(r){
			r.entity['checked'] = ch_flg;
		})
		$scope.process_slc_all = ch_flg;
	}
	/***********************************/
	$scope.process_check = function(obj){
		var flg ="Y";
		if('checked' in obj && obj['checked'] == "Y"){
			flg = "N";
		}
		obj['checked'] = flg;
		$scope.process_slc_all = "N";
	}
	/***********************************/
	$scope.duplicate_obj = function(arr,comp){
		let unique = arr.map(e => e[comp])
		.map(function(e,i,final){
			if(!(final.indexOf(e) === i && i)){
				if("docs" in arr[i]){
					var conarr = arr[i]["docs"].concat(arr[final.indexOf(e)]['docs']);
					var new_docs = $scope.duplicate_arr(conarr);
					arr[final.indexOf(e)]["docs"] = new_docs;
				}
			}
			return final.indexOf(e) === i && i
		})
		.filter(e => arr[e]).map(e => arr[e]);
		return unique;
	}
	/***********************************/
	$scope.duplicate_arr = function(arr){
		let unique = [];
		arr.forEach(function(i){
			if($.inArray(i, unique) === -1){
				unique.push(i)
			}
		});
		return unique;
		
	}
	/***********************************/
	$scope.process_doc_save = function(){
		var Rows = $scope.processDoc.core.getVisibleRows($scope.processDoc.grid);
		Rows.forEach(function(r){
			if('checked' in r.entity && r.entity['checked'] == "Y"){
				var obj = angular.copy(r.entity);
				$scope.doc.data.push(obj);
			}
		});
		$scope.cmp_detls_view["edit"] = "Y";
		$scope.cmp_detls_view["edit_data"] = $scope.remove_duplicate_obj($scope.doc.data,'d');
		$scope.doc.data = $scope.cmp_detls_view["edit_data"];
		console.log($scope.cmp_detls_view)
	}
	/***********************************/
	$scope.add_new = {};
	$scope.add_new_company = function(){
		if($scope.add_new['cmp_name']){
			var emp = {};
			emp["company_name"] = $scope.add_new['cmp_name'];
			emp["crid"] = "new";
			$scope.slcted_indus_dic['info'].unshift(emp);
			 $scope.add_new['cmp_name'] = '';
		}else{
                        tasAlert.show('Input field Empty', 'warning', 1000)
                }

	}
	/***********************************/
	window.allowDrop = function(ev){
	  ev.preventDefault();
	}

	window.drag = function(ev) {
	  	ev.dataTransfer.setData('text', ev.target.id);
	}

	window.drop = function(ev) {
		var data = ev.dataTransfer.getData("text");
		var ind = data.split('_')[1];
		var obj = $scope.alv_cmp[ind];
		obj['drag'] = 'Y';
		$scope.slcted_indus_dic['info'].push(obj);
		$scope.alv_cmp.splice(ind,1)
		$scope.$apply(function(){
			$scope.slcted_indus_dic['info'];
		})
	}
	/***********************************/
	$scope.remove_company = function(obj,index){
	  var post_data = {"cmd_id": 24,"project_id":$scope.slcted_indus_dic['project_id'],"crid": obj["crid"]};
	  console.log(post_data)
	  tasService.ajax_request(post_data, 'POST', function(res){
	    if(res["message"] == "done"){
	      $scope.ps = false;
	      $scope.get_doc_cmp($scope.slcted_indus_dic['info'][0]);
	      $scope.slcted_indus_dic['info'].splice(index,1); 
	    }else{
	      tasAlert.show(res['message'], 'error', 1000);
	    }
	  });
	}
	/***********************************/
	$scope.save_all = function(){
		var all_data =[];
		$scope.slcted_indus_dic['info'].forEach(function(r){
			var docs = [];
			var emp ={};
			if("edit" in r && r["edit"] == "Y"){
				if("edit_data" in r && r["edit_data"].length){
					r["edit_data"].forEach(function(dc){
						if("checked" in dc && dc["checked"] == "Y"){
							docs.push(dc.d)
						}
					});
				}
				emp["comp_name"] = r["company_name"];
				emp["crid"] = r["crid"];
				emp["docs"] = docs;
				all_data.push(emp);
				r["edit"] = "N";
			}
		})
		if(all_data.length){
		var post_data = {"cmd_id": 23,"project_id":$scope.slcted_indus_dic['project_id'],"data": all_data,"user": "demo"};
		$scope.ps = true;
		console.log(post_data)
		tasService.ajax_request(post_data, 'POST', function(res){
			if(res["message"] == "done"){
				 $scope.ps = false;
				$scope.get_doc_cmp($scope.cmp_detls_view)
			}else{
				tasAlert.show(res['message'], 'error', 1000);
			}
			
		});
		}
		else{
			tasAlert.show('You are not Edit any Company', 'warning', 1000);
		}
	}
	/***********************************/
	$scope.remove_duplicate_obj = function(arr,comp){
		let unique = arr.map(e => e[comp])
		.map(function(e,i,final){
			return final.indexOf(e) === i && i
		})
		.filter(e => arr[e]).map(e => arr[e]);
		return unique;
	}
	/***********************************/
	$scope.avcmp = false;
	$scope.showHide = function(){
		 $scope.avcmp = !$scope.avcmp;
	}
	/***********************************/
	/***********************************/
	/***********************************/
});
