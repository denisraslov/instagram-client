var app = angular.module('instagramApp', ['ngRoute']);

app.config(function($routeProvider) 
{
	$routeProvider
	
	.when('/login', 
	{
		templateUrl: 'pages/login.html',
		controller: 'loginController',
		resolve: 
		{
			response: function($q, $location, dataProvider)
			{
				var deferred = $q.defer();

				if (dataProvider.getToken())
				{
					$location.path('/photos');
				}
				else			
				{
					deferred.resolve(true);
				}
				
				return deferred.promise;
			}
		}
	})
	
	.when('/photos', 
	{
		templateUrl: 'pages/photos.html',
		controller: 'photosController',
		resolve: 
		{
			response: function($location, dataProvider)
			{
				if (!dataProvider.getToken())
				{
					$location.path('/login');
				}
				
				return dataProvider.getPhotos();
			}
		}
	})
	
	.when('/photo/:photoId', 
	{
		templateUrl: 'pages/photo.html',
		controller: 'photoController',
		resolve: 
		{
			response: function($route, $location, dataProvider)
			{
				if (!dataProvider.getToken())
				{
					$location.path('/login');
				}
				
				return dataProvider.getPhoto($route.current.params.photoId);
			}
		}
	})
	
	.when('/access_token=:token', 
	{
		templateUrl: 'pages/token.html',
		controller: 'tokenController'
	})

	.otherwise({ redirectTo: 'photos' });
});
