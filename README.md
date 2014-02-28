active-record.js
================

Extremely simple JavaScript implementation of the Active Record design pattern.

## Creating Resources

Before you begin you must define your resources and the structure of a resource's model. Here is a quick example of how to do this:

```javascript
function Person() {
  return {
    schema: {
      id: 'number',
      title: 'string',
      email: 'string'
    }
  };
}

AR.Resource.add('people', Person);
```

A slightly different syntax currently in beta that will deprecate the previously documented syntax.

```javascript
AR.Resource.create('person', function(schema) {
  schema.numeric('id');
  schema.string('name');
  schema.string('dob');
  
  return schema;
});
```

## Managing Resources

You can iterate over a collection using any of the following methods.

### All

Will return the entire collection of resource instances.

```javascript
AR('people').all();
```

### First

Returns the first instance in the collection.

```javascript
AR('people').first();
```

### Last

Returns the last instance in the collection.

```javascript
AR('people').last();
```

### Find

Return a single resource based on a query object.

```javascript
AR('people').find({id: 1});
```

### Where

Return an array of instances based on a query object.

```javascript
AR('people').where({id: 1});
```

### Each

Manipulate each instance in the collection.

```javascript
AR('people').each(function(person) {
  person.walk();
});
```

### Total

Return the total number of resources in the collection.

```javascript
AR('people').total();
```
