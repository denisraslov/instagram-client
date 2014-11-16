
app.controller('loginController', function($scope, dataProvider) 
{
	$scope.login = function()
	{
		dataProvider.login();
	};
});

app.controller('photosController', function($scope, response, dataProvider) 
{
	$scope.photos = response.data;
	
	$scope.logout = function()
	{
		dataProvider.logout();
	};
});

app.controller('photoController', function($scope, response, dataProvider) 
{
	$scope.photos = [response.data];
	
	$scope.logout = function()
	{
		dataProvider.logout();
	};
});

app.controller('tokenController', function($scope, $routeParams, $location, dataProvider) 
{
	dataProvider.setToken($routeParams.token);
	
	$location.path('/photos');
});
