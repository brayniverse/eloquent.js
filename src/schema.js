function Schema(config) {
  if (typeof config !== 'function') {
    console.error('Invalid callback format!');
    console.error('%s provided when expecting a function.', typeof config);
    valid = false;
  }

  var valid = true,

    // The support object is used to inject functionality into the `config`
    // variable so that the user can build their model.
    support = {},

    // This is the model object that will be built and returned once the
    // Schema factory has finished executing.
    model   = { endpoint: {}, properties: {} };

  // Set Endpoint
  // A user can define HTTP endpoints using either by providing the URL as a
  // string or with an object that defines the URLs for each request.
  // ```
  // this.setEndpoint('http://localhost:8000/api/v3/people');
  // this.setEndpoint({
  //   list:   'http://localhost:8000/api/v3/people',
  //   create: 'http://localhost:8000/api/v3/people',
  //   update: 'http://localhost:8000/api/v3/people/{id}',
  //   delete: 'http://localhost:8000/api/v3/people/{id}'
  // });
  // ```
  support.setEndpoint = function(endpoint) {
    if (typeof endpoint === 'string') {
      model.endpoint.list   = endpoint;
      model.endpoint.create = endpoint;
      model.endpoint.update = endpoint + '/{id}';
      model.endpoint.delete = endpoint + '/{id}';
    } else if (typeof endpoint === 'object') {
      var requests = ['list', 'create', 'update', 'delete'];

      if (JSON.stringify(Object.keys(endpoint)) !== JSON.stringify(requests)) {
        console.error('Missing or invalid URL in endpoint configuration!');
        console.error('You must define %s URLs.', requests.toString());
        requests.forEach(function(key) {
          if (endpoint[key] === undefined) {
            console.info('You are missing the %s URL', key);
          }
        }, this);
        valid = false;
      }

      model.endpoint = endpoint;
    }
  };

  support.setStorage = function(config) {};

  // Property
  // Adds a new path transformer for the incoming data.
  // ```
  // this.setProperty('id', 'integer');
  // this.setProperty('name', {
  //   path: 'some.path.to.the.index.name',
  //   type: 'string',
  //   default: '(untitled)'
  // });
  // ```
  support.setProperty = function(key, config) {
    if (typeof key === undefined) {
      console.error('You are missing a property key!');
      valid = false;
    }

    if (typeof config === 'string') {
      model.properties[key] = {
        type: config,
        path: key,
        dependencies: [],
        default: undefined
      };
    } else if (typeof config === 'object') {
      model.properties[key] = config;
    } else if (typeof config === 'function') {
      model.properties[key] = {
        type: 'custom',
        path: key,
        dependencies: config.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(','),
        default: undefined
      };
    }
  };

  support.belongsTo = function(key, config) {};
  support.hasMany = function(key, config) {};
  support.hasOne = function(key, config) {};
  support.belongsToMany = function(key, config) {};

  // Before
  // Allows for functions to be triggered before particular events occur on a
  // model.
  // ```
  // this.before('model.save', function(model) {
  //   model.updated_at = (new Date()).toTimestamp();
  //   return model;
  // });
  // this.before('http.post', function(request) {
  //   request.header['Access-Control-Allow-Access'] = '*';
  //   return request;
  // });
  // ```
  support.before = function(event, callback) {};

  // After
  // Allows for functions to be triggered after particular events occur on a
  // model.
  // ```
  // this.after('model.create', function(model) {
  //   if (model.valid === true) {
  //     alert('Model successfully created');
  //   } else {
  //     alert('Unexpected error whilst saving model');
  //   }
  // });
  // ```
  support.after = function(event, callback) {};

  config.call( support );

  if (valid === true) {
    return model;
  }
}
