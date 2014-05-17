# Schema

The Schema module is a factory object used to generate new Models. They accept a callback as their only argument and inject functionality through the `this` keyword for defining endpoints, properties, event hooks and much more.

## Creating Schemas

To create a new Schema you must first instantiate a `new` instance of the module like so:

```javascript
new Schema(function() { /* ... */ });
```

### Endpoints

An endpoint is the URL that data is sent to and from. Eloquent makes the assumption that your endpoint adopts a RESTfull design, however, this is purely for convenience, if your endpoint does not then you can optionally provide a `object` which specifies each URL in use. This is particularly useful for those who have different endpoints for read/write activites.

```javascript
this.setEndpoint( 'http://localhost:8000/api/people' );
// or
this.setEndpoint({
  list:   'http://localhost:8000/api/people',
  create: 'http://localhost:8888/api/people'
});
```

If your model uses something other than `id` as an identifier for your data then in your URL configuration you can specify which index to use, like so:

```javascript
this.setEndpoint({
  list:   'http://localhost:8000/api/people',
  create: 'http://localhost:8888/api/people',
  show:   'http://localhost:8000/api/people/{username}' // Note the braces, this is used to find and replace the value
});
```

### Local Storage

You can specify whether or not you wish to cache the data for a period of time before retrieving it from the endpoint.

```javascript
this.setStorage({
  driver: 'indexedDb', // array, indexedDb or local
  duration: 3600,      // seconds
  on: [ 'list', 'show' ]
});
```
Note: If the browser does not support the chosen driver then it will request it directly from the endpoint every time.

### Properties

When defining properties you are telling the Schema what to do when it finds the specified object path in the response body. If will format the value before turning the request into a Model. You define properties using `this.property` as demonstrated in the following example.

```javascript
this.property( 'id', 'integer' );
```

This helper method accepts two arguments; the key and the formatter which can be either a string of a callback function. Providing a string indicates that you are using a built-in formatter (explained below).

Using a callback as the second argument is known as a 'computed property' and will inject any value you return into the model's values. Computed properties have access to other properties by specifying them in the callback's arguments, as seen in the following example:

```javascript
this.property( 'price', 'float' );

this.property( 'salePrice', function( price ) {
  return price - ( price * 0.2 );
});
```

You can set default values for properties by using the following syntax:

```javascript
this.property( 'price', {
  type: 'float',
  default: '12.80'
});
```


### Built-in Formatters

   name   | description
--------- | ------------
integer   | Formats the value using `parseInt`.
float     | Returns a floating integer.
string    | Returns the value as a string.
timestamp | Will parse the value and return is as a formatted date.

## Foreign Keys

Foreign keys are similar to computed properties in the way they are defined. A computed property is provided with a couple factory methods that will help define relationships.

First you define the key that the relationship will be accessed through, in the example below this is `merchant`, then you provide a callback function that can accept another property as an argument, again in the example below this is `merchant_id`, lastly you return one of the provided helper factory methods defined below.

```javascript
this.property( 'merchant', function( merchant_id ) {
  return this.belongsTo( 'merchants', { id: merchant_id } );
});
```

### Supported Relationships

Name          | Use
------------- | ---
hasMany       | `this.hasMany( <foreign object>, { <foreign key>: <id value> } );`
hasOne        | `this.hasOne( <foreign object>, { <foreign key>: <id value> } );`
belongsTo     | `this.belongsTo( <foreign object>, { <foreign key>: <id value> } );`
belongsToMany | `this.belongsToMany( <foreign object>, { <foreign key>: <id value> } );`

## Events

Eloquent Schemas can intercept events related to model's and HTTP requests with `hooks`. This is particularly useful when using external API endpoints where you need to format responses before using them.

To define a new event hook use the following syntax:

```javascript
this.before( 'http.get', function( request ) {
  // Manipulate request object before it is sent.
  
  return request;
});

this.after( 'http.get', function( response, request ) {
  // Manipulate the raw response data before it is injested by an Eloquent Model.
  
  return response;
});
```

> Don't forget to return the request for before hooks and the response for after hooks.

The following events are available:

### Model Events

Namespace      | Description
------------------- | ------------------------------------------------------
`model.save`    | Fired when a model is created or updated.
`model.create`  | Fired when creating a new model.
`model.update` | Fired when updating an existing model.
`model.delete`  | Fired when deleting an existing model.

### HTTP Events

Namespace      | Description
------------------- | ------------------------------------------------------
`http.get`           | Fired when making a GET request.
`http.put`          | Fired when making a PUT request.
`http.post`        | Fired when making a POST request.
`http.delete`     | Fired when making a DELETE request.
`http.options`   | Fired when making an OPTIONS request.
`http.head`       | Fired when making a HEAD request.
