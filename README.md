## Schemas

```javascript
Eloquent.Resource.create('products', function() {
  this.setEndpoint('http://localhost:8000/api/products');
  this.setStorage('indexedDb');
  
  // Request interceptors are also available for `GET`, `POST`, `PUT`, `DELETE`,
  // `HEAD` and `OPTIONS` headers.
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

## Collection Methods

### All

Will return the entire collection of models.

```javascript
Eloquent('people').all();
```

### First

Returns the first model in a collection.

```javascript
Eloquent('people').first();
```

### Last

Returns the last model in a collection.

```javascript
Eloquent('people').last();
```

### Find

Return a single model based on a query object.

```javascript
Eloquent('people').find({id: 1});
```

### Where

Return an array of models based filtered by a query object.

```javascript
Eloquent('people').where({id: 1});
```

### Each

Iterate over each model in a collection.

```javascript
Eloquent('people').each(function(person) {
  person.walk();
});
```

### Total

Return the total number of models in a collection.

```javascript
Eloquent('people').total();
```
