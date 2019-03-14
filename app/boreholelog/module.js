'use strict';

angular.module('myApp.boreholelog', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/boreholelog', {
    templateUrl: 'boreholelog/template.html',
    controller: 'mainCtrl'
  });
}])
.controller('mainCtrl', ['$scope', 'bhDataModel', function ($scope, bhDataModel) {
	$scope.bhDataModel = bhDataModel;

    $scope.navigateTo = function(val) {
        $scope.bhDataModel.activeTab = val;
    };
}])
.factory('bhDataModel', function () {
	var activeTab = 1; // 0 = project, 1 = design, 2 = settings
	var epoch = {
		name: 'Epoch Pty. Ltd.',
		email: 'contact@epoch.com.au',
		telephone: '1300 123 123',
		address: '12 good street sydney nsw'
	}
	var project = {
		name: 'name',
		id: 'id',
		client: 'client',
		project: 'project',
		principal: 'principal',
		location: 'location'
	};
	var pageOptions = {
		pageSize: 'A4',
		pageOrientation: ''
	};
	project.boreholes = [];

	var resetBoreholes = function () {
		project.boreholes = [
			{
				info: [
					{name: 'Id', value: 2},
					{name: 'Sequence', value: 1},
					{name: 'Depth', value: '0,6'},
					{name: 'Easting', value: 'b'},
					{name: 'Northing', value: 'c'},
					{name: 'Coordinate System', value: 'd'},
					{name: 'Surface RL', value: 'e'},
					{name: 'Datum', value: 'f'},
					{name: 'Inclination', value: 'g'},
					{name: 'Hole Diameter', value: 'h'},
					{name: 'Contractor', value: 'i'},
					{name: 'Drilling Rig', value: 'j'},
					{name: 'Driller', value: 'k'},
					{name: 'Sheet', value: 'l'},
					{name: 'Start Date', value: 'm'},
					{name: 'Finish Date', value: 'n'},
					{name: 'Logged By', value: 'o'},
					{name: 'Checked By', value: 'p'}
				],
				columns: [
				/*
					{
						name: 'column name',
						type: 'type', -> depth or text or image (i.e. pattern)
						sequence: 0, -> integer - where the column should go
						size: {width: 1, height: 17}, -> integer representing centimeters
						class: 'class', -> list of classes e.g. rotate string or not, etcs
						separators: [
							{
								position: 1.2, -> where to place the line. Also used as identifier
								content: 'text/img.png' -> what to put below the line
								lineType: 'solid/dashed' -> styling for the line
							}
						]

						//separators for 'graph' type columns
						separators: [
							{depth: <float>(depth in meters), value: <float>}
						]
					}
				*/
					{
						name: 'Depth (m)',
						type: 'depth',
						sequence: 0,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						showFooterType: 'none'
					},
					{
						name: 'RL (m)',
						type: 'rl',
						sequence: 1,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						showFooterType: 'none'
					},
					{
						name: 'Method',
						type: 'text',
						sequence: 2,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'AD', description: 'auger drilling'},
							{name: 'AS', description: 'auger screwing'},
							{name: 'HA', description: 'hand auger'},
							{name: 'DC', description: 'diatube coring'},
							{name: 'HAND', description: 'excavated by hand'},
							{name: 'E', description: 'excavation'},
							{name: 'EE', description: 'existing excavation'},
							{name: 'NDD', description: 'non-destructive drilling'},
							{name: 'V', description: 'V-bit'},
							{name: 'TC', description: 'TC-bit'},
							{name: 'ADH', description: 'hollow auger'},
							{name: 'PT', description: 'push tube'},
							{name: 'JET', description: 'jetting'},
							{name: 'WB', description: 'washboring'},
							{name: 'NQ', description: 'diamond coring 47mm'},
							{name: 'NMLC', description: 'diamond coring 52mm'},
							{name: 'HQ', description: 'diamond coring 63mm'},
							{name: 'HMLC', description: 'diamond coring 63mm'}
						],
						showFooterType: 'relevant' //all, none, or relevant
					},
					{
						name: 'Penetration',
						type: 'text',
						sequence: 3,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'L', description: 'low resistance'},
							{name: 'M', description: 'medium resistance'},
							{name: 'H', description: 'high resistance'},
							{name: 'R', description: 'refusal'}
						],
						showFooterType: 'relevant'
					},
					{
						name: 'Water',
						type: 'text',
						sequence: 4,
						size: {width: 1.0, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: '▼', description: 'standing water level'},
							{name: '▶', description: 'water inflow'},
							{name: '◀', description: 'complete drilling loss'},
							{name: '<', description: 'partial drilling fluid loss'}
						],
						showFooterType: 'relevant'
					},
					/*{
						name: 'Method',
						type: 'image',
						sequence: 2,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'Default', src: '_default.png', description: 'description a'},
							{name: 'Sample', src: 'sample.png', description: 'description a'}
						]
					},
					{
						name: 'Penetration',
						type: 'text',
						sequence: 3,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'Default', src: '_default.png', description: 'description a'},
							{name: 'Sample', src: 'sample.png', description: 'description a'}
						]
					},
					{
						name: 'Water',
						type: 'text',
						sequence: 4,
						size: {width: 1.0, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'Default', src: '_default.png', description: 'description a'},
							{name: 'Sample', src: 'sample.png', description: 'description a'}
						]
					},*/
					{
						name: 'Samples & Insitu Tests',
						type: 'text',
						sequence: 5,
						size: {width: 1.5, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'SPT', description: 'standard penetration test'},
							{name: 'B', description: 'bulk disturbed sample'},
							{name: 'D', description: 'disturbed sample'},
							{name: 'E', description: 'environmental sample'},
							{name: 'SS', description: 'split spoon sample'},
							{name: 'U#', description: 'Undisturbed sample of #mm diameter'},
							{name: 'PP', description: 'Pocket Penetrometer (kPa)'},
							{name: 'N', description: 'Standard Penetration Test(SPT)'},
							{name: 'VS', description: 'Vane Shear (kPa)'},
							{name: 'R', description: 'refusal'},
							{name: 'HB', description: 'hammer bouncing'}
						],
						showFooterType: 'relevant'
					},
					{
						name: 'Graphic Log',
						type: 'image',
						sequence: 6,
						size: {width: 1, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'Default', src: '_default.png', description: 'description a'},
							{name: 'Sample', src: 'sample.png', description: 'description a'}
						],
						showFooterType: 'relevant'
					},
					{
						name: 'UCS Symbol',
						type: 'text',
						sequence: 7,
						size: {width: 1.0, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'GW', description: 'well-graded gravel, fine to coarse gravel'},
							{name: 'GP', description: 'poorly graded gravel'},
							{name: 'GM', description: 'silty gravel'},
							{name: 'GC', description: 'clayey gravel'},
							{name: 'SW', description: 'well-graded sand, fine to coarse sand'},
							{name: 'SP', description: 'poorly graded sand'},
							{name: 'SM', description: 'silty sand'},
							{name: 'SC', description: 'clayey sand'},
							{name: 'ML', description: 'silt'},
							{name: 'CL', description: 'clay of low plasticity, lean clay'},
							{name: 'OL', description: 'organic silt, organic clay'},
							{name: 'MH', description: 'silt of high plasticity, elastic silt'},
							{name: 'CH', description: 'clay of high plasticity, fat clay'},
							{name: 'OH', description: 'organic clay, organic silt'},
							{name: 'Pt', description: 'peat'}
						],
						showFooterType: 'none'
					},
					{
						name: 'Material Description',
						type: 'text',
						sequence: 8,
						size: {width: 4.689, height: 17.06},
						class: 'text-upright text-center vertical-center',
						showFooterType: 'none'
					},
					{
						name: 'Moisture Content',
						type: 'text',
						sequence: 9,
						size: {width: 1.25, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'D', description: 'Dry'},
							{name: 'SM', description: 'Slightly moist'},
							{name: 'M', description: 'Moist'},
							{name: 'VM', description: 'Very moist'},
							{name: 'W', description: 'Wet'}
						],
						showFooterType: 'relevant'
					},
					{
						name: 'Consistency/ Relative Density',
						type: 'text',
						sequence: 10,
						size: {width: 1.5, height: 17.06},
						class: 'text-vertical-upwards',
						separatorOptions: [
							{name: 'VS', description: 'very soft'},
							{name: 'S', description: 'soft'},
							{name: 'F', description: 'firm'},
							{name: 'St', description: 'stiff'},
							{name: 'VSt', description: 'very stiff'},
							{name: 'H', description: 'hard'},
							{name: 'VL', description: 'Very Loose'},
							{name: 'L', description: 'Loose'},
							{name: 'MD', description: 'Medium Dense'},
							{name: 'D', description: 'Dense'},
							{name: 'VD', description: 'Very Dense'}
						],
						showFooterType: 'all'
					},
					{
						name: 'Material Origin',
						subtext: '(other notes)',
						type: 'text',
						sequence: 11,
						size: {width: 2.785, height: 17.06},
						class: 'text-upright text-center',
						showFooterType: 'none'
					}
					/*
					{ //this column is a verical line graph that uses defectSpacingFormula formula to calculate it coordinate.value
						name: 'Defect spacing',
						subtext: '(other notes)',
						type: 'graph',
						calculateXValue: 'defectSpacingFormula',
						graphType: 'vertical',
						sequence: 11,
						size: {width: 2.785, height: 17.06},
						class: 'text-upright text-center',
						showFooterType: 'none'
					}
					{
						name: 'Graphical str.l.',
						type: 'graph',
						sequence: 11,
						size: {width: 0.75, height: 17.06},
						class: 'text-vertical-upwards'
					},
					{
						name: 'Graphical block',
						type: 'graph',
						sequence: 12,
						size: {width: 1.535, height: 17.06},
						class: 'text-vertical-upwards'
					}*/
				]
			}
		];
	};
	resetBoreholes();

	var orderSeparators = function (separators, orderBy) { // array of objects, string
		return _.orderBy(separators, [orderBy],['asc']);
	}
	var toUpper = function (text) {
		return text.toUpperCase(text) || '';
	}
	var getColumnsComponentDimensions = function (dimensions, overrideHeight) {
		var heightLength = 3; // in cm
		return {
			'width': dimensions.width+'cm',
			'height': (overrideHeight ? heightLength : dimensions.height-heightLength)+'cm'
		};
	}
	var createModalId = function (colName, borehole) {

		var bhId = 'id'+_.get(_.find(_.get(borehole, ['info']), info => info.name === 'Id'), ['value']) || '';

		return '#'+bhId+'-'+colName.split(' ').join('-').replace(/\W/g, '');
	}
	var deleteBorehole = function (index) {
		if (!confirm('Are you sure you want to delete this Borehole Log?')) return;
		project.boreholes.length > 1
			? project.boreholes.splice(index, 1)
			: resetBoreholes();
	}
	var duplicateBorehole = function (index) {
		var id = _.max(_.map(project.boreholes, b => {
			return _.get(_.find(b.info, {name: 'Id'}), ['value']);
		}));

		var newBorehole = JSON.parse(JSON.stringify(project.boreholes[index]));
		_.find(newBorehole.info, {name: 'Sequence'}).value = ''+(id ? (Number(id)+1): 0);
		_.find(newBorehole.info, {name: 'Id'}).value = ''+(id ? (Number(id)+1): 0);
		project.boreholes.push(newBorehole);
	}
	var getDepth = function (borehole) {
		var depthValue = _.get(_.find(borehole.info, {name: 'Depth'}), ['value']) || '1';
		var start = _.min(depthValue.split(','));
		var end = _.max(depthValue.split(','));
		return {
			start: start === end ? 0 : parseInt(start),
			end: parseInt(end)
		}
	}
	return {
		duplicateBorehole: duplicateBorehole,
		deleteBorehole: deleteBorehole,
		project: project,
		pageOptions: pageOptions,
		epoch: epoch,
		toUpper: toUpper,
		createModalId: createModalId,
		getColumnsComponentDimensions: getColumnsComponentDimensions,
		orderSeparators: orderSeparators,
		activeTab: activeTab,
		getDepth: getDepth
	};
})
.directive('bhProjectForm', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {},
		templateUrl: 'core/BHProjectForm/template.html',
		controller: 'bhProjectFormCtrl'
	};
}])
.controller('bhProjectFormCtrl', ['$scope', 'bhDataModel', function ($scope, bhDataModel) {
	$scope.bhDataModel = bhDataModel;
}])
.directive('bhBoreholeDesign', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {},
		templateUrl: 'core/bhBoreholeDesign/template.html',
		controller: 'bhBoreholeDesignCtrl',
	};
}])
.controller('bhBoreholeDesignCtrl', ['$scope', 'bhDataModel', function ($scope, bhDataModel) {
	$scope.bhDataModel = bhDataModel;
	$scope.getBHDataArray = function (boreholeData, columnCount) {
		var columnLength = Math.ceil(boreholeData.length/columnCount);
		return _.map(_.range(columnCount), col => {
			return boreholeData.slice(col*columnLength, (col+1)*columnLength);
		});
	}
}])
.directive('bhSettings', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {},
		templateUrl: 'core/bhSettings/template.html',
		controller: 'bhSettingsCtrl',
	};
}])
.controller('bhSettingsCtrl', ['$scope', 'bhDataModel', function ($scope, bhDataModel) {
	$scope.bhDataModel = bhDataModel;
	$scope.exportData = JSON.stringify({
		projectData: bhDataModel.project,
		pageOptions: bhDataModel.pageOptions
	});
	$scope.loadData = function (importData) {
		if ( !confirm("Are you sure") ) {
			return;
		}
		importData = JSON.parse(importData);
		bhDataModel.project = importData.projectData;
		bhDataModel.pageOptions = importData.pageOptions;
	}
}])
.directive('bhBoreholeHeader', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '='
		},
		templateUrl: 'core/bhBoreholeHeader/template.html',
		controller: 'bhBoreholeHeaderCtrl',
	};
}])
.controller('bhBoreholeHeaderCtrl', ['$scope', 'bhDataModel', function ($scope, bhDataModel) {
	$scope.bhDataModel = bhDataModel;
	$scope.getBHDataArray = function (boreholeData, columnCount) {
		var columnLength = Math.ceil(boreholeData.length/columnCount);
		return _.map(_.range(columnCount), col => {
			return boreholeData.slice(col*columnLength, (col+1)*columnLength);
		});
	}
	$scope.getBoreholeId = function (borehole) {
		return _.get(_.find(borehole, {name: 'Id'}), ['value']);
	}
}])
.directive('bhBoreholeBody', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '='
		},
		templateUrl: 'core/bhBoreholeBody/template.html',
		controller: 'bhBoreholeBodyCtrl',
	};
}])
.controller('bhBoreholeBodyCtrl', ['$scope', 'bhDataModel', function ($scope, bhDataModel) {
	$scope.bhDataModel = bhDataModel;
	$scope.getOptionsForFooter = function () {
		var numberOfLines = 7;
/*
[
	[
		{name, type, description, src, etc}
	]
]
*/
var options = _.map(_.get($scope.borehole, ['columns']), col => {
	var values = col.showFooterType === 'all' || (_.get(col, ['separators', 0, 'content']) && col.showFooterType !== 'none')
				 ? [{name: col.name, type: 'title'}] : [];
	values.push(
		col.showFooterType === 'none' ? null
			: col.showFooterType === 'all' ? _.map(col.separatorOptions, op => {
					return {type: 'notTitle', ...op};
				})
			: col.showFooterType === 'relevant' ? _.get(col, ['separators', 0, 'content']) ? _.map(col.separators, sep => {
					if (!sep.content) return null;
					var separatorOption = _.find(col.separatorOptions, col.type === 'text' ? {name: sep.content} : {src: sep.content});
					return {
						type: 'notTitle',
						name: separatorOption.name || '',
						description: separatorOption.description || '',
						src: separatorOption.src
					};
				}) : null
			: null
	);
	return values;
});


/*
		var options = _.flattenDeep(
			_.map(_.get($scope.borehole, ['columns']), col => {
				var abc = col.separatorOptions ? [
					{type: 'title', name: col.name}
				] : null;

				_.forEach(col.separatorOptions, op => {
					abc.push({type: 'notTitle', ...op});
				});

				return abc;
			})
		);
*/
//console.log(options);
		options = _.uniqWith(_.filter(_.flattenDeep(options)), _.isEqual);
		var bhFooterArray = [];
		while (options.length > 0) {
			bhFooterArray[bhFooterArray.length] =
				_.get(options, [numberOfLines-1, 'type']) !== 'title'
				? options.splice(0, numberOfLines)
				: options.splice(0, numberOfLines-1);
		}

		return bhFooterArray;
	}
}])
.directive('bhLogDepth', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '=',
			column: '='
		},
		templateUrl: 'core/columns/bhLogDepth/template.html',
		controller: 'bhLogDepthCtrl',
	};
}])
.controller('bhLogDepthCtrl', ['$scope', 'bhDataModel', '$element', function ($scope, bhDataModel, $element) {
	$scope.bhDataModel = bhDataModel;
	var depth = $scope.bhDataModel.getDepth($scope.borehole);
	var last = depth.end;
	var count = depth.start;
	$scope.depthArray = _.map(new Array(last - count), () => {
		return count++;
	});
	count = depth.start;
	$scope.drawOnCanvas = function () {
		var canvas = $element.find('canvas')[0];
		var context = canvas.getContext("2d");
		var incrementHeight = canvas.height/($scope.depthArray.length * 10);

		// clear the canvas before drawing
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.lineWidth = 3;
		context.strokeStyle = "black";
		context.font = "30px Arial";
		context.setLineDash([5, 0]);
		context.beginPath();
		_.forEach($scope.depthArray, (j, k)=> {
			_.forEach([0,1,2,3,4,5,6,7,8,9], (m, n)=> {
				context.moveTo(canvas.width, (k*10+m)*incrementHeight);
				if(m === 0) {
					//if start of meter (e.g. 2.0), then do a longer dash and show depth
					context.lineTo(canvas.width-20*2, (k*10+m)*incrementHeight);
					k === 0
						? context.fillText(j+'.'+m, canvas.width-(20*4+5), (k*10+m)*incrementHeight+30)
						: context.fillText(j+'.'+m, canvas.width-(20*4+5), (k*10+m)*incrementHeight+10);
				} else {
					context.lineTo(canvas.width-20, (k*10+m)*incrementHeight);
				}
			});
		});
		// label the bottom of the depth column with last
		context.moveTo(canvas.width, canvas.height);
		context.lineTo(canvas.width-(20*2+5), canvas.height);
		context.fillText(last+'.0', canvas.width-(20*4+5), canvas.height-5);

		context.stroke();
		// draw the separators
		_.forEach($scope.column.separators, separator => {
			context.beginPath();
			if (separator.lineType === 'dashed') context.setLineDash([5, 3]);
			else if(separator.lineType === 'solid') context.setLineDash([5, 0]);
			else if(separator.lineType === 'invisible') context.setLineDash([0, 5]);
			var separatorPosn = canvas.height*((separator.position-count)/(last-count));
			context.moveTo(0, separatorPosn);
			context.lineTo(canvas.width, separatorPosn);
			context.stroke();
		});
	};
    $scope.$watch('column', function() {
    	$scope.drawOnCanvas();
    }, true);
}])
.directive('bhLogRl', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '=',
			column: '='
		},
		templateUrl: 'core/columns/bhLogRL/template.html',
		controller: 'bhLogRLCtrl',
	};
}])
.controller('bhLogRLCtrl', ['$scope', 'bhDataModel', '$element', function ($scope, bhDataModel, $element) {
	$scope.bhDataModel = bhDataModel;
	$scope.drawOnCanvas = function () {
		var depth = $scope.bhDataModel.getDepth($scope.borehole);
		var last = depth.end;
		var count = depth.start;
		var rlValue = $scope.column.rl;
		$scope.depthArray = _.map(new Array(last - count), () => {
			return rlValue--;
		});
		count = depth.start;

		var canvas = $element.find('canvas')[0];
		var context = canvas.getContext("2d");
		var incrementHeight = canvas.height/($scope.depthArray.length * 10);

		// clear the canvas before drawing
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.lineWidth = 3;
		context.strokeStyle = "black";
		context.font = "30px Arial";
		context.setLineDash([5, 0]);
		context.beginPath();
		_.forEach($scope.depthArray, (j, k)=> {
			_.forEach([0,1,2,3,4,5,6,7,8,9], (m, n)=> {
				context.moveTo(0, (k*10+m)*incrementHeight);
				if(m === 0) {
					//if start of meter (e.g. 2.0), then do a longer dash and show depth
					context.lineTo(20*2, (k*10+m)*incrementHeight);
					k === 0
						? context.fillText(j ? j+'.'+m : '', 20*2+5, (k*10+m)*incrementHeight+30)
						: context.fillText(j ? j+'.'+m : '', 20*2+5, (k*10+m)*incrementHeight+10);
				} else {
					context.lineTo(20, (k*10+m)*incrementHeight);
				}
			});
		});
		// label the bottom of the depth column with last
		context.moveTo(0, canvas.height);
		context.lineTo(20*2+5, canvas.height);
		var lastRLValue = $scope.depthArray[$scope.depthArray.length-1]-1;
		context.fillText(lastRLValue ? lastRLValue+'.0':'', 20*2+5, canvas.height-5);

		context.stroke();
		// draw the separators
		_.forEach($scope.column.separators, separator => {
			context.beginPath();
			if (separator.lineType === 'dashed') context.setLineDash([5, 3]);
			else if(separator.lineType === 'solid') context.setLineDash([5, 0]);
			else if(separator.lineType === 'invisible') context.setLineDash([0, 5]);
			var separatorPosn = canvas.height*((separator.position-count)/(last-count));
			context.moveTo(0, separatorPosn);
			context.lineTo(canvas.width, separatorPosn);
			context.stroke();
		});

	};
	/*
	$scope.drawSeparators = function () {
		var canvas = $element.find('canvas')[0];
		var context = canvas.getContext("2d");
		var incrementHeight = canvas.height/($scope.depthArray.length * 10);

		context.beginPath();
		context.lineWidth = 3;
		_.forEach($scope.column.separators, separator => {
			var separatorPosn = canvas.height*(separator.position/(last-count));
			context.moveTo(0, separatorPosn);
			context.lineTo(canvas.width, separatorPosn);
		});

		context.stroke();
	};
	*/
    $scope.$watch('column', function() {
    	$scope.drawOnCanvas();
    }, true);
}])
.directive('bhLogGraph', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '=',
			column: '='
		},
		templateUrl: 'core/columns/bhLogGraph/template.html',
		controller: 'bhLogGraphCtrl',
	};
}])
.controller('bhLogGraphCtrl', ['$scope', 'bhDataModel', '$element', function ($scope, bhDataModel, $element) {
	$scope.bhDataModel = bhDataModel;
	var depth = $scope.bhDataModel.getDepth($scope.borehole);
	var last = depth.end;
	var count = depth.start;
	$scope.depthArray = _.map(new Array(last - count), () => {
		return count++;
	});
	count = depth.start;

	$scope.drawOnCanvas = function () {
		var canvas = $element.find('canvas')[0];
		var context = canvas.getContext("2d");
		var textMargin = 10;
		var incrementHeight = canvas.height/($scope.depthArray.length * 10);

		// clear the canvas before drawing
		context.clearRect(0, 0, canvas.width, canvas.height);

		// continue with actual drawing
		context.lineWidth = 3;
		context.font = "20px Arial";
		context.textAlign = "left";
		context.setLineDash([5, 0]);

		var maxValue = _.max(_.map($scope.column.separators, separator => {
			return _.get(_.maxBy(separator.coordinates, coordinate => coordinate.value), ['value']);
		}));
		maxValue += 1; // so max value is doesnt coincide with canvas border
		var minValue = _.min(_.map($scope.column.separators, separator => {
			return _.get(_.minBy(separator.coordinates, coordinate => coordinate.value), ['value']);
		}));
		// draw the vertical lines
		for (var i=1; i<= Math.floor(maxValue-minValue); i++) {
			var xPosn = i*canvas.width/Math.floor(maxValue-minValue+1);
			// draw vertical line
			context.strokeStyle = "#bfbfbf";
			context.beginPath();
			context.moveTo(xPosn, 0);
			context.lineTo(xPosn, canvas.height);
			context.stroke();
		}
		// draw the axes
		context.clearRect(0, 8, canvas.width, 28);
		for (var i=1; i<=Math.floor(maxValue-minValue); i++) {
			var xPosn = i*canvas.width/Math.floor(maxValue-minValue+1);
			// draw the axes
			var label = (i+minValue-1)+'';
			xPosn -= 5*label.length; // approximately center the text
			context.fillText(label, xPosn-5*label.length, 30);
		}
		// draw the graph
		context.beginPath();
		_.forEach($scope.column.separators, separator => {

			if (!!maxValue) {
				context.strokeStyle = separator.color || "#000";
				var lastXPosn, lastYPosn;
				_.forEach(separator.coordinates, coordinate => {
					var yPosn = canvas.height*((coordinate.depth-count)/(last-count));
					var xPosn = canvas.width*((coordinate.value-minValue+1)/(maxValue-minValue+1));
					// draw out the graph
					if ($scope.column.graphType === 'vertical') {
						//draw vertical line
						context.moveTo(xPosn, yPosn);
						context.lineTo(xPosn, yPosn + canvas.height*(coordinate.value/(last-count)));
						//dra horizontal line to separate collinear vertical lines
						context.moveTo(xPosn-10, yPosn + canvas.height*(coordinate.value/(last-count)));
						context.lineTo(xPosn+10, yPosn + canvas.height*(coordinate.value/(last-count)));
					} else {
						if (!lastXPosn && lastXPosn !== 0) {
							context.moveTo(xPosn, yPosn);
						} else {
							context.lineTo(lastXPosn, yPosn);
							context.lineTo(xPosn, yPosn);
						}
					}
					lastXPosn = xPosn;
					lastYPosn = yPosn;
				});
			}
		});

		context.stroke();

		// draw the separator lines
		_.forEach($scope.column.separators, separator => {
			context.beginPath();
			if (separator.lineType === 'dashed') context.setLineDash([5, 3]);
			else if(separator.lineType === 'solid') context.setLineDash([5, 0]);
			else if(separator.lineType === 'invisible') context.setLineDash([0, 5]);
			var separatorPosn = canvas.height*((separator.position-count)/(last-count));
			context.moveTo(0, separatorPosn);
			context.lineTo(canvas.width, separatorPosn);
			context.stroke();
		});
	};
    $scope.$watch('column', function() {
    	$scope.drawOnCanvas();
    }, true);
}])
.directive('bhLogColumn', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '=',
			column: '='
		},
		templateUrl: 'core/columns/bhLogColumn/template.html',
		controller: 'bhLogColumnCtrl',
	};
}])
.controller('bhLogColumnCtrl', ['$scope', 'bhDataModel', '$element', function ($scope, bhDataModel, $element) {
	$scope.bhDataModel = bhDataModel;
	var depth = $scope.bhDataModel.getDepth($scope.borehole);
	var last = depth.end;
	var count = depth.start;
	$scope.depthArray = _.map(new Array(last - count), () => {
		return count++;
	});
	count = depth.start;
	$scope.drawSeparators = function () {
		var canvas = $element.find('canvas')[0];
		var context = canvas.getContext("2d");
		var textMargin = 10;
		var incrementHeight = canvas.height/($scope.depthArray.length * 10);
		var lastSeparatorPosn = 0;
		// this will contain all the <img> patterns
		// patterns need to be not overwritten because drawing onto the canvas is not in order
		// i.e. overwrite pattern > lose original pattern > canvas draws wrong pattern on a separator
		var patternHolder = [];

		// clear the canvas before drawing
		context.clearRect(0, 0, canvas.width, canvas.height);

		// continue with actual drawing
		context.lineWidth = 3;
		context.strokeStyle = "black";
		context.font = "30px Arial";
		context.textAlign = "left";
		_.forEach($scope.column.separators, separator => {
			var separatorPosn = canvas.height*((separator.position-count)/(last-count));
			var lowestTextYCoord = -1;
			// draw contents within each separator
			// first find the starting position of next separator
			var allPositions = $scope.bhDataModel.orderSeparators($scope.column.separators, 'position');
			var currentSeparatorIndex = _.findIndex(allPositions, {position: separator.position});
			var nextSeparatorYCoord = allPositions[currentSeparatorIndex+1]
										? canvas.height*((allPositions[currentSeparatorIndex+1].position-count)/(last-count))
										: canvas.height;
			// we draw a line at the END of this separator.
			// This line needs to use styling from the next separator
			var nextSeparatorLineStyle = _.get(allPositions, [currentSeparatorIndex+1, 'lineType']) || 'solid';
			var drawSeparatorLine = () => {
				context.beginPath();
				if (nextSeparatorLineStyle === 'dashed') context.setLineDash([5, 3]);
				else if(nextSeparatorLineStyle === 'solid') context.setLineDash([5, 0]);
				else context.setLineDash([0, 5]);
				if (lowestTextYCoord < nextSeparatorYCoord) {
					context.moveTo(0, nextSeparatorYCoord);
					context.lineTo(canvas.width, nextSeparatorYCoord);
				} else {
					//draw main line
					context.moveTo(textMargin, lowestTextYCoord);
					context.lineTo(canvas.width-textMargin, lowestTextYCoord);
					// draw joining lines - left side
					context.moveTo(0, nextSeparatorYCoord);
					context.lineTo(textMargin, nextSeparatorYCoord);
					context.lineTo(textMargin, lowestTextYCoord);
					context.moveTo(canvas.width, nextSeparatorYCoord);
					context.lineTo(canvas.width-textMargin, nextSeparatorYCoord);
					context.lineTo(canvas.width-textMargin, lowestTextYCoord);
				}
				context.stroke();
			};
			// what are you type drawing?
			if ($scope.column.type === 'text') {
				// depthMarker is a lineType/styling where there is no separator line
				// instead there is a marker to the left of the text marking depth
				var depthMarker = ['solid', 'dashed'].indexOf(separator.lineType) === -1
								? separator.lineType === 'invisible' ? '' : separator.lineType
								: null;
				// if drawing doesnt flow to next separator - then draw content
				lowestTextYCoord = drawTextAndGetYCoord(context, separator.content, canvas.width, 0/*canvas.width/2*/, lastSeparatorPosn+40, textMargin, depthMarker || '');
				// draw separator lines
				lastSeparatorPosn = lowestTextYCoord < nextSeparatorYCoord ? nextSeparatorYCoord : lowestTextYCoord;
				drawSeparatorLine();
			} else if ($scope.column.type === 'image') {
				// draw pattern
				var patternLocation = patternHolder.length;
				patternHolder[patternLocation] = new Image();
				patternHolder[patternLocation].onload = function(){
					context.beginPath();
					context.fillStyle = context.createPattern(patternHolder[patternLocation], "repeat");
					context.fillRect(0, separatorPosn, canvas.width, nextSeparatorYCoord-separatorPosn);
					context.stroke();
				}
				patternHolder[patternLocation].src = "/img/column/"+separator.content;
				// draw separator lines
				lastSeparatorPosn = lowestTextYCoord < nextSeparatorYCoord ? nextSeparatorYCoord : lowestTextYCoord;
				drawSeparatorLine();
			}
		});

	};
	function drawTextAndGetYCoord (c, str, maxWidth, xCoord, yCoord, textMargin, depthMarker) {
	    var textLength = (text) => c.measureText(text).width;
	    yCoord = depthMarker !== ''
	    		? yCoord - 30 > 0 ? yCoord - 30 : 0
	    		: yCoord;
	    str = depthMarker + str;
	    var drawText = (text) => {
	    	c.beginPath();
	    	c.fillText(text, xCoord+textMargin, yCoord);
	    	c.stroke();
		    return yCoord+=40;
	    }
	    var paragraphs = str.split(/\n/g);
	    _.forEach(paragraphs, para => {
		    if (textLength(para) <= maxWidth-textMargin) {
		        drawText(para);
		    } else {
		        var strLines = [''];
		        // split para according to dashes and spaces
		        var strWordArray = _.flattenDeep(_.map(para.split('-'), s => {
		        	return (s+'-').split(' ');
		        }));
		        strWordArray[strWordArray.length-1] = strWordArray[strWordArray.length-1].slice(0, -1);
		        // compute each line from para words
		        _.forEach (strWordArray, word => {
		        	var line = (strLines[strLines.length-1] || '') + ' ' + word;
		        	if (textLength(line) > maxWidth-textMargin) {
		        		strLines[strLines.length] = textLength(word) < maxWidth-textMargin ? word : '--BIG-WORD--';
		        	} else strLines[strLines.length-1] = line;
		        });
		        // draw each line and update yCoord for next drawing
		        _.forEach(strLines, line => drawText(line));
		    }
	    });
	    return yCoord;
	}
    $scope.$watch('column.separators', function() {
    	$scope.drawSeparators();
    }, true);
	angular.element(function () {
		// this listener refreshes the canvas when the tab changes to design view
	    $scope.drawSeparators();
	});
}])
.directive('bhColumnModal', [($scope) => {
	return {
		restrict: 'E', //E - element, A - attribute, default - A & E
		scope: {
			borehole: '=',
			column: '='
		},
		templateUrl: 'core/columns/bhColumnModal/template.html',
		controller: 'bhColumnModalCtrl',
	};
}])
.controller('bhColumnModalCtrl', ['$scope', 'bhDataModel', '$element', function ($scope, bhDataModel, $element) {
	$scope.bhDataModel = bhDataModel;
	$scope.addSeparator = function (separatorPosn, context) {
		// abort if separatorPosn is null
		if (!separatorPosn && separatorPosn != 0) return;
		// create/add the separator
		_.forEach($scope.borehole.columns, col => {
			if (context === 'all' || col.sequence === context) {
				col.separators = col.separators ? col.separators : [];
				if (!_.find(col.separators, {position: separatorPosn})) {
					col.separators.push({
						position: separatorPosn,
						content: col.type === 'image' ? '_default.png' : '',
						lineType: 'solid'
					});
				}
				// re-sort the separators so they are correct ascending by 'position'
				col.separators = $scope.bhDataModel.orderSeparators(col.separators, 'position');
			}
		});
	}
	var startOfNextDepth = function (coordinates, depth) {
		coordinates = _.orderBy(coordinates, ['depth'], ['asc']);
		return _.get(coordinates, [_.findIndex(coordinates, {depth: depth}) + 1, 'depth']) || $scope.bhDataModel.getDepth($scope.borehole).end;
	}
	$scope.calculateXValue = function () {
		console.log($scope.column);
		_.forEach($scope.column.separators, sep => {
			sep.coordinates = _.orderBy(sep.coordinates, ['depth'], ['asc']);
			_.forEach(sep.coordinates, (coordinate, i) => {
				coordinate.value = $scope.column.calculateXValue === 'defectSpacingFormula' ? startOfNextDepth(sep.coordinates, coordinate.depth) - coordinate.depth
									: coordinate.value;
			})
		});
	}
	$scope.deleteSeparator = function (separator) {
		if (!confirm('Delete '+separator.type+' separator at '+separator.position+'m.')) return;
		_.remove($scope.column.separators, separator);
	}
	$scope.deleteSeparatorCoordinate = function (separator, coordinate) {
		_.remove(
			_.get(
				_.find($scope.column.separators, separator)
			, ['coordinates'])
		, coordinate);
		$scope.calculateXValue();
	}
}]);