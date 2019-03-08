// https://www.toptal.com/javascript/interview-questions

// 1

var bar = null;         // gotcha null is considered an object
var bar2 = undefined;   // undefined is not an object 
var bar3;
console.log(typeof bar === "object");  // logs true!
console.log(typeof bar2 === "object");  // logs true!
console.log(typeof bar3 === "object");  // logs true!

// the right way to do it:
console.log((bar !== null) && (typeof bar === "object"));  // logs false
console.log((bar2 !== null) && (typeof bar2 === "object"));  // logs false
console.log((bar3 !== null) && (typeof bar3 === "object"));  // logs false


// returns false for nulls, arrays, and functions, but true for objects
console.log((bar !== null) && (bar.constructor === Object));

// 2

(function(){
    var a = b = 3;  // gotcha
    // this is actually a shorthand for
    // b = 3;
    // var a = b;
})();
  
console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

// but if used with use strict is different:
"use strict";
(function(){
    var a = b = 3;
})();
  
console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

// 3

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();

// 4 

function foo(val1, val2, val1) {
    console.log(val1);
    console.log(val2);
}
foo(1, 2, 3);

// 5 

function foo1()
{
    return {
        bar: "hello"
    };
}

function foo2()
{
    // gotcha
    return
    {
        bar: "hello"
    };
}

console.log(foo1());
console.log(foo2());

// 6

console.log(typeof NaN);
console.log(NaN === NaN);
console.log(NaN !== NaN);
console.log(Number.isNaN(NaN));

// 7 

// yet another gotcha
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);

// good enough solution
function areTheNumbersAlmostEqual(num1, num2) {
	return Math.abs( num1 - num2 ) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));

console.log(Number.EPSILON);

// 8 

function isInteger(x) {
    return Math.round(x) === x;
}

console.log(isInteger(3));
console.log(isInteger(3.4));
console.log(isInteger(3.6)); 
console.log(isInteger(null)); 
console.log(isInteger("ahahaha"));

// works even for non-numeric value such as a string or null
function isInteger2(x) { 
    return (x ^ 0) === x; 
} 

console.log(isInteger2(3));
console.log(isInteger2(3.4));
console.log(isInteger2(3.6)); 
console.log(isInteger2(null)); 
console.log(isInteger2("ahahaha"));

// 9 

(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();

(function() {
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();

// 10

// Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}

console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'

// 11

//Write a sum method which will work properly when invoked using either syntax below.

console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5

function sum(...outerParams) {
    let sum = outerParams.reduce((total, el) => total + el);
    return function(...innerParams) {
        return sum + innerParams.reduce((total, el) => total + el);
    }
}
console.log(sum(2,3,4));

function call(param1) {
    console.log('arguments', arguments);
    return function(param2) {
        console.log(param1);
        console.log(param2);
    }
}
call(1)(2);

// 12

var a = 2;
var b = a;
a = 3
console.log('a', a);
console.log('b', b);

// 13

var d = {};
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
console.log(d);

// 14

// ...gotcha
var a = [1, 2, 3];
var b = a.reverse();
a.push('haha')
console.log('a', a);
console.log('b', b);

var arr1 = "john".split('');
console.log('arr1', arr1);
var arr2 = arr1.reverse();
console.log('arr2', arr2);
var arr3 = "jones".split('');
arr2.push(arr3);
console.log('arr2', arr2);
console.log('arr3', arr3);
console.log('arr1', arr1);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

var a = [1, 2, 3];
var b = [4, 5, 6];
a.push(...b);
console.log(a);
console.log(b);

// 15

console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);

// 16 

// Closures

var globalVar = "xyz";

(function outerFunc(outerArg) {
    let outerVar = 'a';
    
    (function innerFunc(innerArg) {
    let innerVar = 'b';
    
    console.log(
        "outerArg = " + outerArg + "\n" +
        "innerArg = " + innerArg + "\n" +
        "outerVar = " + outerVar + "\n" +
        "innerVar = " + innerVar + "\n" +
        "globalVar = " + globalVar);
    
    })(456);
})(123);

// 17

for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}

for (let i = 0; i < 5; i++) {
	setTimeout(function() { 
        console.log(i); 
    }, i * 1000 );
}

for (var i = 0; i < 5; i++) {
    (function(x) {
        setTimeout(function() { console.log(x); }, x * 1000 );
    })(i);
}

// 18

console.log("0 || 1 = " + (0 || 1));
console.log("1 || 2 = " + (1 || 2));
console.log("0 && 1 = " + (0 && 1));
console.log("1 && 2 = " + (1 && 2));

// 1
// 1
// 0
// 1 or 2

// 19

console.log(false == '0');
console.log(false === '0');

console.log(1 == '1');
console.log(1 === '1');
console.log(1 == 1);

// 20

var a = {},
    b = { key:'b' },
    c = { key:'c' };

a[b] = 123;
console.log(a);
a[c] = 456;
console.log(a);

console.log(a[b]);

// 21

console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));

// 22

(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);

// 23 

var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());

var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());

// 24

// gotcha, works different in browser
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);

// 25 

// gotcha
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();

// Equivalent to:

(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x);
    console.log(y);
})();

// 26

var x = 21;
var girl = function () {
    console.log("NO WAY");
    console.log(x);
    var x = 20;
};
girl                 ();

// perfectly valid:

var x = 21;
var girl = function () {
    x = 634;
    console.log(x);
    var x = 20;
};
girl();

// 27

// How do you clone an object?
var obj = {a: 1, b: 2}
var objclone = Object.assign({}, obj);

let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};

var objclone = Object.assign({},obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
console.log('After Change - obj: ', obj);           // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45

// 28

for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, i * 1000 );
}

// 29

// gotcha
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);

// 30
//How do you add an element at the begining of an array? How do you add one at the end?

var myArray = ['a', 'b', 'c', 'd'];
myArray.push('end');
myArray.unshift('start');
console.log(myArray); // ["start", "a", "b", "c", "d", "end"]

// ES6
myArray = ['start', ...myArray];
myArray = [...myArray, 'end'];

// In short
myArray = ['start', ...myArray, 'end'];

// 31

console.log(typeof undefined == typeof NULL);
console.log(typeof undefined == typeof null);

// 32

console.log(typeof typeof 1);

// 33

var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();

// What happens there: aka hoisting
function inner () {
    var b; // b is undefined
    b++; // b is NaN
    b = 3; // b is 3
    console.log(b); // output "3"
}