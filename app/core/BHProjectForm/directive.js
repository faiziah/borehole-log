export BHProjectFormDirective ($scope) {
	return {
		restrict: 'E', //E - element, A - attribute
		scope: { //isolate scope of directive
			ninjas: '<'
		},
		template: 'ninjas: {{ninjas}}',
		controller: ($scope) => {
			alert('Ninja controller says hi');
		},
	};
}