eloquent.js
================

Extremely simple JavaScript implementation of the Active Record design pattern.

## Creating Resources

Before you begin you must define your resources and the structure of a resource's model. Here is a quick example of how to do this:

```javascript
Eloquent.Resource.create('products', function() {
  this.setEndpoint('http://localhost:8000/api/products');
  this.setStorage('indexedDb');
  
  // Request interceptors are also available for `GET`, `POST`, `PUT`, `DELETE`,
  // `HEAd` and `OPTIONS` headers.
  this.before('GET', function(request) {
    // manipulate request object, but don't forget to return it :)
    return request;
  });
  
  this.after('GET', function(response, request) {
    // manipulate the response data before the model is instantiated, you also have
    // access to the actual request object to view and conjest response headers.
  });

  this.property('id', 'integer');
  this.property('merchant_id', 'integer');
  this.property('title', { type: 'string', default: '(untitled)' });
  this.property('description', 'string');
  this.property('price', 'number');
  this.property('created_at', 'timestamp');
  this.property('updated_at', 'timestamp');

  this.property('salePrice', function(price) {
    return price - (price * 0.2);
  });

  this.property('summary', function(description) {
    return description.substring(0, 15);
  });

  this.property('merchant', function(merchant_id) {
    return this.belongsTo('merchants', { id: merchant_id });
  });

  this.property('sales', function(id) {
    return this.hasMany('sales', { product_id: id });
  });
});
```

## Resource Flow

Eloquent resources are represented either as a collection or a singular instance, if you were to query a collection you would receive another collection, this will wittle down until you either have no more resources or switch context.

## Managing Resources

You can iterate over a collection using any of the following methods.

### All

Will return the entire collection of resource instances.

```javascript
Eloquent('people').all();
```

### First

Returns the first instance in the collection.

```javascript
Eloquent('people').first();
```

### Last

Returns the last instance in the collection.

```javascript
Eloquent('people').last();
```

### Find

Return a single resource based on a query object.

```javascript
Eloquent('people').find({id: 1});
```

### Where

Return an array of instances based on a query object.

```javascript
Eloquent('people').where({id: 1});
```

### Each

Manipulate each instance in the collection.

```javascript
Eloquent('people').each(function(person) {
  person.walk();
});
```

### Total

Return the total number of resources in the collection.

```javascript
Eloquent('people').total();
```
