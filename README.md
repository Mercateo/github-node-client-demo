# github-node-client-demo

> A sample application implemented using (pure) [Node.js](https://nodejs.org/en/).

> This project was used for research purposes (namely getting to know JavaScript/Node.js) and will NOT be published or usable with npm or others. 

The task of the client is to use the GitHub API to e.g. browse through a user's/organization's repositories etc. by recording user inputs on the command line.

In the end, the development process should use modern techniques (generators, arrow functions, ...) and reveal the difficulties in using them.

#Table of contents

- [Goals](#goals)
- [Usage](#usage)
- [Node](#node)
    - [Classes](#classes)
    - [Cyclic Dependencies](#cyclicdependencies)
    - [Arrow Functions](#arrowfunctions)
    - [Promises](#promises)
    - [Generator Functions](#generatorfunctions)
- [GitHub Authorization](#githubauthorization)
- [Conclusion](#conclusion)

# Usage

Run the application by typing `node index.js` and follow the instructions.

# Node

Within the folder 'node' you can find an implementation of the client using modern JavaScipt standards.
The following part will focus on a few examples:

### Classes

##### Construction
With ECMAScript 6 the keyword `class` was introduced. This is a more comfortable way for using the ES5 workaround defining a class like this: 
```
function OneClass (type) {
    this.type = type;
    this.color = "red";
    this.getClassInfo = function () {
        return this.type + ' ' + this.color;
    }
}
```

The same could be expressed like this in ES6: 

```
class OneClass {

    constructor (type) { 
        this.type = type;
        this.color = "red";
    }
    
    getClassInfo() {
        return this.type + ' ' + this.color;
    }
}
```

As you can see, it's close to what you would expect from an object-oriented language e.g. Java.
There is the constructor taking required parameters and public functions like `getClassInfo()`.

##### Getter/Setter
For sticking more to the JSON style of accessing fields, you can also define getters/setters like this:
```
...
    get info() {
        return this._info;
    }
    
    set info(info) {
        this._info = info;
    }
...
```
You can now handle them like object fields:
```
var type = new Type();
type.info = 'Information';
console.log(type.info);
```

##### Static functions
Similar to oop, there are static functions; functions that are available across all class instances.
To define them, simply use the `static` keyword before the function definition.

##### Inheritance
The concept of inheritance came along as well. If you have two classes in a hierarchy, make usage of the keyword `extends` to inherit functions, fields, constructors etc.
```
class A {
    constructor(p) {
        this._p = p;
    }
    
    do() {
        console.log(this._p + ' done');
    }
}

class B extends A {
    do() {
        console.log(this._p + ' done better');
    }
}

-----------------

let a = new A('a');
let b = new B('b');

a.do();
b.do();
```
Output will be:
```
a done
b done better
```


### Cyclic Dependencies

If one module requires another, that itself requires the module trying to load, then a cycle will appear.
To "solve" this problem, Node returns an empty, unfinished copy of the first module.

The example can be found in the [Node Docs](https://nodejs.org/api/modules.html#modules_cycles):

`a.js:`

```
const b = require('./b.js');

const a = function () {
    console.log('b is');
    console.log(b);
}

a();
b.b();

module.exports = {
    a
};
```

`b.js:`

```
const a = require('./a.js');

const b = function () {
    console.log('a is');
    console.log(a);
};

module.exports = {
    b
};
```

The output will be:

```
b is 
{ b : [Function] }
a is
{}
```

##### How to handle

The **only** way will be restructuring your code. 
###### other techniques (and why they should **not** be used) are described [here](stackoverflow.com/questions/24523325/resolving-circular-dependencies-with-node-js-require-and-classes-in-coffeescript)
A possible solution might be this:

`a.js:`

```
const b = require('./b.js');

const start = function () {
    b.a(this);
    b.b();
};

module.exports = {
    start
};
```

`b.js:`

```
const a = function (a) {
    console.log('a is:');
    console.log(a);
};

const b = function () {
    console.log('b is:');
    console.log(b);
};

module.exports = {
    a,
    b
};
```

`index.js`

```
const a = require('./a');

a.start();
```

The output will be:

```
a is:
{ start: [Function] }
b is:
[Function]
```

### Arrow Functions

Arrow functions are a smart way to express the functional character of JavaScript. 
You no longer need the keyword `function` to declare an anonymous function, but you can use it way more intentional:

```
function addOne(n) {
    return n + 1; 
}
```

...translates to...

```
const addOne = (n) => n + 1;
```


##### `this` context

Actually, one can use these arrow functions just as normal function. With one exception:
The scope of the context used within the function itself is different. 

``` 
var self = this; 
this.nums.forEach(function (v) { 
    if (v % 5 === 0) 
        self.fives.push(v); 
    });
```
...was the only way to access the surrounding context.

Within arrow functions `this` automatically refers to the context declared as `self` in the above example.
It's called **lexical this**.

```
this.nums.forEach((v) => { 
    if (v % 5 === 0) 
        this.fives.push(v) 
    });
```

### Promises

Promises are a simple way to handle asynchronous tasks.
A promise takes two parameters/functions:

`resolve`: what happens, when the task runs as expected
`reject`: what happens, when an error occurs

Normally, you return a Promise like this: `let p = () => new Promise((resolve, reject) => { ... } )`
To mark the successful ending of the promise, you call within the promises body: `resolve(resolution);`
To declare what should happen after resolve was called, you use `.then`,
    which takes the `resolution` as a parameter: `p().then((resolution) => doStuffWithThe(resolution))`


### Generator functions

Though generator functions are quite hard to understand, they are very useful.
The idea behind this is to have 'functions with a state across multiple reentrances'. 
A simple example would be this: 
```
function* range (start, end, step) { 
    while (start < end) { 
        yield start 
        start += step 
    } 
} 

for (let i of range(0, 10, 2)) { 
    console.log(i) // 0, 2, 4, 6, 8 
}
```

Every time `yield` is called, the function returns to value `start`, which is the being used as `i` within the for loop.
After the loop body is executed, range is reentered at the exact state it was left.
So if `start` was 0 at the first call and increased by 2, after reentering `range()` `start` remains 2.

##### Advances usage
One can also use generator functions to control an asynchronous control flow.
For that use case, a special helper function is needed.

Look [here](http://es6-features.org/#GeneratorControlFlow) to view an example.

The trickiness behind this is to understand what the helper function does.
In 'simple' words:
1. It needs a generator function and its parameters as arguments.
2. It calls the generator function with its parameters to receive an iterator object.
3. It iterates as long as there are `yield` calls within the generator function.
4. It handles the call of the asynchronous function calls passed by calling `yield`.
5. It resolves the returned promise, if there are no more `yield` calls, so the control flow can proceed safely assuming all asynchronous tasks are done.

A problem arose when I was trying to use yield within another (arrow-)function.
The defect was, that `yield` can only be called in the scope of a generator function.
As a result, `.forEach((foo) => { yield async(foo) })` won't work.
=> A solution is to simply use a **normal** for loop, as this does not define a new closure.
```
logAsync(key, value, timeout) {
    return new Promise(resolve, reject) {
        setTimeout(() => { resolve(`${key}: ${value}`) }, timeout);
    };
}

async(function* (foo) {
            for(let bar in Object.keys(foo)) {
                let text = yield logAsync(bar, foo[bar], 100);
                console.log(text)
            }
        }, foo).then(() => { ... });

```

# GitHub Authorization

{ to be written }

# Conclusion

{ to be written }