active-record.js
================

Extremely simple JavaScript implementation of the Active Record design pattern.

## Creating Resources

Before you begin you must define your resources and the structure of a resource's model. Here is a quick example of how to do this:

```javascript
eq('people', function() {
  this.property('id', 'integer');
  this.property('name', 'string');
  this.property('dob', 'string');
});
```

```javascript
AR.Resource.create('products', function() {
  this.setEndpoint('http://localhost:8000/api/products');

  this.property('id', 'integer');
  this.property('merchant_id', 'integer');
  this.property('title', { type: 'string', default: '(untitled)' });
  this.property('description', 'string');
  this.property('price', 'number');

  this.property('salePrice', function(price) {
    return price - (price * 0.2);
  });

  this.property('summary', function(title, description) {
    return title + ' \n' + description;
  });

  this.property('merchant', function(merchant_id) {
    return this.belongsTo('merchants', { id: merchant_id });
  });

  this.property('sales', function(id) {
    return this.hasMany('sales', { product_id: id });
  });
});
```

## Managing Resources

You can iterate over a collection using any of the following methods.

### All

Will return the entire collection of resource instances.

```javascript
eq('people').all();
```

### First

Returns the first instance in the collection.

```javascript
eq('people').first();
```

### Last

Returns the last instance in the collection.

```javascript
eq('people').last();
```

### Find

Return a single resource based on a query object.

```javascript
eq('people').find({id: 1});
```

### Where

Return an array of instances based on a query object.

```javascript
eq('people').where({id: 1});
```

### Each

Manipulate each instance in the collection.

```javascript
eq('people').each(function(person) {
  person.walk();
});
```

### Total

Return the total number of resources in the collection.

```javascript
eq('people').total();
```
