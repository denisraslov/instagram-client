app.service('dataProvider', function($q, $http, $location)
{
   var service;

	service =
	{
		setToken: function(token)
		{
			localStorage.setItem('token', token);
		},
		getToken: function(token)
		{
			return localStorage.getItem('token');
		},
		login: function()
		{
			document.location = 'https://instagram.com/oauth/authorize/' +
				'?client_id=22fe7ae6bf1f4b00b9369a8748cec4b3&redirect_uri=http%3A//lastshow.net/instagram/%23/photos&response_type=token';
		},
		logout: function()
		{
			localStorage.removeItem('token');
			$location.path('/login');
		},
		isResponseOK: function(response)
		{
			return response.data && response.meta.code == 200;
		},
		get: function(url)
		{
			var deferred = $q.defer();

			$http(
			{
				method: 'GET',
				url: 'php/proxy.php?request_method=GET&url=' +
					encodeURIComponent('https://api.instagram.com/v1/' + url + '/?access_token=' + service.getToken())
			})
			.success(function(response)
			{
				if (service.isResponseOK(response))
				{
					deferred.resolve(response);
				}
				else
				{
					deferred.reject('Ошибка запроса');
				}
			})
			.error(function()
			{
				deferred.reject('Сервер не отвечает');
			});
				
		  return deferred.promise;
		},
		getUser: function()
		{   
			return this.get('users/self');
		},
		getPhotos: function()
		{   
			return this.get('users/self/media/recent');
		},
		getPhoto: function(id)
		{
			return this.get('media/' + id);
		}
	};

    return service;
});