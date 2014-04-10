# Schema

The schema module provides a way to define Eloquent models.

## Creating a new Schema

The schema module is a factory object that accepts a callback as an argument that is be injected with helper functions available through the `this` keyword.

```javascript
new Schema(function() { /* ... */ });
```

## Defining properties

Using `this.property` you can tell the Schema about the data you will be providing a Model.

```javascript
this.property( 'id', 'integer' );
```

This helper method accepts two arguments; the key and the formatter which can be either a string of a callback function. Providing a string indicates that you are using a built-in formatter (explained below).


### Built-in Formatters

   name   | description
--------- | ------------
integer   | Formats the value using `parseInt`.
string    | Returns the value as a string.
timestamp | Will parse the value and return is as a formatted date.
