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


### Built-in Formatters

   name   | description
--------- | ------------
integer   | Formats the value using `parseInt`.
float     | Returns a floating integer.
string    | Returns the value as a string.
timestamp | Will parse the value and return is as a formatted date.

## Event Hooks

You can intercept API requests with event hooks. This is particularly useful when using external endpoints where you need to format responses. You can intercept any of the following HTTP request headers `GET`, `POST`, `PUT`, `DELETE`, `HEAD` and `OPTIONS`

To define a new event hook use the following syntax:

```javascript
this.before( 'GET', function( request ) {
  // Manipulate request object before it is sent.
  
  return request;
});

this.after( 'GET', function( response, request ) {
  // Manipulate the raw response data before it is injested by an Eloquent Model.
  
  return response;
});
```

> Don't forget to return the request for before hooks and the response for after hooks.
