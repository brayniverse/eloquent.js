# Schema

The schema module provides a way to define Eloquent models.

## Creating a new Schema

The schema module is a factory object that accepts a callback as an argument that is be injected with helper functions available through the `this` keyword.

```javascript
new Schema(function() { /* ... */ });
```

When creating a new Schema you must provide a endpoint URL. You can also optionally specify whether to sync the data locally using any of the supported caching systems, which will default to none.

```javascript
new Schmea(function() {
  this.setEndpoint( 'http://localhost:8000/api/people' );
  
  // Optional caching system
  this.setStorage( 'indexedDb' );
});
```

## Properties

Using `this.property` you can tell the Schema about the data you will be providing a Model.

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
