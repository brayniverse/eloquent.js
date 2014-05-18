describe('Schema', function(){
  it('should be instantiatable', function() {
    var schema = new Schema();
    expect(schema).not.to.be(null);
  });

  describe('#setEndpoint()', function(){
    it('should autogenerate RESTfull URLs from a string', function() {
      var schema = new Schema(function() {
        this.setEndpoint('http://localhost:8000');
      });

      expect(schema.endpoint.list).to.be('http://localhost:8000');
      expect(schema.endpoint.create).to.be('http://localhost:8000');
      expect(schema.endpoint.update).to.be('http://localhost:8000/{id}');
      expect(schema.endpoint.delete).to.be('http://localhost:8000/{id}');
    });

    it('should accept an object of custom URLs', function() {
      var schema = new Schema(function() {
        this.setEndpoint({
          list: 'http://localhost:8000',
          create: 'http://localhost:8888',
          update: 'http://localhost:8888/{id}',
          delete: 'http://localhost:8888/{id}'
        });
      });

      expect(schema.endpoint.list).to.be('http://localhost:8000');
      expect(schema.endpoint.create).to.be('http://localhost:8888');
      expect(schema.endpoint.update).to.be('http://localhost:8888/{id}');
      expect(schema.endpoint.delete).to.be('http://localhost:8888/{id}');
    });

    it('should complain when not all required URLs are provided', function() {
      var schema = new Schema(function() {
        this.setEndpoint({
          list: 'http://localhost:8888'
        });
      });

      expect(schema.valid).to.be(false);
    });
  });

  describe('#setStorage()', function(){});
  describe('#setProperty()', function(){
    it('should complain if a key is not provided', function() {
      var schema = new Schema(function() {
        this.setProperty();
      });

      expect(schema.valid).to.be(false);
    });
    it('should accept a string as the configuration argument', function() {
      var schema = new Schema(function() {
        this.setProperty('id', 'integer');
      });
    });
    it('should accept a function as the configuration argument', function() {
      var schema = new Schema(function() {
        this.setProperty('id', function() {});
      });
    });
    it('should accept a object as the configuration argument', function() {
      var schema = new Schema(function() {
        this.setProperty('id', {});
      });
    });
  });
});
