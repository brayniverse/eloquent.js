// rq.js
// A stupidly simple AJAX libray for asynchronous HTTP request management.

// The library makes no assumptions regarding your data. You provide your data as you expect it
// to be passed to the endpoint and the library will pass you the entire response object completely
// untampered.

// ```javascript
// request('http://demo.com?foo=bar', {
//   method: 'GET',
//   data: 'baz=qux',
//   headers: {},
//   success: function( response ) { /* handle response object */ },
//   error: function( response ) { /* handle response object */ }
// });
// ```

;(function( window, undefined ) {
  'use strict';
  
  var request = function( url, options ) {
    if ( url === undefined ) return;
    if ( options === undefined ) options = {};
    if ( options.method === undefined ) options.method = 'GET';
    
    var req = (function() { // return the correct XHR object for the user agent
      return new XMLHttpRequest(); // chrome
    }());
    
    if ( options.success !== undefined ) {
      req.onload = function() {
        options.success( req );
      };
    }
    
    if ( options.error !== undefined ) {
      req.onerror = function() {
        options.error( req );
      };
    }
    
    if ( Object.prototype.toString.call( options.headers ) === '[object Object]' ) {
      for ( var key in options.headers ) {
        req.setRequestHeader( key, options.headers[ key ] );
      }
    }
    
    if ( options.data !== undefined ) {
      req.send( options.data );
    } else {
      req.send();
    }
  };
  
  window.request = request;
}( window ));
