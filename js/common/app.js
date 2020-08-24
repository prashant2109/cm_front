agGrid.initialiseAgGridWithAngular1(angular);
var app = angular.module("app", ['dndLists', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.pinning', 'ui.grid.edit', 'ui.grid.treeView', 'ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.pagination', 'ui.grid.selection',  'ui.grid.autoResize', 'agGrid','ngSanitize','tas.reference','companyInfo', 'popupModule', 'tas.dropdown','tas.grid', 'tas.Date']);

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});
