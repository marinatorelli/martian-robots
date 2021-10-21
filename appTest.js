const assert = require('chai').assert;
//const sayHello = require("../app").sayHello; // for multiple functions
const app = require('../app');

// Results
sayHelloResult = app.sayHello();
addNumberResult = app.addNumber();

describe('App', function(){
    describe('sayHello()', function(){
        it('app should do this', function(){
            //let result = app.sayHello();
            assert.equal(sayHelloResult, 'hello');
        });
        it('app should do this', function(){
            //let result = app.sayHello();
            assert.typeOf(sayHelloResult, 'string');
        });
    });
    describe('addNumber()', function(){
        it('app should do this', function(){
            //let result = app.sayHello();
            assert.isAbove(addNumberResult, 'hello');
        });
        it('app should do this', function(){
            //let result = app.sayHello();
            assert.typeOf(addNumberResult, 'number');
        });
    });

});